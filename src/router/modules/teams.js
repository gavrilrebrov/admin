import Teams from '../../modules/copp/teams/Index.vue'
import TeamsList from '../../modules/copp/teams/List.vue'

export default {
    path: '/teams',
    component: Teams,
    children: [
        {
            path: '',
            component: TeamsList,
            name: 'teams-list'
        }
    ]
}
