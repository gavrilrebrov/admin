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
            count: 0
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
        }
    },

    actions: {
        async getList (ctx) {
            ctx.commit('isLoading', true)

            let query = {
                _sort: 'identifier:ASC'
            }

            query = qs.stringify(query)

            try {
                const res = await fetch(`${url}/teams?${query}`, {
                    method: 'get',
                    headers: {
                        Authorization: 'Bearer ' + VueCookies.get('token')
                    }
                })

                const json = await res.json()

                const countRes = await fetch(`${url}/teams/count`, {
                    method: 'get',
                    headers: {
                        Authorization: 'Bearer ' + VueCookies.get('token')
                    }
                })

                const countJson = await countRes.json()

                if (res.ok) {
                    ctx.commit('list', json)
                    console.log('json: ', json)
                }

                if (countRes.ok) {
                    ctx.commit('count', countJson)
                }
            } catch (err) {
                console.error('err: ', err)
            }

            ctx.commit('isLoading', false)
        }
    }
}
