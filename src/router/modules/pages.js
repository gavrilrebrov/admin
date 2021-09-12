import Pages from '../../modules/pages/Index.vue'
import PagesList from '../../modules/pages/List.vue'
import PagesEdit from '../../modules/pages/Edit.vue'

export default {
    path: '/pages',
    component: Pages,
    children: [
        {
            path: '',
            component: PagesList,
            name: 'pages'
        },
        {
            path: ':pageId',
            component: PagesEdit,
            name: 'pages-edit'
        }
    ]
}
