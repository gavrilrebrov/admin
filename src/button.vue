<script setup>
import { defineEmits, defineProps } from 'vue'

const emit = defineEmits(['click'])
const props = defineProps(['size', 'secondary', 'submit', 'form'])

const onClick = () => {
  emit('click')
}
</script>

<template>
<button @click="onClick" class="cursor-pointer   text-center font-medium rounded shadow-sm  transition"
  :class="{
    'px-2 py-[4px] text-xs': props.size === 'sm',
    'px-3 py-2 text-sm': !props.size,
    'bg-sky-100 text-sky-500 hover:bg-sky-200 hover:text-sky-600': props.secondary,
    'bg-sky-500 text-white hover:bg-sky-600': !props.secondary
  }"
  :type="props.submit ? 'submit' : 'button'"
  :form="props.form"
>
  <slot />
</button>
</template>