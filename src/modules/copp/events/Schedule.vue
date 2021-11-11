<script setup>
import { useStore } from 'vuex'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'

const store = useStore()
const route = useRoute()

onMounted(() => store.dispatch('events/schedules/getList', route.params.eventId))
</script>

<template>
<div>
    <router-view />
</div>
</template>
