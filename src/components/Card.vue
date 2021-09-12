<script setup>
import Icon from './Icon.vue'
import { useSlots } from 'vue'

const slots = useSlots()
</script>

<template>
<div class="bg-white rounded-md shadow">
    <div class="p-5 border-b flex items-center" v-if="slots.header">
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
