<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'

import Icon from '@/components/Icon.vue'
import Card from '@/components/Card.vue'
import Notice from '@/components/Notice.vue'
import Field from '@/components/form/Field.vue'

const route = useRoute()
const router = useRouter()
const store = useStore()

const back = () => router.push(`/events/${route.params.eventId}/videos`)

const loading = computed(() => store.state.events.videos.loading)
const item = computed(() => store.state.events.videos.item)

const title = computed(() => {
    return route.name === 'events-videos-edit' ? 'Редактирование видео' : 'Создание видео'
})

onMounted(() => {
    store.commit('notice', null)

    if (route.params.videoId) {
        store.dispatch('events/videos/item.get', route.params.videoId)
    }
})

const fields = ref({
    title: '',
    identifier: '',
})

const save = () => {
    store.dispatch('events/videos/save', {
        id: route.params.videoId,
        fields: fields.value,
        eventId: route.params.eventId,
    })
}

const remove = () => {
    store.dispatch('events/videos/remove', {
        id: route.params.videoId,
        eventId: route.params.eventId
    })
}

watch(item, value => {
    if (value) {
        fields.value.title = value.title
        fields.value.identifier = value.identifier
    }
})
</script>

<template>
<div>
    <div v-if="loading.get" class="w-full h-full flex items-center justify-center">
        <Icon icon="loader" class="w-16 h-16 text-blue-500 animate-spin" />
    </div>

    <Card v-if="!loading.get">
        <template #header>
            <div class="flex-shrink-0 flex items-center mr-4">
                <button @click="back">
                    <Icon icon="arrow-left" class="w-6 text-blue-500" />
                </button>
            </div>

            <div class="font-medium text-gray-900 text-lg flex-grow">
                {{ title }}
            </div>

            <div>
                <button class="button" @click="save" :disabled="loading.save">
                    <Icon icon="check" class="w-5 h-5" v-if="!loading.save" />
                    <Icon icon="loader" class="w-5 h-5 animate-spin" v-if="loading.save" />
                    <span>Сохранить</span>
                </button>
            </div>
        </template>

        <Notice />

        <div class="flex gap-x-4">
            <div class="w-1/2">
                <Field label="Заголовок" v-model="fields.title" />
            </div>

            <div class="w-1/2">
                <Field label="Идентификатор ролика в YouTube" v-model="fields.identifier" />
            </div>
        </div>

        <div class="mt-5" v-if="route.params.videoId">
            <button class="button button_red" @click="remove">
                <Icon icon="x" class="w-5 h-5" v-if="!loading.remove" />
                <Icon icon="loader" class="w-5 h-5 animate-spin" v-if="loading.remove" />
                <span>Удалить</span>
            </button>
        </div>
    </Card>
</div>
</template>
