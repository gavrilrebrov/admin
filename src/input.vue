<script setup>
import { defineProps, defineEmits, watch, ref } from 'vue'

const props = defineProps(['modelValue', 'type', 'placeholder'])
const emit = defineEmits(['update:modelValue'])

const modelValue = ref(props.modelValue)

watch(modelValue, value => emit('update:modelValue', value))

watch(() => props.modelValue, value => {
  modelValue.value = value
})
</script>

<template>
<div>
  <input class="bg-slate-100 py-2 px-3 rounded focus:bg-slate-200 focus:outline-none transition text-sm text-slate-800 w-full"
    type="text"
    v-if="!props.type"
    :placeholder="placeholder"
    v-model="modelValue"
  />

  <input class="bg-slate-100 py-2 px-3 rounded focus:bg-slate-200 focus:outline-none transition text-sm text-slate-800 w-full"
    type="password"
    v-if="props.type === 'password'"
    :placeholder="placeholder"
    v-model="modelValue"
  />
</div>
</template>