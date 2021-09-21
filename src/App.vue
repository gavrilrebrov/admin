<script setup>
import { useStore } from 'vuex'
import { onMounted, computed } from 'vue'
import Login from './layouts/Login.vue'
import Sidebar from './layouts/Sidebar.vue'
import Copp from './layouts/Copp.vue'

const store = useStore()
const user = computed(() => store.state.user)

const projectType = computed(() => store.state.project && store.state.project.type)

onMounted(() => {
    store.dispatch('init')
})
</script>

<template>
<div>
    <Login v-if="!user" />

    <Sidebar v-if="projectType && projectType === 'site'" />

    <Copp v-if="user && user.role && user.role.name === 'employment-support'" />
</div>
</template>
