import qs from 'query-string'
import config from '../../../config.json'
import VueCookies from 'vue-cookies'
import router from '../../../router'

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
                name: '',
            },

            loading: {
                get: false,
                save: false,
            },
        }
    },

    getters: {
        values (state) {
            return state.values
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
        },

        loadingGet (state, value) {
            state.loading.get = value
        },

        loadingSave (state, value) {
            state.loading.save = value
        },
    },

    actions: {
        async getList (ctx) {
            ctx.commit('isLoading', true)

            let query = {
                project: ctx.rootState.user.project,
                _sort: 'name:ASC',
                _limit: -1,
            }

            query = qs.stringify(query)

            try {
                const res = await fetch(`${url}/categories?${query}`, {
                    method: 'get',
                    headers: {
                        Authorization: 'Bearer ' + VueCookies.get('token')
                    }
                })

                const countRes = await fetch(`${url}/categories/count?${query}`, {
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
            ctx.commit('loadingGet', true)

            try {
                const res = await fetch(`${url}/categories/${id}`, {
                    method: 'get',
                    headers: {
                        Authorization: 'Bearer ' + VueCookies.get('token')
                    },
                })

                const item = await res.json()

                ctx.commit('item', item)
            } catch (err) {
                console.err('err: ', err)
            }

            ctx.commit('loadingGet', false)
        },

        async save (ctx, data) {
            ctx.commit('loadingSave', true)

            try {
                const formData = new FormData()
                formData.append('data', JSON.stringify({
                    name: data.fields.name,
                    project: ctx.rootState.user.project
                }))

                let addition = data.id ? `/${data.id}` : ''

                const res = await fetch(`${url}/categories${addition}`, {
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
                        text: 'Категория успешно сохранена'
                    }, { root: true })

                    router.push('/events/categories')
                }
            } catch (err) {
                console.error('err: ', err)
            }

            ctx.commit('loadingSave', false)
        }
    }
}
