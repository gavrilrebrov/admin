import Events from '../../modules/copp/events/Index.vue'
import EventsList from '../../modules/copp/events/List.vue'
import EventsItem from '../../modules/copp/events/Item.vue'
import EventsEdit from '../../modules/copp/events/Edit.vue'
import EventsSchedule from '../../modules/copp/events/Schedule.vue'
import EventsParticipants from '../../modules/copp/events/Participants.vue'

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
                    name: 'events-schedule'
                },
                {
                    path: 'participants',
                    component: EventsParticipants,
                    name: 'events-participants'
                }
            ]
        }
    ]
}
