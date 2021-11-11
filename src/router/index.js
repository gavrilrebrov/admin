import { createRouter, createWebHashHistory  } from 'vue-router'

import pages from './modules/pages'
import es from './modules/es'
import teams from './modules/teams'
import events from './modules/events'

import Home from '@/modules/Home.vue'

export default createRouter({
    history: createWebHashHistory(),

    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
        },
        pages,
        es,
        teams,
        events,
    ]
})
