<script setup>
import { defineProps, defineEmits, ref, watch } from 'vue'
import Icon from './icon.vue'

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

const modelValue = ref(props.modelValue)

const setImage = e => {
  modelValue.value.file = e.target.files[0]

  emit('update:modelValue', modelValue.value)
}

const removeImage = () => {
  modelValue.value.url = null
  modelValue.value.file = 'removed'
  emit('update:modelValue', modelValue.value)
}

watch(() => props.modelValue, value => {
  modelValue.value = value
})
</script>

<template>
<div class="relative" v-if="props.modelValue">
  <label class="h-[118px] bg-slate-100 rounded-md flex items-center justify-center cursor-pointer bg-cover bg-center"
    :style="{
        backgroundImage: `url(${props.modelValue.url})`
    }"
  >
    <input type="file" class="hidden" @change="e => setImage(e)" />

    <div class="font-semibold text-sm text-slate-400" v-if="!props.modelValue.file && !props.modelValue.url">
      Выбрать файл
    </div>

    <div class="font-medium text-sm text-sky-500 text-center" v-if="modelValue && modelValue.file && modelValue.file !== 'removed'">
      Будет загружен файл:<br>
      {{ modelValue.file.name }}
    </div>

    <div class="font-medium text-sm text-sky-500 text center"
      v-if="modelValue && modelValue.file === 'removed'"
    >
      Файл будет удален
    </div>
  </label>

  <button class="absolute w-8 bottom-2 right-2 bg-red-100 flex items-center justify-center h-8 rounded text-red-500" title="Удалить изображение" type="button" @click="removeImage">
    <Icon icon="trash" class="w-4 h-4" />
  </button>
</div>
</template>