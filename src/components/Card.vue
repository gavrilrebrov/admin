<script setup>
import Icon from './Icon.vue'
import { useSlots } from 'vue'

const slots = useSlots()
</script>

<template>
<div class="bg-white rounded-lg shadow">
    <div class="py-4 px-5 sm:px-6 border-b flex items-center justify-between" v-if="slots.header">
        <slot name="header" />
    </div>

    <div class="p-5">
        <slot />
    </div>

    <div class="p-5 bg-gray-200 flex items-center" v-if="slots.footer">
        <slot name="footer" />
    </div>
</div>
</template>
