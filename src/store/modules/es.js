import VueCookies from 'vue-cookies'
import qs from 'query-string'
import moment from 'moment'

import config from '../../config.json'

export default {
    namespaced: true,

    state () {
        return {
            list: [],
            item: null,
            count: 0,
            tutors: [],
            filter: {
                citizenCategory: null,
                tutor: null,
                sort: 'registeredDate:DESC',
                page: 1,
                period: null,
                limit: 100,
                search: null,
            },
        }
    },

    mutations: {
        list (state, value) {
            state.list = value
        },

        item (state, value) {
            state.item = value
        },

        tutors (state, value) {
            state.tutors = value
        },

        count (state, value) {
            state.count = value
        },

        filter (state, value) {
            state.filter[value.key] = value.value
        },

        resetFilter (state, value) {
            state.filter = {
                citizenCategory: null,
                tutor: null,
                sort: 'registeredDate:DESC',
                page: 1,
                period: null,
                limit: 100,
                search: null,
            }
        }
    },

    actions: {
        async getList (ctx, params = null) {
            ctx.commit('isLoading', true, { root: true })

            let query = {
                project: ctx.rootState.project.id,
                _sort: ctx.state.filter.sort,
                _limit: ctx.state.filter.limit,
            }

            if (ctx.state.filter.search) {
                query['name_contains'] = ctx.state.filter.search
            }

            if (ctx.state.filter.citizenCategory) {
                query['citizenCategory'] = ctx.state.filter.citizenCategory
            }

            if (ctx.state.filter.tutor) {
                query['tutor'] = ctx.state.filter.tutor
            }

            if (ctx.state.filter.sort) {
                query['_sort'] = ctx.state.filter.sort
            }

            if (ctx.state.filter.page) {
                query['_start'] = ((ctx.state.filter.page - 1) * ctx.state.filter.limit)
            }

            if (ctx.state.filter.period) {
                let start = moment(ctx.state.filter.period.start).startOf('day')
                let end = moment(ctx.state.filter.period.end).endOf('day')

                query['registeredDate_gte'] = start.format('YYYY-MM-DD HH:mm:ss')
                query['registeredDate_lte'] = end.format('YYYY-MM-DD HH:mm:ss')
            }

            query = qs.stringify(query)

            try {
                const res = await fetch(`${config.apiUrl}/applications/?${query}`, {
                    method: 'get',
                    headers: {
                        Authorization: 'Bearer ' + VueCookies.get('token')
                    }
                })

                const countRes = await fetch(`${config.apiUrl}/applications/count?${query}`, {
                    method: 'get',
                    headers: {
                        Authorization: 'Bearer ' + VueCookies.get('token')
                    }
                })

                const json = await res.json()
                const countJson = await countRes.json()

                if (res.ok) {
                    ctx.commit('list', json)
                }

                if (countRes.ok) {
                    ctx.commit('count', countJson)
                }
            } catch (err) {
                console.error('err: ', err)
            }

            ctx.commit('isLoading', false, { root: true })
        },

        async getItem (ctx, id) {
            ctx.commit('isLoading', true, { root: true })

            try {
                const res = await fetch(`${config.apiUrl}/applications/${id}`, {
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

        async downloadDocuments (ctx, id) {
            ctx.commit('isLoading', true, { root: true })

            try {
                const res = await fetch(`${config.apiUrl}/applications/${id}/documents`, {
                    method: 'get',
                    headers: {
                        Authorization: 'Bearer ' + VueCookies.get('token')
                    }
                })

                const blob = await res.blob()

                const url = window.URL || window.webkitURL;
                const link = url.createObjectURL(blob);

                let a = document.createElement('a')
                a.href = link
                a.target = '_blank'

                document.body.appendChild(a)
                a.click()
                document.body.removeChild(a)
            } catch (err) {
                console.error('err: ', err)
            }

            ctx.commit('isLoading', false, { root: true })
        },

        async getTutors (ctx) {
            ctx.commit('isLoading', true, { root: true })

            let query = {
                project: ctx.rootState.project.id
            }

            query = qs.stringify(query)

            try {
                const res = await fetch(`${config.apiUrl}/tutors?${query}`, {
                    method: 'get',
                    headers: {
                        Authorization: 'Bearer ' + VueCookies.get('token')
                    }
                })

                const json = await res.json()

                if (res.ok) {
                    ctx.commit('tutors', json)
                }
            } catch (err) {
                console.error('err: ', err)
            }

            ctx.commit('isLoading', false, { root: true })
        },

        async exportExcel (ctx) {
            ctx.commit('isLoading', true, { root: true })

            try {
                let query = {
                    project: ctx.rootState.project.id,
                    _sort: ctx.state.filter.sort,
                    _limit: ctx.state.filter.limit,
                }

                if (ctx.state.filter.search) {
                    query['name_contains'] = ctx.state.filter.search
                }

                if (ctx.state.filter.citizenCategory) {
                    query['citizenCategory'] = ctx.state.filter.citizenCategory
                }

                if (ctx.state.filter.tutor) {
                    query['tutor'] = ctx.state.filter.tutor
                }

                if (ctx.state.filter.sort) {
                    query['_sort'] = ctx.state.filter.sort
                }

                if (ctx.state.filter.page) {
                    query['_start'] = ((ctx.state.filter.page - 1) * ctx.state.filter.limit)
                }

                if (ctx.state.filter.period) {
                    let start = moment(ctx.state.filter.period.start).startOf('day')
                    let end = moment(ctx.state.filter.period.end).endOf('day')

                    query['registeredDate_gte'] = start.format('YYYY-MM-DD HH:mm:ss')
                    query['registeredDate_lte'] = end.format('YYYY-MM-DD HH:mm:ss')
                }

                query = qs.stringify(query)

                const res = await fetch(`${config.apiUrl}/applications/export?${query}`, {
                    method: 'get',
                    headers: {
                        Authorization: 'Bearer ' + VueCookies.get('token')
                    }
                })

                if (res.ok) {
                    const blob = await res.blob()
                    const url = window.URL.createObjectURL(blob);

                    let a = document.createElement('a')
                    a.href = url
                    a.target = '_blank'

                    document.body.appendChild(a)
                    a.click()
                    document.body.removeChild(a)
                }
            } catch (err) {
                console.error('err: ', err)
            }

            ctx.commit('isLoading', false, { root: true })
        }
    },
}
