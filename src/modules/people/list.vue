<script setup>
import { useStore } from 'vuex'
import { computed, onMounted, ref, watch } from 'vue'
import VPagination from '@hennge/vue3-pagination'

import Table from '@/components/Table.vue'
import Loader from '@/components/Loader.vue'

const store = useStore()

const columns = [
    { label: 'Фото', key: 'photo', type: 'avatar' },
    { label: 'Имя', key: 'name', type: 'description' },
]

const loading = computed(() => store.state.people.loading)
const list = computed(() => store.state.people.list)
const count = computed(() => store.state.people.count)
const filter = computed(() => store.state.people.filter)

let page = ref(1)
const offset = filter.value.limit
let totalPages = computed(() => {
    let pages = 0

    pages = Math.floor(count.value / offset)

    if (count.value % offset) {
        pages++
    }

    return pages
})

watch(page, async value => {
    store.commit('people/filter', { key: 'page', value })
    store.dispatch('people/list.get')
})

onMounted(() => store.dispatch('people/list.get'))
</script>

<template>
<div class="p-5 w-full">
    <div class="container mx-auto lg:max-w-screen-lg">
        <Loader v-if="loading.get" />

        <div v-if="!loading.get" class="flex flex-col gap-y-5">
            <div class="flex items-center justify-between">
                <div class="text-sm text-gray-500">
                    Найдено записей: {{ count }}
                </div>

                <VPagination
                    v-if="count > 50"
                    v-model="page"
                    :pages="totalPages"
                    :range-size="1"
                />
            </div>

            <Table :columns="columns" :data="list" edit="people" />
        </div>
    </div>
</div>
</template>
