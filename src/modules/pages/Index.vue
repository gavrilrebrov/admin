<script setup>
import Button from '../../components/Button.vue'
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
        <div class="inline-block px-5 font-semibold text-lg">
            Страницы
        </div>

        <div class="inline-flex pag-x-4 px-5">
            <Button @click="goToCreate" label="Создать" icon="plus" v-if="route.name === 'pages'" />
        </div>
    </div>

    <router-view />
</div>
</template>
