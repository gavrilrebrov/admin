import http from '@/store/http'
import qs from 'query-string'

export default {
    namespaced: true,

    state () {
        return {
            list: [],
            count: 0,

            loading: {
                get: false,
            },

            filter: {
                page: 1,
                limit: 50,
            }
        }
    },

    mutations: {
        'loading.get' (state, value) {
            state.loading.get = value
        },

        list (state, value) {
            state.list = value
        },

        count (state, value) {
            state.count = value
        },

        filter (state, value) {
            state.filter[value.key] = value.value
        },
    },

    actions: {
        async 'list.get' (ctx) {
            ctx.commit('loading.get', true)

            let query = {
                project: ctx.rootState.user.project,
                _limit: ctx.state.filter.limit,
                _sort: 'created_at:DESC'
            }

            if (ctx.state.filter.page) {
                query['_start'] = ((ctx.state.filter.page - 1) * ctx.state.filter.limit)
            }

            query = qs.stringify(query)

            const list = await http.get(`/applications?${query}`)
            ctx.commit('list', list)

            const count = await http.get(`/applications/count?${query}`)
            ctx.commit('count', count)

            ctx.commit('loading.get', false)
        }
    }
}
