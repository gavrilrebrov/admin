import VueCookies from 'vue-cookies'
import config from '../../config.json'
import qs from 'query-string'
import router from '../../router'

let url

if (window.location.hostname === 'admin.copp14.ru') {
    url = config.apiUrl.copp
} else {
    url = config.apiUrl.grebrov
}

const getChildren = (pages, page) => {
    let children = pages.filter(p => (p.page && p.page.id) === page.id)

    children = children.map(c => ({
        id: c.id,
        name: c.name,
        slug: c.slug,
        pages: getChildren(pages, c)
    }))

    return children
}

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

    getters: {
        list (state) {
            let pages = state.list.filter(p => !p.page)
            let output = []

            for (let p in pages) {
                let page = pages[p]

                let childs = getChildren(state.list, page)

                output.push({
                    id: page.id,
                    name: page.name,
                    slug: page.slug,
                    pages: childs
                })
            }

            return output
        }
    },

    actions: {
        async getItem (ctx, id) {
            ctx.commit('item', null)
            ctx.commit('isLoading', true, { root: true })

            try {
                const res = await fetch(url + '/pages/' + id, {
                    method: 'get',
                    headers: {
                        Authorization: 'Bearer ' + VueCookies.get('token')
                    }
                })

                const json = await res.json()

                if (res.ok) {
                    ctx.commit('item', json)
                }
            } catch (err) {
                console.error('err: ', err)
            }

            ctx.commit('isLoading', false, { root: true })
        },

        async getList (ctx) {
            ctx.commit('isLoading', true, { root: true })

            let query = {
                project: ctx.rootState.user.project,
            }

            query = qs.stringify(query)

            try {
                const res = await fetch(`${url}/pages?${query}`, {
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

        async save (ctx, data) {
            ctx.commit('isLoading', true, { root: true })

            try {
                const formData = new FormData()
                formData.append('data', JSON.stringify({
                    name: data.data.name,
                    project: ctx.rootState.user.project,
                    content: data.data.content,
                    page: data.data.page,
                    slug: data.data.slug,
                }))

                let addition = ''

                if (data.id) addition = `/${data.id}`

                const res = await fetch(`${url}/pages${addition}`, {
                    method: data.id ? 'put' : 'post',
                    headers: {
                        Authorization: 'Bearer ' + VueCookies.get('token')
                    },
                    body: formData,
                })

                if (res.ok) {
                    await ctx.dispatch('getList')

                    router.push('/pages')
                }
            } catch (err) {
                console.error('err: ', err)
            }

            ctx.commit('isLoading', false, { root: true })
        }
    }
}
