<script setup>
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { computed, ref, watch } from 'vue'
// import VPagination from "@hennge/vue3-pagination"
import "@hennge/vue3-pagination/dist/vue3-pagination.css"

import Icon from '../../../components/Icon.vue'

const route = useRoute()
const store = useStore()
const router = useRouter()

const event = computed(() => store.state.events.item)
const count = computed(() => {
    if (route.name === 'events-list') {
        return store.state.events.count
    } else if (route.name === 'events-categories-list') {
        return store.state.events.categories.count
    } else if (route.name === 'events-participants-list') {
        return store.state.events.participants.count
    } else if (route.name === 'events-videos-list') {
        return store.state.events.videos.count
    } else if (route.name === 'events-vacancies-list') {
        return store.state.events.vacancies.count
    }
})
const back = () => {
    store.dispatch('events/getList')
    router.push('/events')
}

const title = computed(() => {
    if (route.name === 'events-list') {
        return 'Мероприятия'
    } else if  (
        route.name === 'events-edit' ||
        route.name === 'events-schedule-list' ||
        route.name === 'events-schedule-create' ||
        route.name === 'events-schedule-edit' ||
        route.name === 'events-participants-list' ||
        route.name === 'events-videos-list' ||
        route.name === 'events-videos-create' ||
        route.name === 'events-videos-edit' ||
        route.name === 'events-vacancies-list'
    ) {
        return 'Редактирование мероприятия'
    } else if (
        route.name === 'events-categories-list' ||
        route.name === 'events-categories-edit' ||
        route.name === 'events-categories-create'
    ) {
        return 'Категории событий'
    }
})
</script>

<template>
<div>
    <div class="bg-white
            px-6 shadow sticky top-0
            z-30
        "
    >
        <div class="
                container
                mx-auto
                max-w-screen-xl
                flex items-center
                justify-between
                gap-x-6
            "
        >
            <div class="
                    font-semibold
                    text-lg
                    flex items-center
                    py-4 gap-x-4
                "
            >
                <button @click="back" v-if="route.name !== 'events-list' && route.name !== 'events-categories-list' && route.name !== 'events-categories-edit' && route.name !== 'events-categories-create'">
                    <Icon icon="arrow-left" class="w-6 text-blue-500" />
                </button>

                <div>
                    {{ title }}
                </div>
            </div>

            <div v-if="route.name === 'events-list' || route.name === 'events-categories-list' || route.name === 'events-participants-list' || route.name === 'events-videos-list' || route.name === 'events-vacancies-list'"
                class="
                    flex-grow
                    text-sm
                    text-gray-500
                "
            >
                Найдено записей: {{ count }}
            </div>

            <div class="inline-flex gap-x-2" v-if="route.name === 'events-list' || route.name === 'events-categories-list' || route.name === 'events-categories-create' || route.name === 'events-categories-edit'">
                <router-link :to="`/events`" class="py-2 px-3 text-sm rounded font-semibold text-gray-500"
                    :class="{ 'text-blue-500 bg-blue-100': route.name === 'events-list' }"
                >
                    Мероприятия
                </router-link>

                <router-link to="/events/categories" class="py-2 px-3 text-sm rounded font-semibold text-gray-500"
                    :class="{ 'text-blue-500 bg-blue-100': route.name === 'events-categories-list' || route.name === 'events-categories-create' || route.name === 'events-categories-edit' }"
                >
                    Категории событий
                </router-link>
            </div>

            <div class="
                    inline-flex
                    gap-x-2
                "
                v-if="route.name !== 'events-list' && route.name !== 'events-categories-list' && route.name !== 'events-categories-create' && route.name !== 'events-categories-edit'"
            >
                <router-link
                    :to="`/events/${route.params.eventId}`"
                    class="
                        py-2
                        px-3
                        text-sm
                        rounded
                        font-semibold
                        text-gray-500
                    "
                    :class="{
                        'text-blue-500 bg-blue-100': route.name === 'events-edit'
                    }"
                >
                    Мероприятие
                </router-link>

                <router-link
                    :to="`/events/${route.params.eventId}/schedule`"
                    class="
                        py-2
                        px-3
                        text-sm
                        rounded
                        font-semibold
                        text-gray-500
                    "
                    :class="{
                        'text-blue-500 bg-blue-100': route.name === 'events-schedule-list' || route.name === 'events-schedule-create' || route.name === 'events-schedule-edit'
                    }"
                >
                    Программа
                </router-link>

                <router-link
                    :to="`/events/${route.params.eventId}/participants`"
                    class="
                        py-2
                        px-3
                        text-sm
                        rounded
                        font-semibold
                        text-gray-500
                    "
                    :class="{
                        'text-blue-500 bg-blue-100': route.name === 'events-participants-list'
                    }"
                >
                    Участники
                </router-link>

                <router-link
                    :to="`/events/${route.params.eventId}/videos`"
                    class="
                        py-2
                        px-3
                        text-sm
                        rounded
                        font-semibold
                        text-gray-500
                    "
                    :class="{
                        'text-blue-500 bg-blue-100': route.name === 'events-videos-list' || route.name === 'events-videos-create' || route.name === 'events-videos-edit'
                    }"
                >
                    Видео
                </router-link>

                <router-link
                    :to="`/events/${route.params.eventId}/vacancies`"
                    class="
                        py-2
                        px-3
                        text-sm
                        rounded
                        font-semibold
                        text-gray-500
                    "
                    :class="{
                        'text-blue-500 bg-blue-100': route.name === 'events-vacancies-list'
                    }"
                >
                    Вакансии
                </router-link>
            </div>
        </div>
    </div>

    <div class="p-6">
        <div class="
                container
                mx-auto
                max-w-screen-xl
            "
        >
            <router-view />
        </div>
    </div>
</div>
</template>
