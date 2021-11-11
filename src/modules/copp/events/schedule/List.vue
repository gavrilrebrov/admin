<script setup>
import Card from '../../../../components/Card.vue'
import Icon from '../../../../components/Icon.vue'
import { useStore } from 'vuex'
import { computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const store = useStore()
const dates = computed(() => store.getters['events/schedules/ordered'])
const route = useRoute()
const router = useRouter()

const loading = store.state.events.schedules.loading

const create = () => {
    router.push(`/events/${route.params.eventId}/schedule/create`)
}

onMounted(() => store.dispatch('events/schedules/getList', route.params.eventId))
</script>

<template>
<div>
    <div v-if="loading.get" class="
            w-full h-full
            flex items-center
            justify-center
        "
    >
        <Icon icon="loader" class="
                w-16 h-16 text-blue-500
                animate-spin
            "
        />
    </div>

    <Card v-if="!loading.get">
        <template #header>
            <div class="font-medium text-gray-900 text-lg flex-grow">
                Программа мероприятия
            </div>

            <div>
                <button class="button" @click="create">
                    <Icon icon="plus" class="h-5 w-5" />
                    <span>Создать</span>
                </button>
            </div>
        </template>

        <div class="
            flex flex-col
            gap-y-5
        ">
            <div v-for="date, dateIndex in dates"
                :key="dateIndex"
            >
                <div class="
                        font-medium
                        border-b
                        py-4
                        px-5
                        text-center
                        -mx-5
                        -mt-5
                        bg-gray-100
                        border-t
                    "
                >
                    {{ date.label }}
                </div>

                <div class="flex flex-col
                        divide-y
                        -mx-5
                        -mb-5
                        pb-5
                    "
                >
                    <div v-for="item in date.items"
                        :key="item.id"
                        class="flex gap-x-5 p-5"
                    >
                        <div class="w-30
                                font-semibold
                                text-blue-500
                                flex-shrink-0
                            "
                        >{{ item.time }}</div>

                        <div class="w-8/12 flex-grow">
                            <div class="font-semibold">
                                {{ item.title }}
                            </div>

                            <div v-if="item.organizer"
                                class="text-gray-500
                                    text-sm
                                    mt-1
                                "
                            >
                                {{ item.organizer }}
                            </div>
                        </div>

                        <div class="w-2/12">
                            <div v-if="item.category"
                                class="inline-flex
                                    text-xs
                                    font-semibold
                                    bg-blue-100
                                    text-blue-500
                                    px-2
                                    py-1
                                    rounded
                                "
                            >
                                {{ item.category }}
                            </div>
                        </div>

                        <div class="flex flex-col gap-y-2 w-1/12">
                            <a target="_blank" v-if="item.zoom"
                                :href="item.zoom.link"
                                title="Конференция ZOOM"
                            >
                                <Icon icon="zoom" class="w-6 h-6" />
                            </a>

                            <a target="_blank" v-if="item.youtube"
                                :href="item.youtube.link"
                                title="Трансляция Youtube"
                            >
                                <Icon icon="youtube" class="w-6 h-5" />
                            </a>
                        </div>

                        <div>
                            <router-link :to="`/events/${route.params.eventId}/schedule/${item.id}`">
                                <Icon icon="pencil" class="w-6 h-6 text-blue-500" />
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Card>
</div>
</template>
