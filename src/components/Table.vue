<script setup>
import moment from 'moment-timezone'
import Icon from './Icon.vue'
import { defineEmits, defineProps, watch } from 'vue'
import Input from './form/Input.vue'

const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:1337'

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
                v-if="columns"
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
                    <td v-if="!columns" class="px-6 py-3 text-sm">
                        {{ item.name }}
                    </td>

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

                        <div v-if="col.type === 'avatar'"
                            class="w-16 h-16 rounded-full bg-cover bg-center"
                            :style="{backgroundImage:`url(${apiUrl}${item[col.key]['url']})`}"
                        >

                        </div>

                        <div v-if="col.type === 'contacts'"
                            class="
                                flex flex-col
                                gap-y-1
                            "
                        >
                            <div class="inline-flex gap-x-2 items-center"
                                v-if="item[col.key].phone"
                            >
                                <Icon icon="phone" class="w-4 text-blue-500" />
                                <a :href="`tel:+7${item[col.key].phone}`">+7{{ item[col.key].phone }}</a>
                            </div>

                            <div class="inline-flex gap-x-2 items-center"
                                v-if="item[col.key].email"
                            >
                                <Icon icon="at-symbol" class="w-4 text-blue-500" />
                                <a :href="`mailto:${item[col.key].email}`">{{ item[col.key].email }}</a>
                            </div>

                            <div class="inline-flex gap-x-2 items-center"
                                v-if="item[col.key].address"
                            >
                                <Icon icon="location-marker" class="w-4 text-blue-500" />
                                <span>{{ item[col.key].address }}</span>
                            </div>
                        </div>

                        <div v-if="col.type === 'download'">
                            <button title="Скачать" @click="e => onDownload(e, item.id)">
                                <Icon icon="download" class="w-6 text-blue-500" />
                            </button>
                        </div>

                        <div v-if="col.type === 'file'">
                            <a :href="`https://api.copp14.ru${item[col.key].url}`"
                                download
                                v-if="item[col.key]"
                                class="bg-blue-200 inline-block
                                    py-1 px-2
                                    text-xs
                                    font-medium
                                    text-blue-500
                                    rounded
                                "
                            >{{ item[col.key].name }}</a>

                            <span v-if="!item[col.key]">-</span>
                        </div>

                        <div v-if="col.type === 'input-number'">
                            <Input v-model="item[col.key]" type="number" />
                        </div>

                        <div v-if="col.type === 'link'">
                            <a :href="item[col.key]" target="_blank"
                                class="text-blue-500"
                                v-if="!item[col.key].text"
                            >{{ item[col.key] }}</a>
                        </div>
                    </td>

                    <td class="px-6 text-right flex items-center justify-end"
                        v-if="edit"
                        :class="{
                            'py-4': columns,
                            'py-3': !columns
                        }"
                    >
                        <router-link :to="`/${edit}/${item.id}`"
                            class="
                                inline-block
                                rounded-lg
                            "
                        >
                            <Icon icon="pencil"
                                class="text-blue-500"
                                :class="{
                                    'w-6': columns,
                                    'w-5': !columns
                                }"
                            />
                        </router-link>
                    </td>

                    <td class="px-6 text-right flex items-center justify-end"
                        v-if="show"
                        :class="{
                            'py-4': columns,
                            'py-3': !columns
                        }"
                    >
                        <router-link :to="`/${show}/${item.id}`"
                            class="
                                inline-block
                                rounded-lg
                            "
                        >
                            <Icon icon="eye"
                                class="text-blue-500"
                                :class="{
                                    'w-6': columns,
                                    'w-5': !columns
                                }"
                            />
                        </router-link>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</div>
</template>
