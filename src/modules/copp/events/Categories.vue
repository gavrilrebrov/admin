<script setup>
import { useStore } from 'vuex'
import { onMounted } from 'vue'

const store = useStore()

onMounted(() => store.dispatch('events/getCategories'))
</script>

<template>
<div>
    <router-view />
</div>
</template>
