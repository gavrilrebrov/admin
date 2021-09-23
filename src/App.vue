<script setup>
import { useStore } from 'vuex'
import { onMounted, computed } from 'vue'
import Login from './layouts/Login.vue'
import Sidebar from './layouts/Sidebar.vue'
import Copp from './layouts/Copp.vue'

const store = useStore()
const user = computed(() => store.state.user)

onMounted(() => {
    store.dispatch('init')
})

const isCopp = computed(() => {
    return (
        user.value && user.value.role &&
        (
            user.value.role.name === 'employment-support' ||
            user.value.role.name === 'teams' ||
            user.value.role.name === 'events'
        )
    )
})
</script>

<template>
<div>
    <Login v-if="!user" />

    <Sidebar v-if="user && user.role.name === 'site'" />

    <Copp v-if="isCopp" />
</div>
</template>
