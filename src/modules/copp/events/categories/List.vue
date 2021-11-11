<script setup>
import Card from '../../../../components/Card.vue'
import Table from '../../../../components/Table.vue'
import Icon from '../../../../components/Icon.vue'
import Notice from '@/components/Notice.vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import { computed, onMounted } from 'vue'

const store = useStore()
const route = useRoute()
const router = useRouter()
const isLoading = computed(() => store.state.events.categories.isLoading)
const list = computed(() => {
    return store.state.events.categories.list && store.state.events.categories.list.map(i => ({
        name: i.name,
        id: i.id
    }))
})

const columns = [
    { label: 'Название', key: 'name', },
]

const create = () => {
    router.push(`/events/categories/create`)
}

const edit = id => {
    router.push(`/events/categories/${id}`)
}

onMounted(() => {
    store.dispatch('events/categories/getList')
})

</script>

<template>
<div>
    <div v-if="isLoading" class="
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

    <Notice class="mb-5" />

    <Card v-if="!isLoading">
        <template #header>
            <div class="font-medium text-gray-900 text-lg flex-grow">
                Список категорий
            </div>

            <div class="flex justify-end">
                <button class="text-sm font-semibold bg-blue-500 text-white py-2 px-3 rounded-md inline-flex items-center gap-x-1"
                    @click="create"
                >
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
                    {{ item.name }}
                </div>

                <button @click="edit(item.id)">
                    <Icon icon="pencil" class="w-5 h-5 text-blue-500" />
                </button>
            </div>
        </div>
    </Card>
</div>
</template>
