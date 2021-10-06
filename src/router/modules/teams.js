import Teams from '../../modules/copp/teams/Index.vue'
import TeamsList from '../../modules/copp/teams/List.vue'
import TeamsGrades from '../../modules/copp/teams/Grades.vue'

export default {
    path: '/teams',
    component: Teams,
    children: [
        {
            path: '',
            component: TeamsList,
            name: 'teams-list'
        },
        {
            path: 'grades',
            component: TeamsGrades,
            name: 'teams-grades'
        }
    ]
}
