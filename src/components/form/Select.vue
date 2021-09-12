<script setup>
import Icon from '../Icon.vue'
import { defineProps, defineEmits, ref, watch, computed } from 'vue'

const props = defineProps(['items', 'modelValue'])
const emit = defineEmits(['update:modelValue'])

let modelValue = ref(props.modelValue)
let active = ref(false)

let selected = computed(() => {
    return props.items.find(i => i.value === modelValue.value)
})

const onSelect = item => {
    modelValue.value = item.value
    active.value = false
}

watch(modelValue, value => emit('update:modelValue', value))
</script>

<template>
<div class="relative">
    <button class="
            relative
            w-full
            bg-white
            border
            border-gray-300
            rounded-md
            shadow-sm
            pl-3 pr-10 py-2 text-left
            cursor-default
            focus:outline-none
            focus:ring-1
            focus:ring-blue-500
            focus:border-blue-500
        "
        aria-haspopup="listbox"
        aria-expanded="true"
        aria-labelledby="listbox-label"
        @focus="active = true"
    >
        <span class="flex items-center" v-if="selected">
            <span class="block truncate">{{ selected.label }}</span>
        </span>

        <span
            class="
                ml-3 absolute
                inset-y-0 right-0
                flex items-center
                pr-2 pointer-events-none
                text-gray-400
            "
        >
            <Icon icon="selector" class="w-5" />
        </span>
    </button>

    <ul
        class="
            absolute z-10 mt-1 w-full
            bg-white shadow-lg max-h-56
            rounded-md p-2 text-base ring-1
            ring-black ring-opacity-5
            overflow-auto
            focus:outline-none
        "
        tabindex="-1"
        role="listbox"
        aria-labelledby="listbox-label"
        aria-activedescendant="listbox-option-3"
        v-if="active"
    >
        <li class="
                text-gray-900 cursor-pointer
                select-none relative
                py-2 pl-3 pr-9
                hover:bg-blue-100
                hover:text-blue-600
                duration-200
                rounded-md
            "
            id="listbox-option-0"
            role="option"
            v-for="item in props.items"
            :key="item.value"
            @click="onSelect(item)"
        >
            <div class="flex items-center">
                <span class="font-normal ml-1 block truncate">
                    {{ item.label }}
                </span>
            </div>

            <span class="text-blue-600 absolute inset-y-0 right-0 flex items-center pr-4"
                v-if="item.value === selected.value"
            >
                <Icon icon="check" class="w-5" />
            </span>
        </li>
    </ul>
</div>
</template>
