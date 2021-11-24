<script setup>
import { useStore } from 'vuex'
import { onMounted, computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

import Icon from '@/components/Icon.vue'
import Notice from '@/components/Notice.vue'
import Table from '@/components/Table.vue'

import VPagination from "@hennge/vue3-pagination"

const store = useStore()
const route = useRoute()

onMounted(() => store.dispatch('events/vacancies/list.get', route.params.eventId))

const list = computed(() => {
    return store.state.events.vacancies.list.map(i => ({
        name: i.name,
        salary: i.salary,
        industry: i.industry.name,
        count: i.count,
        organization: i.organization,
        address: i.address
    }))
})
const loading = computed(() => store.state.events.vacancies.loading)

const columns = [
    { label: 'Название', key: 'name' },
    { label: 'ЗП', key: 'salary' },
    { label: 'Отрасль', key: 'industry' },
    { label: 'Места', key: 'count' },
    { label: 'Организация', key: 'organization' },
    { label: 'Адрес', key: 'address' }
]

const count = computed(() => {
    return store.state.events.vacancies.count
})

let page = ref(1)
const offset = 50
let totalPages = computed(() => {
    let pages = 0

    pages = Math.floor(count.value / offset)

    if (count.value % offset) {
        pages++
    }

    return pages
})

watch(page, async value => {
    store.commit('events/vacancies/filter', { key: 'page', value })
    store.dispatch('events/vacancies/list.get', route.params.eventId)
})

const notice = ref(null)

const importVacancies = () => {
    notice.value = null

    store.dispatch('events/vacancies/import')

    notice.value = 'Импорт запущен и выполняется в фоновом режиме'
}
</script>

<template>
<div>
    <div class="flex justify-between items-center mb-5">
        <div v-if="count > 50">
            <VPagination
                v-model="page"
                :pages="totalPages"
                :range-size="1"
            />
        </div>

        <div class="flex-grow text-right">
            <div v-if="notice">
                {{ notice }}
            </div>
        </div>

        <div class="text-right">
            <button class="button" @click="importVacancies">
                <Icon icon="cloud-download" class="w-5 h-6 text-white" />
                <div>
                    Импорт вакансий с облака
                </div>
            </button>

            <div class="text-xs mt-2 text-red-500">
                Внимание! После запуска импорта все текущие вакансии мероприятия удалятся!
            </div>
        </div>
    </div>

    <div v-if="loading.get" class="w-full h-full flex items-center justify-center">
        <Icon icon="loader" class="w-16 h-16 text-blue-500 animate-spin" />
    </div>

    <Notice class="mb-5" />

    <Table :columns="columns" :data="list" v-if="!loading.get" />
</div>
</template>
