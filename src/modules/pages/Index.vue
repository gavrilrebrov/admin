<script setup>
import Button from '../../components/Button.vue'
import Icon from '../../components/Icon.vue'
import { useRoute, useRouter } from 'vue-router'
import { onMounted } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const router = useRouter()

onMounted(() => {
    store.dispatch('pages/getList')
})

const route = useRoute()

const goToCreate = () => {
    router.push('/pages/create')
}
</script>

<template>
<div>
    <div class="bg-white text-gray-700 h-16 flex items-center shadow justify-between">
        <div class="inline-block px-5 font-semibold">
            Страницы
        </div>

        <div class="inline-flex pag-x-4 px-5">
            <button
                v-if="route.name === 'pages'"
                @click="goToCreate"
                class="
                    text-sm
                    font-semibold
                    bg-blue-100
                    py-2 px-4
                    text-blue-500
                    rounded-md
                    inline-flex
                    items-center
                    gap-x-2
                    hover:bg-blue-200
                    duration-200
                "
            >
                <Icon icon="plus" class="w-5 h-5" />

                <span>Создать</span>
            </button>
        </div>
    </div>

    <router-view />
</div>
</template>
