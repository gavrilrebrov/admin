import { createRouter, createWebHashHistory  } from 'vue-router'

import pages from './modules/pages'
import es from './modules/es'

export default createRouter({
    history: createWebHashHistory(),

    routes: [
        pages,
        es,
    ]
})
