import VueCookies from 'vue-cookies'

const apiUrl = 'http://localhost:1337'

export default {
    namespaced: true,

    state () {
        return {
            list: [],
            item: null,
        }
    },

    mutations: {
        list (state, value) {
            state.list = value
        },

        item (state, value) {
            state.item = value
        }
    },

    actions: {
        async getList (ctx) {
            ctx.commit('isLoading', true, { root: true })

            try {
                const res = await fetch(`${apiUrl}/applications/?project=${ctx.rootState.project.id}&_sort=created_at:ASC`, {
                    method: 'get',
                    headers: {
                        Authorization: 'Bearer ' + VueCookies.get('token')
                    }
                })

                const json = await res.json()

                if (res.ok) {
                    ctx.commit('list', json)
                }
            } catch (err) {
                console.error('err: ', err)
            }

            ctx.commit('isLoading', false, { root: true })
        },

        async getItem (ctx, id) {
            ctx.commit('isLoading', true, { root: true })

            try {
                const res = await fetch(`${apiUrl}/applications/${id}`, {
                    method: 'get',
                    headers: {
                        Authorization: 'Bearer ' + VueCookies.get('token')
                    }
                })

                const json = await res.json()

                if (res.ok) {
                    console.log('json: ', json)
                    ctx.commit('item', json)
                }
            } catch (err) {
                console.error('err: ', err)
            }

            ctx.commit('isLoading', false, { root: true })
        }
    },
}
