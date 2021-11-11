<script setup>
import Card from '../../../components/Card.vue'
import Icon from '../../../components/Icon.vue'
import Notice from '../../../components/Notice.vue'
import Field from '../../../components/form/Field.vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { ref, computed, watch, onMounted } from 'vue'

const store = useStore()
const event = computed(() => store.state.events.item)
const route = useRoute()
const isLoading = computed(() => store.state.events.isLoading)

const loading = store.state.events.loading

const save = () => {
    store.commit('notice', null)

    if (
        values.value.name === '' ||
        values.value.slug === ''
    ) {
        store.commit('notice', {
            type: 'error',
            text: 'Название и идентификатор не могут быть пустыми'
        })
    } else {
        store.dispatch('events/save', {
            data: values.value,
            id: route.name === 'events-edit' ? route.params.eventId : null
        })
    }
}

let values = ref({
    name: event.value ? event.value.name : '',
    slug: event.value ? event.value.slug : '',
    description: event.value ? event.value.description : '',
    // logo: event.value ? event.value.logo : '',
})

const title = computed(() => {
    return route.name === 'events-edit' ? 'Редактирование мероприятия' : 'Создание мероприятия'
})

watch(event, value => {
    if (value) {
        values.value.name = value.name
        values.value.slug = value.slug
        values.value.description = value.description
    }
})

onMounted(() => {
    store.dispatch('events/getItem', route.params.eventId)
})
</script>

<template>
<div>
    <div v-if="loading.get" class="w-full h-full flex items-center justify-center">
        <Icon icon="loader" class="w-16 h-16 text-blue-500 animate-spin" />
    </div>

    <Notice class="mb-4" />

    <Card v-if="!loading.get">
        <template #header>
            <div class="font-medium text-gray-900 text-lg flex-grow">
                Общяя информация о мероприятии
            </div>

            <div>
                <button class="
                        text-sm
                        font-semibold
                        bg-blue-500
                        text-white
                        py-2 px-3
                        rounded-md
                        inline-flex
                        items-center
                        gap-x-1
                    "
                    @click="save"
                >
                    <Icon icon="check" class="h-5 w-5" v-if="!isLoading" />
                    <Icon icon="loader" class="h-5 w-5 animate-spin" v-if="isLoading" />
                    <span>Сохранить</span>
                </button>
            </div>
        </template>
    </Card>
</div>
</template>
