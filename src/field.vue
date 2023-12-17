<script setup>
import { defineProps } from 'vue'

const props = defineProps(['label'])
</script>

<template>
<div class="space-y-1">
  <div class="text-sm text-slate-400">
    {{ props.label }}
  </div>

  <slot />
</div>
</template>