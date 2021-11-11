<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'

import Card from '@/components/Card.vue'
import Icon from '@/components/Icon.vue'
import Notice from '@/components/Notice.vue'
import Field from '@/components/form/Field.vue'

const route = useRoute()
const router = useRouter()
const store = useStore()

const back = () => {
    router.push('/events/categories')
}

const loading = store.state.events.categories.loading
const item = computed(() => store.state.events.categories.item)

const title = computed(() => {
    return route.name === 'events-categories-edit' ? 'Редактирование категории' : 'Создание категории'
})

const save = () => {
    store.dispatch('events/categories/save', {
        id: route.params.categoryId,
        fields: fields.value,
    })
}

const fields = ref({
    name: ''
})

onMounted(() => {
    store.commit('notice', null)
    if (route.params.categoryId) {
        store.dispatch('events/categories/getItem', route.params.categoryId)
    }
})

watch(item, value => {
    if (value) {
        fields.value.name = value.name
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
                <button class="button" @click="save"
                    :disabled="loading.save"
                >
                    <Icon icon="check" class="w-5 h-5" v-if="!loading.save" />
                    <Icon icon="loader" class="h-5 w-5 animate-spin" v-if="loading.save" />
                    <span>Сохранить</span>
                </button>
            </div>
        </template>

        <Notice />

        <div class="w-1/2">
            <Field label="Название" v-model="fields.name" />
        </div>

        <div class="mt-5" v-if="route.params.categoryId">
            <button class="button button_red">
                <Icon icon="x" class="w-5 h-5" />
                <span>Удалить</span>
            </button>
        </div>
    </Card>
</div>
</template>
