<script setup>
import Icon from '../../../components/Icon.vue'
import { useRoute, useRouter } from 'vue-router'
import VPagination from "@hennge/vue3-pagination"
import "@hennge/vue3-pagination/dist/vue3-pagination.css"
import { useStore } from 'vuex'
import { ref, computed, watch } from 'vue'

const route = useRoute()
const router = useRouter()
const store = useStore()

let search = ref('')

const back = () => {
    router.push('/es')
    store.dispatch('es/getList')
}

const onSubmit = (e) => {
    e.preventDefault()
    store.commit('es/filter', { key: 'search', value: search.value })
    store.commit('es/filter', { key: 'page', value: 1 })
    store.dispatch('es/getList')
}

const count = computed(() => store.state.es.count)

let page = ref(1)
const offset = 100
let totalPages = computed(() => {
    let pages = 0

    pages = Math.floor(count.value / offset)

    if (count.value % offset) {
        pages++
    }

    return pages
})

watch(page, async value => {
    store.commit('es/filter', { key: 'page', value })
    store.dispatch('es/getList')
})
</script>

<template>
<div>
    <div class="bg-white px-6 shadow sticky top-0 z-30">
        <div class="
                container
                mx-auto
                lg:max-w-screen-xl
                lg:flex
                lg:items-center
                lg:justify-between
                lg:gap-x-6
            "
        >
            <div class="
                    font-semibold
                    text-lg
                    flex items-center
                    py-4
                    gap-x-4
                "
            >
                <button @click="back" v-if="route.name === 'es-applications-item'">
                    <Icon icon="arrow-left" class="w-6 text-blue-500" />
                </button>

                <div v-if="route.name === 'es-applications-list'">
                    Заявки
                </div>

                <div v-if="route.name === 'es-applications-item'">
                    {{ `Заявка №${route.params.applicationId}` }}
                </div>
            </div>

            <div v-if="route.name === 'es-applications-list'"
                class="
                    flex-grow
                    text-sm
                    text-gray-500
                "
            >
                Найдено записей: {{ count }}
            </div>

            <div v-if="route.name === 'es-applications-list' && count > 100">
                <VPagination
                    v-model="page"
                    :pages="totalPages"
                    :range-size="1"
                />
            </div>

            <form class="
                    flex items-center
                    gap-x-2
                "
                @submit="onSubmit"
                v-if="route.name === 'es-applications-list'"
            >
                <input type="text" class="
                        border-gray-300
                        rounded
                        text-sm
                        focus:ring-blue-500
                        focus:border-blue-500
                    "
                    v-model="search"
                    placeholder="Поиск"
                >

                <button class="
                        bg-blue-500
                        p-2
                        rounded
                    "
                    type="submit"
                >
                    <Icon
                        icon="search"
                        class="w-5 text-white"
                    />
                </button>
            </form>
        </div>
    </div>

    <div class="p-6">
        <div class="
                container
                mx-auto
                lg:max-w-screen-xl
            "
        >
            <router-view />
        </div>
    </div>
</div>
</template>
