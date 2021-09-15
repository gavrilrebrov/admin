<script setup>
import { onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'

const route = useRoute()
const store = useStore()

const item = computed(() => store.state.es.item)

onMounted(() => {
    store.dispatch('es/getItem', route.params.applicationId)
})
</script>

<template>
<div v-if="item">
    {{ item.name }}
</div>
</template>
