import qs from 'query-string'
import config from '../../../config.json'
import moment from 'moment/min/moment-with-locales'
import VueCookies from 'vue-cookies'
moment.locale('ru')

const url = config.apiUrl.copp

export default {
    namespaced: true,

    state () {
        return {
            list: [],
            item: null,
            isLoading: false,
            count: 0,

            values: {
                title: '',
                startDate: null,
                endDate: null,
                description: '',
                category: null,
                organizer: '',
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

        isLoading (state, value) {
            state.isLoading = value
        },

        count (state, value) {
            state.count = value
        },

        values (state, value) {
            state.values = value
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
            ctx.commit('isLoading', true)

            let query = {
                event: eventId,
                _sort: 'startDate:ASC',
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

            ctx.commit('isLoading', false)
        },

        async getItem (ctx, id) {
            ctx.commit('isLoading', true)

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

            ctx.commit('isLoading', false)
        }
    }
}
