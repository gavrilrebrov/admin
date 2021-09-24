<script setup>
import Card from '../../../components/Card.vue'
import Icon from '../../../components/Icon.vue'
import Notice from '../../../components/Notice.vue'
import Field from '../../../components/form/Field.vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { ref, computed, watch } from 'vue'

const store = useStore()
const event = computed(() => store.state.events.item)
const route = useRoute()
const isLoading = computed(() => store.state.events.isLoading)

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

const fields = [
    [
        {
            label: 'Название',
            slug: 'name',
            cols: 8
        },
        {
            label: 'Идентификатор',
            cols: 4,
            slug: 'slug'
        }
    ],
]

let values = ref({
    name: event.value ? event.value.name : '',
    slug: event.value ? event.value.slug : '',
})

const title = computed(() => {
    return route.name === 'events-edit' ? 'Редактирование мероприятия' : 'Создание мероприятия'
})

watch(event, value => {
    if (value) {
        values.value.name = value.name
        values.value.slug = value.slug
    }
})
</script>

<template>
<div>
    <Card>
        <template #header>
            <div class="font-medium text-gray-900 text-lg flex-grow">
                {{ title }}
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

        <Notice class="mb-4" />

        <div class="flex flex-col gap-y-4">
            <div class="flex gap-x-4"
                v-for="row, rowIndex in fields"
                :key="rowIndex"
            >
                <div :class="field.cols ? `w-${field.cols}/12` : 'w-full'"
                    v-for="field, fieldIndex in row" :key="fieldIndex"
                >
                    <Field :type="field.type" :items="field.items"
                        :label="field.label"
                        v-model="values[field.slug]"
                    />
                </div>
            </div>
        </div>
    </Card>
</div>
</template>
