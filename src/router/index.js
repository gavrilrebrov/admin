import { createRouter, createWebHistory  } from 'vue-router'

import pages from './modules/pages'
import es from './modules/es'

export default createRouter({
    history: createWebHistory(),

    routes: [
        pages,
        es,
    ]
})
