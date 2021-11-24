<script setup>
import { useStore } from 'vuex'
import { onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import Icon from '@/components/Icon.vue'
import Notice from '@/components/Notice.vue'
import Card from '@/components/Card.vue'

const store = useStore()
const route = useRoute()
const router = useRouter()

onMounted(() => {
    store.dispatch('events/videos/list.get', route.params.eventId)
})

const loading = computed(() => store.state.events.videos.loading)

const create = () => {
    router.push(`/events/${route.params.eventId}/videos/create`)
}

const list = computed(() => store.state.events.videos.list)

const edit = id => router.push(`/events/${route.params.eventId}/videos/${id}`)
</script>

<template>
<div>
    <div v-if="loading.get" class="w-full h-full flex items-center justify-center">
        <Icon icon="loader" class="w-16 h-16 text-blue-500 animate-spin" />
    </div>

    <Notice class="mb-5" />

    <Card v-if="!loading.get">
        <template #header>
            <div class="font-medium text-gray-900 text-lg flex-grow">
                Видеоролики
            </div>

            <div class="flex justify-end">
                <button class="button" @click="create">
                    <Icon icon="plus" class="w-5 h-5" />
                    <span>Создать</span>
                </button>
            </div>
        </template>

        <div class="divide-y -mx-5 -my-5">
            <div v-for="item, index in list" :key="index"
                class="flex justify-between py-3 px-5"
            >
                <div class="text-sm font-medium">
                    {{ item.title }}
                </div>

                <button @click="edit(item.id)">
                    <Icon icon="pencil" class="w-5 h-5 text-blue-500" />
                </button>
            </div>
        </div>
    </Card>
</div>
</template>
