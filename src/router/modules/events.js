import Events from '../../modules/copp/events/Index.vue'
import EventsList from '../../modules/copp/events/List.vue'
import EventsItem from '../../modules/copp/events/Item.vue'
import EventsEdit from '../../modules/copp/events/Edit.vue'
import EventsSchedule from '../../modules/copp/events/Schedule.vue'
import EventsParticipants from '../../modules/copp/events/Participants.vue'
import EventsCategories from '../../modules/copp/events/Categories.vue'
import ScheduleList from '../../modules/copp/events/schedule/List.vue'
import CategoriesList from '../../modules/copp/events/categories/List.vue'

export default {
    path: '/events',
    component: Events,
    children: [
        {
            path: '',
            component: EventsList,
            name: 'events-list'
        },
        {
            path: ':eventId',
            component: EventsItem,
            children: [
                {
                    path: '',
                    component: EventsEdit,
                    name: 'events-edit'
                },
                {
                    path: 'schedule',
                    component: EventsSchedule,
                    children: [
                        {
                            path: '',
                            component: ScheduleList,
                            name: 'events-schedule-list'
                        }
                    ]
                },
                {
                    path: 'participants',
                    component: EventsParticipants,
                    name: 'events-participants'
                },
                {
                    path: 'categories',
                    component: EventsCategories,
                    children: [
                        {
                            path: '',
                            component: CategoriesList,
                            name: 'events-categories-list'
                        }
                    ]
                }
            ]
        }
    ]
}
