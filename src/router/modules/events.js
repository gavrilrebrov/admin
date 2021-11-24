import Events from '../../modules/copp/events/Index.vue'
import EventsList from '../../modules/copp/events/List.vue'
import EventsItem from '../../modules/copp/events/Item.vue'
import EventsEdit from '../../modules/copp/events/Edit.vue'
import EventsSchedule from '../../modules/copp/events/Schedule.vue'
import EventsParticipants from '../../modules/copp/events/Participants.vue'
import EventsCategories from '../../modules/copp/events/Categories.vue'
import EventsVideos from '@/modules/copp/events/videos/index.vue'
import EventsVacancies from '@/modules/copp/events/vacancies/index.vue'

import ScheduleList from '../../modules/copp/events/schedule/List.vue'
import ScheduleEdit from '../../modules/copp/events/schedule/Edit.vue'
import CategoriesList from '../../modules/copp/events/categories/List.vue'
import CategoriesEdit from '../../modules/copp/events/categories/Edit.vue'
import ParticipantsList from '../../modules/copp/events/participants/List.vue'

import VideosList from '@/modules/copp/events/videos/list.vue'
import VideosEdit from '@/modules/copp/events/videos/edit.vue'

import VacanciesList from '@/modules/copp/events/vacancies/list.vue'

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
            path: 'categories',
            component: EventsCategories,
            children: [
                {
                    path: '',
                    component: CategoriesList,
                    name: 'events-categories-list'
                },
                {
                    path: 'create',
                    component: CategoriesEdit,
                    name: 'events-categories-create'
                },
                {
                    path: ':categoryId',
                    component: CategoriesEdit,
                    name: 'events-categories-edit'
                }
            ]
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
                        },
                        {
                            path: 'create',
                            component: ScheduleEdit,
                            name: 'events-schedule-create'
                        },
                        {
                            path: ':scheduleId',
                            component: ScheduleEdit,
                            name: 'events-schedule-edit'
                        }
                    ]
                },
                {
                    path: 'participants',
                    component: EventsParticipants,
                    children: [
                        {
                            path: '',
                            component: ParticipantsList,
                            name: 'events-participants-list'
                        }
                    ]
                },
                {
                    path: 'videos',
                    component: EventsVideos,
                    children: [
                        {
                            path: '',
                            component: VideosList,
                            name: 'events-videos-list'
                        },
                        {
                            path: 'create',
                            component: VideosEdit,
                            name: 'events-videos-create'
                        },
                        {
                            path: ':videoId',
                            component: VideosEdit,
                            name: 'events-videos-edit'
                        }
                    ]
                },
                {
                    path: 'vacancies',
                    component: EventsVacancies,
                    children: [
                        {
                            path: '',
                            component: VacanciesList,
                            name: 'events-vacancies-list'
                        }
                    ]
                }
            ]
        }
    ]
}
