<script setup>
import Icon from '../Icon.vue'
import { defineProps, defineEmits, ref, computed, watch, watchEffect  } from 'vue'
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'
import { Calendar, DatePicker } from 'v-calendar'
import moment from 'moment'

const props = defineProps(['modelValue', 'size'])
const emit = defineEmits(['update:modelValue'])

let modelValue = ref(props.modelValue)

let label = computed(() => {
    if (modelValue.value === null) {
        return 'Весь период'
    } else {
        return `${moment(modelValue.value.start).format('DD.MM.YYYY')} - ${moment(modelValue.value.end).format('DD.MM.YYYY')}`
    }
})

const accept = (close) => {
    emit('update:modelValue', modelValue.value)
    close()
}

const reset = (close) => {
    modelValue.value = null
    emit('update:modelValue', null)
    close()
}

watch(() => props.modelValue, value => {
    modelValue.value = value
})
</script>

<template>
<Popover class="relative" v-slot="{ open }">
    <PopoverButton
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
            <span class="block truncate">{{ label }}</span>
        </span>

        <span class="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none text-gray-400">
            <Icon icon="calendar" class="w-5" />
        </span>
    </PopoverButton>

    <transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="translate-y-1 opacity-0"
        enter-to-class="translate-y-0 opacity-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="translate-y-0 opacity-100"
        leave-to-class="translate-y-1 opacity-0"
    >
        <PopoverPanel
            v-slot="{ close }"
            class="
                absolute z-10 mt-1
                bg-white shadow-lg
                rounded-md text-base
                ring-1 ring-black
                ring-opacity-5 overflow-auto
                focus:outline-none
                sm:text-sm
            "
        >
            <DatePicker is-range :columns="2" v-model="modelValue" />

            <div class="p-4 border-t flex items-center gap-x-2">
                <button
                    class="bg-blue-500
                        text-white
                        font-semibold
                        py-2 px-3
                        rounded
                    "
                    @click="accept(close)"
                >Применить</button>
                <button
                    class="
                        py-2 px-3
                        font-semibold
                        text-blue-500
                    "
                    @click="reset(close)"
                >Сбросить</button>
            </div>
        </PopoverPanel>
    </transition>
</Popover>
</template>
