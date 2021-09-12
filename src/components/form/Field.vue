<script setup>
import { defineProps, ref, watch, defineEmits } from 'vue'
import Input from './Input.vue'
import Editor from './Editor.vue'
import Select from './Select.vue'

const props = defineProps(['modelValue', 'label', 'type', 'items'])

let localValue = ref(props.modelValue)

const emit = defineEmits(['update:modelValue'])

watch(localValue, value => {
    emit('update:modelValue', value)
})
</script>

<template>
 <div class="">
     <div class="text-sm font-medium text-gray-500 mb-2">
         {{ props.label }}
     </div>

     <Input v-if="type !== 'editor' && type !== 'select'" :type="props.type" v-model="localValue" />

     <Editor v-if="type === 'editor'" v-model="localValue" />

     <Select v-if="type === 'select'" :items="items" v-model="localValue" />
 </div>
</template>
