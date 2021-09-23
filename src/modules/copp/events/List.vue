<script setup>
import Table from '../../../components/Table.vue'
import Icon from '../../../components/Icon.vue'
import { computed } from 'vue'
import { useStore } from 'vuex'
import moment from 'moment/min/moment-with-locales'

const store = useStore()
const isLoading = computed(() => store.state.events.isLoading)
const list = computed(() => {
    const _list = store.state.events.list

    let output = []

    for (let i in _list) {
        let _item = _list[i]

        let schedules = _item.schedules.map(i => i.startDate)
        schedules = schedules.sort((a, b) => {
            if (a > b) return 1
            if (a < b) return -1
            return 0;
        })

        output.push({
            id: _item.id,
            name: _item.name,
            startDate: schedules[0],
            participants: _item.participants.length,
            description: _item.slug
        })
    }

    return output
})

const columns = [
    { label: 'Название', key: 'name', type: 'description' },
    { label: 'Начало', key: 'startDate', type: 'datetime' },
    { label: 'Участники', key: 'participants' },
]
</script>

<template>
<div>
    <div v-if="isLoading" class="w-full h-full flex items-center justify-center">
        <Icon icon="loader" class="w-16 h-16 text-blue-500 animate-spin" />
    </div>

    <Table :columns="columns" :data="list" edit="events"
        v-if="!isLoading"
    />
</div>
</template>
