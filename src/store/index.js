import { createStore } from 'vuex'
import VueCookies from 'vue-cookies'
import config from '../config.json'

import pages from './modules/pages'
import es from './modules/es'
import teams from './modules/teams'
import events from './modules/events'

let url

if (window.location.hostname === 'admin.copp14.ru') {
    url = config.apiUrl.copp
} else if (window.location.hostname === 'localhost') {
    url = config.apiUrl.grebrov
} else {
    url = config.apiUrl.grebrov
}

export default createStore({
    modules: {
        pages,
        es,
        teams,
        events,
    },

    state () {
        return {
            isLoading: false,
            notice: null,

            user: null,
            project: null,

            isListLoading: false
        }
    },

    mutations: {
        isLoading (state, value) {
            state.isLoading = value
        },

        notice (state, value) {
            state.notice = value
        },

        user (state, value) {
            state.user = value
        },

        project (state, value) {
            state.project = value
        },

        isListLoading (state, value) {
            state.project = value
        }
    },

    actions: {
        async init (ctx) {
            ctx.commit('isLoading', true)

            if (VueCookies.get('token')) {
                try {
                    const res = await fetch(url + '/users/me', {
                        method: 'get',
                        headers: {
                            Authorization: 'Bearer ' + VueCookies.get('token')
                        }
                    })

                    const json = await res.json()

                    if (res.ok) {
                        ctx.commit('user', json)
                    }
                } catch (err) {
                    console.error('err: ', err)
                }
            } else {
                ctx.commit('user', null)
            }

            ctx.commit('isLoading', false)
        },

        async login (ctx, data) {
            ctx.commit('isLoading', true)

            try {
                const res = await fetch(url + '/auth/local', {
                    method: 'post',
                    body: JSON.stringify({
                        identifier: data.login,
                        password: data.password,
                    }),
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8',
                    }
                })

                const json = await res.json()

                if (res.ok) {
                    VueCookies.set('token', json.jwt)
                    ctx.dispatch('init')
                } else {
                    if (json.statusCode === 400) {
                        const message = json.message[0].messages[0];

                        if (message && message.id === 'Auth.form.error.invalid') {
                            ctx.commit('notice', {
                                type: 'error',
                                text: 'Неверный логин или пароль'
                            });
                        }
                    }
                }
            } catch (err) {
                console.error('err: ', err)
            }

            ctx.commit('isLoading', false)
        },

        logout (ctx) {
            ctx.commit('user', null);
            VueCookies.remove('token');
        }
    }
})
