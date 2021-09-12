<script setup>
import { defineProps, computed } from 'vue'
import { useStore } from 'vuex'
import Icon from './Icon.vue'

const store = useStore()
const notice = computed(() => store.state.notice)
</script>

<template>
<div v-if="notice" class="flex items-center py-3 px-4 rounded-md
    gap-x-3
"
    :class="{
        'bg-red-100': notice.type === 'error',
        'text-red-500': notice.type === 'error',
        }"
>
    <Icon icon="exclamation-circle" v-if="notice.type === 'error'"
        class="w-6"
    />

    <div class="text-sm font-medium">
        {{ notice.text }}
    </div>
</div>
</template>
