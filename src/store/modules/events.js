import VueCookies from 'vue-cookies'
import qs from 'query-string'
import config from '../../config.json'

const url = config.apiUrl.copp

export default {
    namespaced: true,

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

                console.log('json: ', json)
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
        }
    }
}
