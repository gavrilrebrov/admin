<script setup>
import Card from '../../../../components/Card.vue'
import Icon from '../../../../components/Icon.vue'
import Notice from '../../../../components/Notice.vue'
import Form from '../../../../components/Form.vue'

import { useStore } from 'vuex'
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const store = useStore()
const route = useRoute()
const router = useRouter()
const isLoading = computed(() => store.state.events.isLoading)

const fields = [
    [
        {
            label: 'Заголовок',
            slug: 'title',
            cols: 8
        },
        {
            label: 'Начало',
            slug: 'startDate',
            cols: 2,
            type: 'datetime'
        },
        {
            label: 'Конец',
            slug: 'endDate',
            cols: 2,
            type: 'datetime'
        }
    ],
    [
        {
            label: 'Категория',
            slug: 'category',
            cols: 6,
            type: 'select',
            items: []
        }
    ],
    [
        {
            label: 'Описание',
            slug: 'description',
            cols: 8,
            type: 'editor'
        }
    ]
]

const save = () => {
    console.log('save...')
    console.log('store: ', store.state.events.schedules.values)
}

onMounted(async () => {
    if (route.name === 'events-schedule-edit') {
        store.dispatch('events/schedules/getItem', route.params.scheduleId)
    }
})

const back = () => {
    store.dispatch('events/schedules/getList', route.params.eventId)
    router.push(`/events/${route.params.eventId}/schedule`)
}

const title = computed(() => {
    return route.name === 'events-schedule-edit' ? 'Редактирование расписания' : 'Создать расписание'
})
</script>

<template>
<div>
    <Card>
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
                <button class="text-sm font-semibold bg-blue-500 text-white py-2 px-3 rounded-md inline-flex items-center gap-x-1"
                    @click="save"
                >
                    <Icon icon="check" class="w-5 h-5" v-if="!isLoading" />
                    <span>Сохранить</span>
                </button>
            </div>
        </template>

        <Notice class="mb-4" />

        <Form :fields="fields" :values="store.state.events.schedules.values"  />
    </Card>
</div>
</template>
