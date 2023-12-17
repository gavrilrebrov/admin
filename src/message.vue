<script setup>
import { watch } from 'vue'
import { useAppStore } from '@/stores/app'
import { promiseTimeout } from '@vueuse/core'
import Icon from './icon.vue'

const appStore = useAppStore()

watch(() => appStore.message, async value => {
  if (value) {
    await promiseTimeout(3000)

    appStore.$patch({
      message: null
    })
  }
})
</script>

<template>
<div class="absolute flex justify-center w-screen text-sm transition-all z-50"
  :class="{
    'opacity-100 top-8 ': appStore.message,
    'opacity-0 top-3': !appStore.message
  }"
>
  <div class="bg-white py-2 px-3 rounded shadow flex items-center gap-x-2" v-if="appStore && appStore.message">
    <Icon v-if="appStore.message.type === 'error'" icon="exclamation-circle" class="w-5 h-5 text-red-500"  />
    <Icon v-if="appStore.message.type === 'success'" icon="check-circle" class="w-5 h-5 text-green-500"  />
    {{ appStore.message.text }}
  </div>
</div>
</template>