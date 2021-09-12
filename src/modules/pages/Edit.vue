<script setup>
import Field from '../../components/form/Field.vue'
import Card from '../../components/Card.vue'
import Icon from '../../components/Icon.vue'

import { ref, computed, onMounted, watch } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

const store = useStore()
const route = useRoute()
const page = computed(() => store.state.pages.item)

const pages = computed(() => {
    let list = store.state.pages.list.filter(i => i.id !== Number(route.params.pageId))

    list = list.map(i => ({
        label: i.name,
        value: i.id
    }))

    list.unshift({ label: 'Нет родителя', value: null })

    console.log('page: ', page)

    return list
})

onMounted(async () => {
    await store.dispatch('pages/getItem', route.params.pageId)
})



const fields = [
    [
        {
            label: 'Название',
            cols: '6',
            slug: 'name',
        },
        {
            label: 'Идентификатор',
            cols: '2',
            slug: 'slug'
        },
        {
            label: 'Родитель',
            cols: '4',
            slug: 'page',
            type: 'select',
            items: pages.value
        }
    ],
    [
        {
            label: 'Содержимое',
            slug: 'content',
            type: 'editor'
        }
    ]
];

let values = ref({})
watch(page, value => {
    if (value) {

        values.value.name = value.name
        values.value.page = value.page && value.page.id
        values.value.content = value.content
        values.value.slug = value.slug
    }
})
</script>

<template>
<div class="p-5 container mx-auto lg:max-w-screen-lg" v-if="page">
    <Card>
        <template #header>
            <router-link class="mr-5" to="/pages">
                <Icon icon="arrow-left" class="w-6 text-blue-500" />
            </router-link>

            <div class="font-semibold text-gray-600 text-lg">
                Редактирование страницы
            </div>
        </template>

        <div class="flex flex-col gap-y-4">
            <div class="flex gap-x-4" v-for="row, rowIndex in fields" :key="rowIndex">
                <div :class="field.cols ? `w-${field.cols}/12` : 'w-full'" v-for="field, fieldIndex in row" :key="fieldIndex">
                    <Field :type="field.type" :items="field.items" :label="field.label" v-model="values[field.slug]" />
                </div>
            </div>
        </div>
    </Card>
</div>
</template>
