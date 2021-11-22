<script setup>
import { ref, defineEmits, defineProps, watch } from 'vue'
import http from '@/store/http'
import Icon from '@/components/Icon.vue'

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

const modelValue = ref(props.modelValue)

watch(() => props.modelValue, value => {
    modelValue.value = value
})

const setImage = e => {
    modelValue.value.file = e.target.files[0]
    emit('update:modelValue', modelValue.value)
}

let loading = ref(false)

const removeImage = async () => {
    loading.value = true
    await http.delete(`/upload/files/${modelValue.value.id}`)

    modelValue.value.preview = null
    modelValue.value.id = null
    emit('update:modelValue', modelValue.value)

    loading.value = false
}
</script>

<template>
<div>
    <label class="w-full h-36 border border-gray-300 rounded-md flex items-center justify-center cursor-pointer bg-cover bg-center"
        :style="{
            backgroundImage: `url(${modelValue.preview})`
        }"
    >
        <input type="file" class="hidden" @change="e => setImage(e)">

        <div class="font-medium text-sm text-blue-500" v-if="!modelValue.file && !modelValue.preview">
            Выбрать файл
        </div>

        <div class="font-medium text-sm text-blue-500 text-center" v-if="modelValue && modelValue.file">
            Будет загружен файл:<br>
            {{ modelValue.file.name }}
        </div>
    </label>

    <div v-if="modelValue.id && !loading" class="text-sm text-red-500 font-semibold mt-1 text-center cursor-pointer" @click="removeImage">
        Удалить изображение
    </div>

    <div v-if="loading" class="mt-1 flex justify-center items-center">
        <Icon icon="loader" class="animate-spin w-6 h-6 text-blue-500" />
    </div>
</div>
</template>
