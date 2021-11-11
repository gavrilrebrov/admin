<script setup>
import { defineProps, onMounted, ref, watch, computed, watchEffect } from 'vue'
import { useStore } from 'vuex'
import Field from './form/Field.vue'

const props = defineProps(['fields', 'storePath', 'module', 'model'])
const store = useStore()

const localValues = ref({})

const values = computed(() => store.state[props.module][props.model].values)

onMounted(async () => {
    const _values = Object.keys(values)

    for (let i in _values) {
        let key = _values[i]
        localValues.value[key] = values[key]
    }
})

watch(localValues.value, value => {
    store.commit(`${props.module}/${props.model}/values`, value)
})

watch(values, value => {
    console.log('value: ', value)
})

// watchEffect(() => {
//     localValues.value = values.value
//     console.log('values: ', values)
// })
</script>

<template>
<div class="flex flex-col gap-y-4">
    <div class="flex gap-x-4"
        v-for="row, rowIndex in props.fields"
        :key="rowIndex"
    >
        <div :class="field.cols ? `w-${field.cols}/12` : 'w-full'"
            v-for="field, fieldIndex in row" :key="fieldIndex"
        >
            <Field :type="field.type" :items="field.items" :label="field.label" v-model="localValues[field.slug]" />
        </div>
    </div>
</div>
</template>
