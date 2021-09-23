import { createRouter, createWebHashHistory  } from 'vue-router'

import pages from './modules/pages'
import es from './modules/es'
import teams from './modules/teams'
import events from './modules/events'

export default createRouter({
    history: createWebHashHistory(),

    routes: [
        pages,
        es,
        teams,
        events,
    ]
})
