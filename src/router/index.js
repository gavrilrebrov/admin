import { createRouter, createWebHistory  } from 'vue-router'

import pages from './modules/pages'

export default createRouter({
    history: createWebHistory(),

    routes: [
        pages,
    ]
})
