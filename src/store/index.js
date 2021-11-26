import { createStore } from 'vuex'
import VueCookies from 'vue-cookies'

import pages from './modules/pages'
import es from './modules/es'
import teams from './modules/teams'
import events from './modules/events'

import applications from './applications'

import http from '@/store/http'

export default createStore({
    modules: {
        pages,
        es,
        teams,
        events,

        applications
    },

    state () {
        return {
            isLoading: false,
            notice: null,

            user: null,
            project: null,

            isListLoading: false,

            loading: {
                init: false,
                login: false,
            },
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
        },

        'loading.init' (state, value) {
            state.loading.init = value
        },

        'loading.login' (state, value) {
            state.loading.login = value
        }
    },

    actions: {
        async init (ctx) {
            ctx.commit('loading.init', true)

            const user = await http.get('/users/me')

            if (user) ctx.commit('user', user)

            ctx.commit('loading.init', false)
        },

        async login (ctx, data) {
            ctx.commit('loading.login', true)

            const res = await http.post('/auth/local', {
                identifier: data.login,
                password: data.password
            })

            if (res.jwt) {
                VueCookies.set('token', res.jwt)
                ctx.dispatch('init')
            } else {
                if (res.statusCode === 400) {
                    const message = res.message[0].messages[0];

                    if (message && message.id === 'Auth.form.error.invalid') {
                        ctx.commit('notice', {
                            type: 'error',
                            text: 'Неверный логин или пароль'
                        });
                    }
                }
            }

            ctx.commit('loading.login', false)
        },

        logout (ctx) {
            ctx.commit('user', null);
            VueCookies.remove('token');
        }
    }
})
