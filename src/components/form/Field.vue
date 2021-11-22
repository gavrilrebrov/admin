<script setup>
import { defineProps, ref, watch, defineEmits } from 'vue'
import Input from './Input.vue'
import Editor from './Editor.vue'
import Select from './Select.vue'
import Datepicker from './Datepicker.vue'
import ImageUploader from './ImageUploader.vue'
import Toggle from './Toggle.vue'

const props = defineProps(['modelValue', 'label', 'type', 'items', 'size'])

let modelValue = ref(props.modelValue)

const emit = defineEmits(['update:modelValue', 'remove'])

watch(modelValue, value => {
    console.log('value: ', value)
    emit('update:modelValue', value)
})

watch(() => props.modelValue, value => {
    modelValue.value = value
})
</script>

<template>
<div>
    <div class="text-sm font-medium text-gray-500 mb-2">
        {{ props.label }}
    </div>

    <Input :size="size" v-if="type !== 'editor' && type !== 'select' && type !== 'daterange' && type !== 'date' && type !== 'datetime' && type !== 'toggle' && type !== 'image'" :type="props.type" v-model="modelValue" />

    <Editor :size="size" v-if="type === 'editor'" v-model="modelValue" />

    <Select :size="size" v-if="type === 'select'" :items="items" v-model="modelValue" />

    <Datepicker :size="size" v-if="type === 'daterange' || type === 'datetime' || type === 'date'" :type="type" v-model="modelValue" />

    <Toggle v-if="type === 'toggle'" v-model="modelValue" />

    <ImageUploader :size="size" v-if="type === 'image'" v-model="modelValue" />
</div>
</template>
