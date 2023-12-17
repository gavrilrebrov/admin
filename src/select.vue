<script setup>
import { ref, defineProps, defineEmits, computed, watch } from 'vue'
import Icon from './icon.vue'
import { onClickOutside } from '@vueuse/core'

const props = defineProps(['modelValue', 'options', 'variant'])
const emit = defineEmits(['update:modelValue'])
const dropDownRef = ref(null)

const modelValue = ref(props.modelValue)
const selected = computed(() => props.options && props.options.find(i => i.value === modelValue.value))
const open = ref(false)

const select = id => {
  modelValue.value = id
  open.value = false
}

watch(() => props.modelValue, value => {
  modelValue.value = value
})

watch(modelValue, value => {
  emit('update:modelValue', value)
})

onClickOutside(dropDownRef, e => {
  open.value = false
})
</script>

<template>
<div class="relative w-full">
  <div  class="py-2 px-3 rounded focus:bg-slate-200 focus:outline-none transition text-sm text-slate-800 w-full whitespace-nowrap flex items-center justify-between cursor-pointer"
    @click="open = true"
    :class="{
      'bg-white': props.variant === 'white',
      'bg-slate-100': !props.variant,
    }"
  >
    {{ selected ? selected.label : 'Выберите вариант' }}

    <Icon class="w-4 h-4 shrink-0 ml-2 text-slate-400" icon="chevron-down" />
  </div>

  <div class="absolute bg-white shadow-lg rounded p-1 right-0 z-10"
    ref="dropDownRef"
    :class="{
      'top-8 invisible opacity-0': !open,
      'top-10 visible opacity-100': open
    }"
  >
    <div v-for="option in options" :key="option.value"
      class="py-[6px] px-3 text-sm cursor-pointer hover:text-sky-500 rounded"
      :class="{
        'bg-sky-100 text-sky-500': selected && selected.value === option.value,
        'text-slate-500': !selected || selected.value !== option.value
      }"
      @click="select(option.value)"
    >
      {{ option.label }}
    </div>
  </div>
</div>
</template>