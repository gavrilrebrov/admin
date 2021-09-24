<script setup>
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { computed } from 'vue'
import Icon from '../../../components/Icon.vue'

const route = useRoute()
const store = useStore()
const router = useRouter()

const event = computed(() => store.state.events.item)
const count = computed(() => store.state.events.count)
const back = () => {
    store.dispatch('events/getList')
    router.push('/events')
}
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
                <button @click="back" v-if="route.name !== 'events-list'">
                    <Icon icon="arrow-left" class="w-6 text-blue-500" />
                </button>

                <div v-if="route.name === 'events-list'">
                    Мероприятия
                </div>

                <div v-if="route.name !== 'events-list' && event">
                    {{ event.name }}
                </div>
            </div>

            <div v-if="route.name === 'events-list'"
                class="
                    flex-grow
                    text-sm
                    text-gray-500
                "
            >
                Найдено записей: {{ count }}
            </div>

            <div class="
                    inline-flex
                    gap-x-2
                "
                v-if="route.name !== 'events-list'"
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
                        'text-blue-500 bg-blue-100': route.name === 'events-schedule-list'
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
                        'text-blue-500 bg-blue-100': route.name === 'events-participants'
                    }"
                >
                    Участники
                </router-link>

                <router-link
                    :to="`/events/${route.params.eventId}/categories`"
                    class="
                        py-2 px-3
                        text-sm rounded
                        font-semibold
                        text-gray-500
                    "
                >
                    Категории
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
