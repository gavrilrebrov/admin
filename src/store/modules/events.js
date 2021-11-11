import VueCookies from 'vue-cookies'
import qs from 'query-string'
import config from '../../config.json'
import router from '../../router'
import moment from 'moment/min/moment-with-locales'
moment.locale('ru')

import schedules from './events/schedules'
import categories from './events/categories'

const url = config.apiUrl.copp

export default {
    namespaced: true,

    modules: {
        schedules,
        categories
    },

    state () {
        return {
            list: [],
            isLoading: false,
            count: 0,
            item: null,
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
    },

    actions: {
        async getList (ctx) {
            ctx.commit('isLoading', true)

            let query = {
                project: ctx.rootState.user.project,
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

                console.log('json: ', json)

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
                    slug: data.data.slug,
                    description: data.data.description,
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
    }
}
