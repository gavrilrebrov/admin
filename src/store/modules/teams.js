import VueCookies from 'vue-cookies'
import qs from 'query-string'

import config from '../../config.json'

const url = config.apiUrl.copp

export default {
    namespaced: true,

    state () {
        return {
            list: [],
            isLoading: false,
            count: 0,

            grades: [],
            experts: [],

            documents: [],
        }
    },

    mutations: {
        list (state, value) {
            state.list = value
        },

        count (state, value) {
            state.count = value
        },

        isLoading (state, value) {
            state.isLoading = value
        },

        grades (state, value) {
            state.grades = value
        },

        experts (state, value) {
            state.experts = value
        },

        documents (state, value) {
            state.documents = value
        }
    },

    actions: {
        async getList (ctx) {
            ctx.commit('isLoading', true)

            let query = {
                _sort: 'identifier:ASC'
            }

            query = qs.stringify(query)

            try {
                const res = await fetch(`${url}/teams?${query}`, {
                    method: 'get',
                    headers: {
                        Authorization: 'Bearer ' + VueCookies.get('token')
                    }
                })

                const json = await res.json()

                const countRes = await fetch(`${url}/teams/count`, {
                    method: 'get',
                    headers: {
                        Authorization: 'Bearer ' + VueCookies.get('token')
                    }
                })

                const countJson = await countRes.json()

                if (res.ok) {
                    ctx.commit('list', json)
                }

                if (countRes.ok) {
                    ctx.commit('count', countJson)
                }

                const docRes = await fetch(`${url}/documents`, {
                    method: 'get',
                    headers: {
                        Authorization: 'Bearer ' + VueCookies.get('token')
                    }
                })

                const docJson = await docRes.json()

                if (docRes.ok) ctx.commit('documents', docJson)
            } catch (err) {
                console.error('err: ', err)
            }

            ctx.commit('isLoading', false)
        },

        async saveGrades (ctx, data) {
            ctx.commit('isLoading', true)

            try {
                let errors = 0

                for (let i in data) {
                    let team = data[i]

                    let query = {
                        team: team.id,
                        expert: ctx.rootState.user.id
                    }

                    query = qs.stringify(query)

                    const res = await fetch(`${url}/grades?${query}`, {
                        method: 'get',
                        headers: {
                            Authorization: 'Bearer ' + VueCookies.get('token')
                        }
                    })

                    const json = await res.json()
                    if (res.ok) {
                        const obj = {
                            value: +(team.grade),
                            expert: ctx.rootState.user.id,
                            team: team.id
                        }

                        const formData = new FormData()
                        formData.append('data', JSON.stringify(obj))

                        if (json.length === 0) {
                            const createRes = await fetch(`${url}/grades`, {
                                method: 'post',
                                body: formData,
                                headers: {
                                    Authorization: 'Bearer ' + VueCookies.get('token')
                                }
                            })

                            if (!createRes.ok) {
                                errors++
                            }
                        } else {
                            const updateRes = await fetch(`${url}/grades/${json[0].id}`, {
                                method: 'put',
                                body: formData,
                                headers: {
                                    Authorization: 'Bearer ' + VueCookies.get('token')
                                }
                            })

                            if (!updateRes.ok) {
                                errors++
                            }
                        }
                    }
                }

                if (errors === 0) {
                    ctx.commit('notice', {
                        type: 'success',
                        text: 'Оценки сохранены'
                    }, { root: true })
                }
            } catch (err) {
                console.error('err: ', err)
            }

            ctx.commit('isLoading', false)
        },

        async getExperts (ctx) {
            ctx.commit('isLoading', true)

            try {
                let query = {
                    role: 7,
                }

                query = qs.stringify(query)

                const res = await fetch(`${url}/users?${query}`, {
                    method: 'get',
                    headers: {
                        Authorization: 'Bearer ' + VueCookies.get('token')
                    }
                })

                const json = await res.json()

                if (res.ok) {
                    ctx.commit('experts', json)
                }
            } catch (err) {
                console.error('err: ', err)
            }

            ctx.commit('isLoading', false)
        },

        async downloadDocuments (ctx, id) {
            ctx.commit('isLoading', true)

            try {
                const res = await fetch(`${url}/participants/${id}/documents`, {
                    method: 'get',
                    headers: {
                        Authorization: 'Bearer ' + VueCookies.get('token')
                    }
                })

                const blob = await res.blob()

                const _url = window.URL || window.webkitURL;
                const link = _url.createObjectURL(blob);

                let a = document.createElement('a')
                a.href = link
                a.target = '_blank'

                document.body.appendChild(a)
                a.click()
                document.body.removeChild(a)
            } catch (err) {
                console.error('err: ', err)
            }

            ctx.commit('isLoading', false)
        }
    }
}
