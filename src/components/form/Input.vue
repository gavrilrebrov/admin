<script setup>
import { ref, watch, defineEmits } from 'vue'

const props = defineProps(['modelValue', 'type'])

let modelValue = ref(props.modelValue)
const emit = defineEmits(['update:modelValue'])

watch(modelValue, value => emit('update:modelValue', value))
// watch(props.modelValue, value => localValue = value)

const getType = () => {
    return props.type === undefined ? 'text' : props.type
}

watch(() => props.modelValue, value => {
    modelValue.value = value
})
</script>

<template>
<div class="">
    <input :type="getType()" v-model="modelValue"
        class="
            rounded-md
            w-full
            shadow-sm
            border-gray-300
            focus:ring-blue-500 focus:border-blue-500
            text-sm
        "
    />
</div>
</template>

<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    /* display: none; <- Crashes Chrome on hover */
    -webkit-appearance: none;
    margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
}
</style>
