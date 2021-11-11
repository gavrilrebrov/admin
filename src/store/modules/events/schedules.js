import qs from 'query-string'
import config from '../../../config.json'
import moment from 'moment/min/moment-with-locales'
import router from '../../../router'
import VueCookies from 'vue-cookies'
moment.locale('ru')

const url = config.apiUrl.copp

export default {
    namespaced: true,

    state () {
        return {
            list: [],
            item: null,
            count: 0,

            loading: {
                get: false,
                save: false
            }
        }
    },

    mutations: {
        list (state, value) {
            state.list = value
        },

        item (state, value) {
            state.item = value
        },

        count (state, value) {
            state.count = value
        },

        loadingGet (state, value) {
            state.loading.get = value
        },

        loadingSave (state, value) {
            state.loading.save = value
        }
    },

    getters: {
        ordered (state) {
            const list = state.list.map(s => s)
            const output = []

            for (let i in list) {
                let schedule = list[i]

                let res = output.find(s => s.label === moment(schedule.startDate).format('LL'))

                let timeString = `${moment(schedule.startDate).format('HH:mm')}`
                if (schedule.endDate) timeString += ` - ${moment(schedule.endDate).format('HH:mm')}`

                let zoom = null
                let youtube = null

                if (schedule.conferences.length > 0) {
                    zoom = schedule.conferences.find(c => c.type === 'zoom')

                    if (zoom) zoom = {
                        link: zoom.link,
                        code: zom.code,
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

            return output
        }
    },

    actions: {
        async getList (ctx, eventId) {
            ctx.commit('loadingGet', true)

            let query = {
                event: eventId,
                _sort: 'startDate:ASC,endDate:ASC',
                _limit: -1,
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

                if (res.ok) ctx.commit('list', json)
                if (countRes.ok) ctx.commit('count', countJson)
            } catch (err) {
                console.error('err: ', err)
            }

            ctx.commit('loadingGet', false)
        },

        async getItem (ctx, id) {
            ctx.commit('loadingGet', true)

            try {
                const res = await fetch(`${url}/schedules/${id}`, {
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

            ctx.commit('loadingGet', false)
        },

        async save (ctx, data) {
            ctx.commit('loadingSave', true)

            try {
                const formData = new FormData()
                formData.append('data', JSON.stringify(data.fields))

                let addition = data.id ? `/${data.id}` : ''

                const res = await fetch(`${url}/schedules${addition}`, {
                    method: data.id ? 'put' : 'post',
                    headers: {
                        Authorization: 'Bearer ' + VueCookies.get('token')
                    },
                    body: formData
                })

                if (res.ok) {
                    await ctx.dispatch('getList')

                    ctx.commit('notice', {
                        type: 'success',
                        text: 'Событие успешно сохранено'
                    }, { root: true })

                    router.push(`/events/${data.fields.event}/schedule`)
                }
            } catch (err) {
                console.error('err: ', err)
            }

            ctx.commit('loadingSave', false)
        },

        async remove (ctx, data) {
            ctx.commit('loadingGet', true)

            try {
                const res = await fetch(`${url}/schedules/${data.id}`, {
                    method: 'delete',
                    headers: {
                        Authorization: 'Bearer ' + VueCookies.get('token')
                    },
                })

                if (res.ok) {
                    ctx.commit('notice', {
                        type: 'success',
                        text: 'Запись удалена'
                    }, { root: true })

                    router.push(`/events/${data.eventId}/schedule`)
                }
            } catch (err) {
                console.error('err: ', err)
            }

            ctx.commit('loadingGet', false)
        }
    }
}
