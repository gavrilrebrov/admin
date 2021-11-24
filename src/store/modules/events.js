import VueCookies from 'vue-cookies'
import qs from 'query-string'
import config from '../../config.json'
import router from '../../router'
import moment from 'moment/min/moment-with-locales'
moment.locale('ru')

import schedules from './events/schedules'
import categories from './events/categories'
import participants from './events/participants'
import videos from './events/videos'
import vacancies from './events/vacancies'

const url = config.apiUrl.copp

import http from '@/store/http'

export default {
    namespaced: true,

    modules: {
        schedules,
        categories,
        participants,
        videos,
        vacancies
    },

    state () {
        return {
            list: [],
            count: 0,
            item: null,

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

        count (state, value) {
            state.count = value
        },

        item (state, value) {
            state.item = value
        },

        loadingGet (state, value) {
            state.loading.get = value
        },

        loadingSave (state, value) {
            state.loading.save = value
        }
    },

    actions: {
        async getList (ctx) {
            ctx.commit('loadingGet', true)

            let query = {
                project: ctx.rootState.user.project,
                _limit: -1,
            }

            query = qs.stringify(query)

            const list = await http.get(`/events?${query}`)
            ctx.commit('list', list)

            const count = await http.get(`/events/count?${query}`)
            ctx.commit('count', count)

            ctx.commit('loadingGet', false)
        },

        async getItem (ctx, id) {
            ctx.commit('loadingGet', true)

            const item = await http.get(`/events/${id}`)
            ctx.commit('item', item)

            ctx.commit('loadingGet', false)
        },

        async save (ctx, data) {
            ctx.commit('loadingSave', true)

            const fields = {
                name: data.fields.name,
                project: ctx.rootState.user.project,
                description: data.fields.description,
                active: data.fields.active,
                registration: data.fields.registration,
                youtubeId: data.fields.youtubeId
            }

            const item = await http.save(`/events`, fields, data.id)

            if (item) {
                if (data.files) {
                    for (let key in data.files) {
                        if (data.files[key].file) {
                            const file = await http.uploadFile({
                                ref: 'event',
                                refId: item.id,
                                file: data.files[key].file,
                                field: key,
                            })
                        }
                    }
                }

                await ctx.dispatch('getList')
                await router.push('/events')
            }

            ctx.commit('loadingSave', false)
        },
    }
}
