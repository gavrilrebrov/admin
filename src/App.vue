<script setup>
import { useStore } from 'vuex'
import { onMounted, computed } from 'vue'
import Login from './layouts/Login.vue'
import Sidebar from './layouts/Sidebar.vue'

const store = useStore()
const isLogged = computed(() => store.state.user)

const projectType = computed(() => store.state.project && store.state.project.type)

onMounted(() => {
    store.dispatch('init')
})
</script>

<template>
<div>
    <Login v-if="!isLogged" />

    <Sidebar v-if="projectType === 'site'" />
</div>
</template>
