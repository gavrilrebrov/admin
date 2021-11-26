import Applications from '@/modules/applications/index.vue'
import ApplicationsList from '@/modules/applications/list.vue'

export default {
    path: '/applications',
    component: Applications,
    children: [
        {
            path: '',
            component: ApplicationsList,
            name: 'applications-list'
        }
    ]
}
