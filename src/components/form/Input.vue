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
