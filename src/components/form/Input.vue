<script setup>
import { ref, watch, defineEmits } from 'vue'

const props = defineProps(['modelValue', 'type'])

let localValue = ref(props.modelValue)
const emit = defineEmits(['update:modelValue'])

watch(localValue, value => emit('update:modelValue', value))
// watch(props.modelValue, value => localValue = value)

const getType = () => {
    return props.type === undefined ? 'text' : props.type
}
</script>

<template>
<div class="">
    <input :type="getType()" v-model="localValue"
        class="
            rounded-md
            w-full
            shadow-sm
            border-gray-300
            focus:ring-blue-500 focus:border-blue-500
        "
    />
</div>
</template>
