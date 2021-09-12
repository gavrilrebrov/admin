import VueCookies from 'vue-cookies'

const getChildren = (pages, page) => {
    let children = pages.filter(p => p.page === page.id)

    children = children.map(c => ({
        id: c.id,
        name: c.name,
        slug: c.slug,
        pages: getChildren(pages, c)
    }))

    return children
}

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
                const res = await fetch(apiUrl + '/pages/' + id, {
                    method: 'get',
                    headers: {
                        Authorization: 'Bearer ' + VueCookies.get('token')
                    }
                })

                const json = await res.json()

                console.log('json: ', json)

                if (res.ok) {
                    ctx.commit('item', json)
                }
            } catch (err) {
                console.error('err: ', err)
            }

            ctx.commit('isLoading', false, { root: true })
        }
    }
}
