import http from '@/store/http'
import qs from 'query-string'
import router from '@/router'

export default {
    namespaced: true,

    state () {
        return {
            list: [],
            count: 0,
            item: null,

            loading: {
                get: false,
                save: false,
                remove: false,
            },

            filter: {
                page: 1,
                limit: 50,
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

        item (state, value) {
            state.item = value
        },

        'loading.get' (state, value) {
            state.loading.get = value
        },

        'loading.save' (state, value) {
            state.loading.save = value
        },

        'loading.remove' (state, value) {
            state.loading.remove = value
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

            const list = await http.get(`/people?${query}`)
            ctx.commit('list', list)

            const count = await http.get(`/people/count?${query}`)
            ctx.commit('count', count)

            ctx.commit('loading.get', false)
        },

        async 'item.get' (ctx, id) {
            ctx.commit('loading.get', true)

            const item = await http.get(`/people/${id}`)
            ctx.commit('item', item)

            ctx.commit('loading.get', false)
        },

        async save (ctx, data) {
            ctx.commit('loading.save', true)

            const item = await http.save('/people', {
                name: data.fields.name,
                description: data.fields.description,
                project: ctx.rootState.user.project,
            }, data.id)

            if (item) {
                if (data.files) {
                    for (let key in data.files) {
                        if (data.files[key].file) {
                            const file = await http.uploadFile({
                                ref: 'person',
                                refId: item.id,
                                file: data.files[key].file,
                                field: key
                            })
                        }
                    }
                }

                await ctx.dispatch('list.get')
                await router.push('/people')
            }

            ctx.commit('loading.save', false)
        },

        async remove (ctx, id) {
            ctx.commit('loading.remove', true)

            await http.delete(`/people/${id}`)
            router.push('/people')

            ctx.commit('loading.remove', false)
        }
    }
}
