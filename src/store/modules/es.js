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

            tutors: [],
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
        }
    },

    actions: {
        async getList (ctx, params = null) {
            ctx.commit('isLoading', true, { root: true })

            let query = {
                project: ctx.rootState.project.id,
                _sort: 'registeredDate:DESC',
                _limit: 200,
            }

            if (params && params.search) {
                query['name_contains'] = params.search
            }

            if (params && params.citizenCategory) {
                query['citizenCategory'] = params.citizenCategory
            }

            if (params && params.tutor) {
                query['tutor'] = params.tutor
            }

            if (params && params.sort) {
                query['_sort'] = params.sort
            }

            if (params && params.period) {
                let start = moment(params.period.start).startOf('day')
                let end = moment(params.period.end).endOf('day')

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

        async exportExcel (ctx, params) {
            ctx.commit('isLoading', true, { root: true })

            console.log('params: ', params)

            ctx.commit('isLoading', false, { root: true })
        }
    },
}
