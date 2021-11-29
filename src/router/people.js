import People from '@/modules/people/index.vue'
import PeopleList from '@/modules/people/list.vue'
import PeopleEdit from '@/modules/people/edit.vue'

export default {
    path: '/people',
    component: People,
    children: [
        {
            path: '',
            component: PeopleList,
            name: 'people-list'
        },
        {
            path: 'create',
            component: PeopleEdit,
            name: 'people-create'
        },
        {
            path: ':personId',
            component: PeopleEdit,
            name: 'people-edit'
        }
    ]
}
