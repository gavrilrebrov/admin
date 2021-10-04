<script setup>
import Card from '../../../../components/Card.vue'
import Table from '../../../../components/Table.vue'
import Icon from '../../../../components/Icon.vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const store = useStore()
const route = useRoute()
const isLoading = computed(() => store.state.events.isLoading)
const list = computed(() => {
    return store.state.events.categories.map(i => ({
        name: i.name,
        schedules: i.schedules.length,
        id: i.id
    }))
})

const columns = [
    { label: 'Название', key: 'name', },
    { label: 'Расписания', key: 'schedules' }
]
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

    <Table :columns="columns" :data="list" :edit="`events/${route.params.eventId}/categories`"
        v-if="!isLoading"
    />
</div>
</template>
