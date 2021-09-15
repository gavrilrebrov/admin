import ES from '../../modules/copp/es/Index.vue'
import ESList from '../../modules/copp/es/List.vue'
import ESItem from '../../modules/copp/es/Item.vue'

export default {
    path: '/es',
    component: ES,
    children: [
        {
            path: '',
            component: ESList,
            name: 'es-applications-list'
        },
        {
            path: ':applicationId',
            component: ESItem,
            name: 'es-applications-item'
        }
    ]
}
