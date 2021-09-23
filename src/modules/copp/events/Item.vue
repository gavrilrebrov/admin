<script setup>
import { useRoute } from 'vue-router'
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'

const route = useRoute()
const store = useStore()

onMounted(() => store.dispatch('events/getItem', route.params.eventId))
</script>

<template>
<div>
    <router-view />
</div>
</template>
