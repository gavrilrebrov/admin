<script setup>
import Icon from '../Icon.vue'
import { defineProps, defineEmits, ref, watch, computed } from 'vue'
import { Listbox, ListboxButton, ListboxLabel, ListboxOption, ListboxOptions } from '@headlessui/vue'

const props = defineProps(['items', 'modelValue', 'size'])
const emit = defineEmits(['update:modelValue'])

let modelValue = ref(props.modelValue)
let active = ref(false)

let selected = computed(() => {
    return props.items.find(i => i.value === modelValue.value)
})

const onSelect = (e, item) => {
    modelValue.value = item.value
    active.value = false
}

const onFocusOut = () => {
    active.value = false
}

watch(modelValue, value => emit('update:modelValue', value))

watch(() => props.modelValue, value => {
    modelValue.value = value
})
</script>

<template>
<Listbox as="div" v-model="modelValue">
    <div class="relative">
        <ListboxButton
            class="
                relative w-full bg-white
                border border-gray-300
                rounded-md shadow-sm
                pl-3 pr-10 py-2
                text-left cursor-default
                focus:outline-none
                focus:ring-1
                focus:ring-blue-500
                focus:border-blue-500
                sm:text-sm
            "
        >
            <span class="flex items-center">
                <span class="block truncate">{{ selected.label }}</span>
            </span>

            <span class="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none text-gray-400">
                <Icon icon="selector" class="w-5" />
            </span>
        </ListboxButton>

        <transition
            leave-active-class="transition ease-in duration-200"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
        >
            <ListboxOptions
                class="
                    absolute z-10 mt-1 w-full
                    bg-white shadow-lg max-h-56
                    rounded-md text-base
                    ring-1 ring-black
                    ring-opacity-5 overflow-auto
                    focus:outline-none
                    sm:text-sm
                    p-2
                "
            >
                <ListboxOption as="template"
                    v-for="item in items"
                    :key="item.value"
                    :value="item.value"
                    v-slot="{ active, selected }"
                >
                    <li :class="[active ? 'text-blue-500 bg-blue-100' : 'text-gray-900', 'cursor-pointer select-none relative py-2 pl-3 pr-9 duration-200 rounded']"
                        :title="item.label"
                    >
                        <div class="flex items-center">
                            <span :class="[selected ? 'font-semibold' : 'font-normal', 'block truncate']">
                                {{ item.label }}
                            </span>
                        </div>

                        <span class="text-blue-600 absolute inset-y-0 right-0 flex items-center"
                            :class="{
                                'pr-2': props.size === 'sm',
                                'pr-4': props.size === undefined
                            }"
                            v-if="selected"
                        >
                            <Icon icon="check" class="w-5" />
                        </span>
                    </li>
                </ListboxOption>
            </ListboxOptions>
        </transition>
    </div>
</Listbox>
</template>
