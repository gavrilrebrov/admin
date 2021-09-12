<script setup>
import { defineProps, defineEmits } from 'vue'
import Icon from './Icon.vue'

const props = defineProps(['label', 'icon', 'iconRight'])

const emit = defineEmits(['click'])

const click = () => {
    emit('click')
}
</script>

<template>
<button class="inline-flex items-center
    justify-center py-2 px-4
    border border-transparent
    shadow-sm font-medium
    rounded-md text-white
    bg-blue-500
    gap-x-3
    hover:bg-blue-700
    focus:outline-none
    duration-200
"
    @click="click"
>
    <Icon :icon="icon" v-if="iconRight === undefined"
        class="w-5 h-5"
    />

    {{ props.label }}

    <Icon :icon="icon" v-if="iconRight !== undefined"
        class="w-5 h-5"
    />
</button>
</template>
