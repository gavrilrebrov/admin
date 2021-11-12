<script setup>
import { ref, watch, defineEmits } from 'vue'

const props = defineProps(['modelValue'])

let modelValue = ref(props.modelValue)
const emit = defineEmits(['update:modelValue'])

watch(modelValue, value => emit('update:modelValue', value))

watch(() => props.modelValue, value => {
    modelValue.value = value
})
</script>

<template>
<div>
    <div class="w-14 bg-gray-200 flex items-center rounded-full cursor-pointer duration-200"
        @click="modelValue = !modelValue"
        style="padding:2px"
        :class="{
            'bg-blue-500': modelValue
        }"
    >
        <div class="h-6 w-6 bg-white rounded-full duration-200 shadow flex items-center justify-center"
            :class="{
                'ml-7': modelValue
            }"
        ></div>
    </div>
</div>
</template>
