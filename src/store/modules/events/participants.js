import VueCookies from 'vue-cookies'
import config from '../../../config.json'
const url = config.apiUrl.copp
import qs from 'query-string'

import { useRoute } from 'vue-router'

import http from '@/store/http'

export default {
    namespaced: true,

    state () {
        return {
            list: [],
            count: 0,

            loading: {
                get: false,
                export: false,
            },

            filter: {
                page: 1,
                limit: 50,
                schedule: null,
            }
        }
    },

    mutations: {
        list (state, value) {
            state.list = value
        },

        count (state, value) {
            state.count = value
        },

        loadingGet (state, value) {
            state.loading.get = value
        },

        filter (state, value) {
            state.filter[value.key] = value.value
        },

        'loading.export' (state, value) {
            state.loading.export = value
        }
    },

    actions: {
        async getList (ctx, eventId) {
            ctx.commit('loadingGet', true)

            let query = {
                event: eventId,
                _sort: 'created_at:DESC',
                _limit: ctx.state.filter.limit,
            }

            if (ctx.state.filter.page) {
                query['_start'] = ((ctx.state.filter.page - 1) * ctx.state.filter.limit)
            }

            if (ctx.state.filter.schedule) {
                query['schedule'] = ctx.state.filter.schedule
            }

            query = qs.stringify(query)

            try {
                const res = await fetch(`${url}/participants?${query}`, {
                    method: 'get',
                    headers: {
                        Authorization: 'Bearer ' + VueCookies.get('token')
                    }
                })

                const countRes = await fetch(`${url}/participants/count?${query}`, {
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

        async 'export.excel' (ctx, eventId) {
            ctx.commit('loading.export', true)

            await http.downloadFile(`/participants/export/${eventId}`)

            ctx.commit('loading.export', false)
        }
    }
}
