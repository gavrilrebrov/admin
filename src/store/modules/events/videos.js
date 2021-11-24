import http from '@/store/http'
import qs from 'query-string'
import router from '@/router'

export default {
    namespaced: true,

    state () {
        return {
            list: [],
            count: 0,

            loading: {
                get: false,
                save: false,
                remove: false,
            },

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

        'loading.get' (state, value) {
            state.loading.get = value
        },

        'loading.save' (state, value) {
            state.loading.save = value
        },

        'loading.remove' (state, value) {
            state.loading.remove = value
        },

        item (state, value) {
            state.item = value
        }
    },

    actions: {
        async 'list.get' (ctx, eventId) {
            ctx.commit('loading.get', true)

            let query = {
                event: eventId,
                _sort: 'created_at:DESC',
                _limit: -1
            }

            query = qs.stringify(query)

            const list = await http.get(`/videos?${query}`)
            ctx.commit('list', list)

            const count = await http.get(`/videos/count?${query}`)
            ctx.commit('count', count)

            ctx.commit('loading.get', false)
        },

        async 'item.get' (ctx, id) {
            ctx.commit('loading.get', true)

            const item = await http.get(`/videos/${id}`)
            ctx.commit('item', item)

            ctx.commit('loading.get', false)
        },

        async save (ctx, data) {
            ctx.commit('loading.save', true)

            const item = await http.save(`/videos`, {
                event: data.eventId,
                title: data.fields.title,
                identifier: data.fields.identifier,
            }, data.id)

            if (item) {
                router.push(`/events/${data.eventId}/videos`)
            }

            ctx.commit('loading.save', false)
        },

        async remove (ctx, data) {
            ctx.commit('loading.remove', true)

            await http.delete(`/videos/${data.id}`)

            router.push(`/events/${data.eventId}/videos`)

            ctx.commit('loading.remove', false)
        }
    }
}
