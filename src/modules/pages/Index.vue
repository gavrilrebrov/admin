<script setup>
import Button from '../../components/Button.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
<div>
    <div class="bg-white text-gray-700 h-16 flex items-center shadow justify-between">
        <div class="inline-block px-5 font-semibold text-lg">
            Страницы
        </div>

        <div class="inline-flex pag-x-4 px-5">
            <Button label="Сохранить" icon="save" v-if="route.name === 'pages-edit'" />

            <Button label="Создать" icon="plus" v-if="route.name === 'pages'" />
        </div>
    </div>

    <router-view />
</div>
</template>
