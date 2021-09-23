import { createRouter, createWebHashHistory  } from 'vue-router'

import pages from './modules/pages'
import es from './modules/es'
import teams from './modules/teams'

export default createRouter({
    history: createWebHashHistory(),

    routes: [
        pages,
        es,
        teams,
    ]
})
