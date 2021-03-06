<script setup>
import Card from '@/components/Card.vue'
import Icon from '@/components/Icon.vue'
import Table from '@/components/Table.vue'
import Field from '@/components/form/Field.vue'

import VPagination from "@hennge/vue3-pagination"

import { useStore } from 'vuex'
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const store = useStore()
const route = useRoute()

const loading = store.state.events.participants.loading

const schedules = computed(() => {
    let records = store.state.events.schedules.list.map(i => ({
        label: i.title,
        value: i.id,
    }))

    records.unshift({
        label: 'Все события',
        value: null,
    })

    return records
})

onMounted(async () => {
    await store.dispatch('events/schedules/getList', route.params.eventId)
    await store.dispatch('events/participants/getList', route.params.eventId)
})

const columns = [
    { label: 'ФИО', key: 'name', type: 'description' },
    { label: 'Контакты', key: 'contacts', type: 'contacts' },
    { label: 'Образование', key: 'education' },
    { label: 'Событие', key: 'schedule' },
    { label: 'Дата регистрации', key: 'date', type: 'datetime' }
]

const list = computed(() => {
    return store.state.events.participants.list.map(i => {
        let age = declOfNum(+i.age, ['год', 'года', 'лет'])

        return {
            name: i.name,
            contacts: {
                phone: i.phone,
                email: i.email,
            },
            id: i.id,
            education: i.education,
            schedule: i.schedule && i.schedule.title,
            description: `${i.activityStatus}, ${i.age} ${age}`,
            date: i.created_at
        }
    })
})

const declOfNum = (number, titles) => {
    const cases = [2, 0, 1, 1, 1, 2]

    return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]]
}

let selectedSchedule = ref(null)

watch(selectedSchedule, value => {
    store.commit('events/participants/filter', { key: 'schedule', value })
    store.commit('events/participants/filter', { key: 'page', value: 1 })
    store.dispatch('events/participants/getList', route.params.eventId)
})

const count = computed(() => {
    return store.state.events.participants.count
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
    store.commit('events/participants/filter', { key: 'page', value })
    store.dispatch('events/participants/getList', route.params.eventId)
})

let exportExcel = () => {
    store.dispatch('events/participants/export.excel', route.params.eventId)
}
</script>

<template>
<div>
    <div class="grid grid-cols-2 mb-5 gap-x-5 items-end">
        <Field label="Событие" type="select" :items="schedules" v-model="selectedSchedule" />

        <div v-if="count > 50" class="mb-1">
            <VPagination
                v-model="page"
                :pages="totalPages"
                :range-size="1"
            />
        </div>
    </div>

    <div class="mb-5">
        <button class="button button_green" @click="exportExcel()" :disabled="loading.export">
            <Icon icon="excel" class="w-5" v-if="!loading.export" />
            <Icon icon="loader" class="w-5 h-5 text-white animate-spin" v-if="loading.export" />
            <div>Выгрузить</div>
        </button>
    </div>

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

    <Table :columns="columns" :data="list" v-if="!loading.get" />
</div>
</template>
