<script setup>
import moment from 'moment-timezone'
import Icon from './Icon.vue'
import { defineEmits, defineProps } from 'vue'

const props = defineProps(['columns', 'data', 'edit', 'show'])

const emit = defineEmits(['onDownload'])

const formatDate = date => {
    return moment(date).format('DD.MM.YYYY')
}

const formatDateTime = date => {
    return moment(date).format('DD.MM.YYYY HH:mm')
}

const onDownload = (e, id) => {
    emit('onDownload', id)
}
</script>

<template>
<div>
    <div class="
        shadow overflow-hidden
        border-b border-gray-200
        sm:rounded-lg
    ">
        <table
            class="min-w-full divide-y divide-gray-200"
        >
            <thead
                class="
                    bg-gray-50
                "
            >
                <tr>
                    <th class="
                            px-6 py-3 text-left text-xs font-medium
                            text-gray-500 uppercase
                            tracking-wider
                        "
                        v-for="column, columnIndex in columns"
                        :key="columnIndex"
                    >
                        {{ column.label }}
                    </th>

                    <th class="
                        px-6 py-3 text-left text-xs font-medium
                            text-gray-500 uppercase
                            tracking-wider
                    "
                        v-if="edit || show"
                    >

                    </th>
                </tr>
            </thead>

            <tbody
                class="
                    bg-white divide-y divide-gray-200
                "
            >
                <tr v-for="item, index in data" :key="index">
                    <td v-for="col, colIndex in columns"
                        :key="colIndex"
                        class="px-6 py-4
                        text-sm"
                    >
                        <span v-if="col.type === 'badge'"
                            class="
                                px-2 inline-flex
                                text-xs leading-5
                                font-semibold rounded-full
                            "
                            :class="{
                                'bg-green-100': item[col.key].badge === 'success',
                                'text-green-800': item[col.key].badge === 'success',
                                'bg-yellow-100': item[col.key].badge === 'warning',
                                'text-yellow-800': item[col.key].badge === 'warning',
                            }"
                        >
                            {{ item[col.key].text }}
                        </span>

                        <div v-if="!col.type">
                            {{ item[col.key] }}
                        </div>

                        <div v-if="col.type === 'description'"
                            class="flex flex-col gap-y-1"
                        >
                            <div class="font-semibold">
                                {{ item[col.key] }}
                            </div>

                            <div class="text-gray-400">
                                {{ item.description }}
                            </div>
                        </div>

                        <div v-if="col.type === 'date'">
                            {{ formatDate(item[col.key]) }}
                        </div>

                        <div v-if="col.type === 'datetime'">
                            {{ formatDateTime(item[col.key]) }}
                        </div>

                        <div v-if="col.type === 'contacts'"
                            class="
                                flex flex-col
                                gap-y-1
                            "
                        >
                            <div class="inline-flex gap-x-2 items-center">
                                <Icon icon="phone" class="w-4 text-blue-500" />
                                <a :href="`tel:+7${item[col.key].phone}`">+7{{ item[col.key].phone }}</a>
                            </div>

                            <div class="inline-flex gap-x-2 items-center">
                                <Icon icon="at-symbol" class="w-4 text-blue-500" />
                                <a :href="`mailto:${item[col.key].email}`">{{ item[col.key].email }}</a>
                            </div>

                            <div class="inline-flex gap-x-2 items-center">
                                <Icon icon="location-marker" class="w-4 text-blue-500" />
                                <span>{{ item[col.key].address }}</span>
                            </div>
                        </div>

                        <div v-if="col.type === 'download'">
                            <button title="Скачать" @click="e => onDownload(e, item.id)">
                                <Icon icon="download" class="w-6 text-blue-500" />
                            </button>
                        </div>
                    </td>

                    <td class="px-6 py-4 text-right"
                        v-if="edit"
                    >
                        <router-link :to="`/${edit}/${item.id}`"
                            class="
                                inline-block
                                rounded-lg
                            "
                        >
                            <Icon icon="pencil"
                                class="text-blue-500 w-6"
                            />
                        </router-link>
                    </td>

                    <td class="px-6 py-4 text-right"
                        v-if="show"
                    >
                        <router-link :to="`/${show}/${item.id}`"
                            class="
                                inline-block
                                rounded-lg
                            "
                        >
                            <Icon icon="eye"
                                class="text-blue-500 w-6"
                            />
                        </router-link>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</div>
</template>
