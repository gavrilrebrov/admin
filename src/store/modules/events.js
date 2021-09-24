import VueCookies from 'vue-cookies'
import qs from 'query-string'
import config from '../../config.json'
import router from '../../router'
import moment from 'moment/min/moment-with-locales'
moment.locale('ru')

const url = config.apiUrl.copp

export default {
    namespaced: true,

    state () {
        return {
            list: [],
            isLoading: false,
            count: 0,
            item: null,

            schedules: [],
            schedulesCount: 0,
        }
    },

    getters: {
        orderedSchedules (state) {
            const schedules = state.schedules.map(s => s)
            const output = []

            for (let i in schedules) {
                let schedule = schedules[i]

                let res = output.find(s => s.label === moment(schedule.startDate).format('LL'))

                let timeString = `${moment(schedule.startDate).format('HH:mm')}`
                if (schedule.endDate) timeString += ` - ${moment(schedule.endDate).format('HH:mm')}`

                let zoom = null
                let youtube = null

                if (schedule.conferences.length > 0) {
                    zoom = schedule.conferences.find(c => c.type === 'zoom')
                    if (zoom) zoom = {
                        link: zoom.link,
                        code: zoom.code,
                        identifier: zoom.identifier
                    }

                    youtube = schedule.conferences.find(c => c.type === 'youtube')
                    if (youtube) youtube = {
                        link: youtube.link
                    }
                }

                if (!res) {
                    output.push({
                        label: moment(schedule.startDate).format('LL'),
                        items: [{
                            id: schedule.id,
                            time: timeString,
                            title: schedule.title,
                            category: schedule.category ? schedule.category.name : null,
                            organizer: schedule.organizer,
                            zoom,
                            youtube,
                        }]
                    })
                } else {
                    res.items.push({
                        id: schedule.id,
                        time: timeString,
                        title: schedule.title,
                        category: schedule.category ? schedule.category.name : null,
                        organizer: schedule.organizer,
                        zoom,
                        youtube,
                    })
                }
            }

            console.log('output: ', output)

            return output
        }
    },

    mutations: {
        list (state, value) {
            state.list = value
        },

        count (state, value) {
            state.count = value
        },

        isLoading (state, value) {
            state.isLoading = value
        },

        item (state, value) {
            state.item = value
        },

        schedules (state, value) {
            state.schedules = value
        },

        schedulesCount (state, value) {
            state.schedulesCount = value
        }
    },

    actions: {
        async getList (ctx) {
            ctx.commit('isLoading', true)

            let query = {
                project: ctx.rootState.user.project.id,
                _limit: -1,
            }

            query = qs.stringify(query)

            try {
                const res = await fetch(`${url}/events?${query}`, {
                    method: 'get',
                    headers: {
                        Authorization: 'Bearer ' + VueCookies.get('token')
                    }
                })

                const json = await res.json()

                const countRes = await fetch(`${url}/events/count?${query}`, {
                    method: 'get',
                    headers: {
                        Authorization: 'Bearer ' + VueCookies.get('token')
                    }
                })

                const countJson = await countRes.json()

                if (res.ok) {
                    ctx.commit('list', json)
                }

                if (countRes.ok) {
                    ctx.commit('count', countJson)
                }
            } catch (err) {
                console.error('err: ', err)
            }

            ctx.commit('isLoading', false)
        },

        async getItem (ctx, id) {
            ctx.commit('isLoading', true)

            try {
                const res = await fetch(`${url}/events/${id}`, {
                    method: 'get',
                    headers: {
                        Authorization: 'Bearer ' + VueCookies.get('token')
                    },
                })

                const json = await res.json()

                ctx.commit('item', json)
            } catch (err) {
                console.error('err: ', err)
            }


            ctx.commit('isLoading', false)
        },

        async save (ctx, data) {
            ctx.commit('isLoading', true)

            try {
                const formData = new FormData()
                formData.append('data', JSON.stringify({
                    name: data.data.name,
                    project: ctx.rootState.user.project,
                    slug: data.data.slug
                }))

                let addition = ''

                if (data.id) addition = `/${data.id}`

                const res = await fetch(`${url}/events${addition}`, {
                    method: data.id ? 'put' : 'post',
                    headers: {
                        Authorization: 'Bearer ' + VueCookies.get('token')
                    },
                    body: formData
                })

                if (res.ok) {
                    await ctx.dispatch('getList')

                    router.push('/events')
                }
            } catch (err) {
                console.error('err: ', err)
            }

            ctx.commit('isLoading', false)
        },

        async getSchedules (ctx) {
            ctx.commit('isLoading', true)

            let query = {
                event: ctx.state.item.id,
                _sort: 'startDate:ASC',
                _limit: -1
            }

            query = qs.stringify(query)

            try {
                const res = await fetch(`${url}/schedules?${query}`, {
                    method: 'get',
                    headers: {
                        Authorization: 'Bearer ' + VueCookies.get('token')
                    }
                })

                const countRes = await fetch(`${url}/schedules/count?${query}`, {
                    method: 'get',
                    headers: {
                        Authorization: 'Bearer ' + VueCookies.get('token')
                    }
                })

                const json = await res.json()
                const countJson = await countRes.json()

                console.log('json: ', json)

                if (res.ok) ctx.commit('schedules', json)
                if (countRes.ok) ctx.commit('schedulesCount', countJson)
            } catch (err) {
                console.error('err: ', err)
            }

            ctx.commit('isLoading', false)
        }
    }
}
