<script setup>
import { useStore } from 'vuex'
import { computed } from 'vue'

import Icon from '@/components/Icon.vue'
import Card from '@/components/Card.vue'
import Table from '@/components/Table.vue'
import Input from '@/components/form/Input.vue'

const store = useStore()

const isLoading = computed(() => store.state.teams.isLoading)
const user = computed(() => store.state.user)

const teams = computed(() => {
    let list = store.state.teams.list

    let output = []

    for (let i in list) {
        let item = list[i]

        let grade = item.grades.find(g => g.expert === user.value.id)

        output.push({
            id: item.id,
            name: item.name,
            participants: item.participants,
            homework1: item.homework1,
            homework2: item.homework2,
            homework3: item.homework3,
            homework4: item.homework4,
            video: item.courseName,
            grade1: grade ? grade.grade1 : 0,
            grade2: grade ? grade.grade2 : 0,
            grade3: grade ? grade.grade3 : 0,
            grade4: grade ? grade.grade4 : 0,
            courseName: item.courseName
        })
    }

    return output
})

const downloadDocuments = id => {
    store.dispatch('teams/downloadDocuments', id)
}

const save = () => {
    store.dispatch('teams/saveGrades', teams.value)
}
</script>

<template>
<div>
    <div v-if="isLoading"
        class="
            w-full h-full
            flex items-center justify-center
        "
    >
        <Icon icon="loader" class="w-16 h-16 text-blue-500 animate-spin" />
    </div>

    <div v-if="user.role.name === 'proo-expert' && !isLoading">
        <button id="saveGrades" @click="save" class="hidden"></button>
        <table class="bg-white shadow rounded-lg">
            <thead class="text-gray-500">
                <tr>
                    <th rowspan="2"
                        class="text-sm font-medium py-2 px-4 border"
                    >
                        Команда
                    </th>

                    <th colspan="3"
                        class="text-sm font-medium py-2 px-4 border"
                    >
                        Работы
                    </th>

                    <th colspan="5"
                        class="text-sm font-medium py-2 px-4 border"
                    >
                        Баллы
                    </th>
                </tr>

                <tr>
                    <th class="text-sm font-medium py-2 px-4 border">
                        День 1
                    </th>

                    <th class="text-sm font-medium py-2 px-4 border">
                        День 2
                    </th>

                    <th class="text-sm font-medium py-2 px-4 border">
                        День 3
                    </th>

                    <th class="text-sm font-medium py-2 px-4 border">
                        Перспективность предложенного курса
                    </th>

                    <th class="text-sm font-medium py-2 px-4 border">
                        Качество реализации курса (чем более завершенным, технологичным, логичным и эстетически привлекательным выглядит курс, тем выше оценка)
                    </th>

                    <th class="text-sm font-medium py-2 px-4 border">
                        Работа на Хакатоне (объем работы, выполненный командой за время проведения Хакатона, тем выше оценка)
                    </th>

                    <th class="text-sm font-medium py-2 px-4 border">
                        Презентация курса (чем лучше команда презентует курс, тем выше оценка)
                    </th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="team, teamIndex in teams" :key="teamIndex">
                    <td class="py-2 px-4 font-semibold text-sm border">
                        {{ team.name }}
                    </td>

                    <td class="py-2 px-4 font-semibold text-sm border">
                        <a :href="`https://api.copp14.ru${team.homework1.url}`" v-if="team.homework1" download
                            class="bg-blue-100 text-blue-500 py-1 px-2 flex rounded text-xs"
                        >
                            {{ team.homework1.name }}
                        </a>
                    </td>

                    <td class="py-2 px-4 font-semibold text-sm border">
                        <a :href="`https://api.copp14.ru${team.homework2.url}`"  v-if="team.homework2" download
                            class="bg-blue-100 text-blue-500 py-1 px-2 flex rounded text-xs"
                        >
                            {{ team.homework2.name }}
                        </a>

                        <a :href="team.courseName" v-if="team.courseName" target="_blank"
                            class="bg-blue-100 text-blue-500 py-1 px-2 flex rounded text-xs mt-3"
                        >
                            Видеоролик
                        </a>
                    </td>

                    <td class="py-2 px-4 font-semibold text-sm border">
                        <a :href="`https://api.copp14.ru${team.homework3.url}`"  v-if="team.homework3" download
                            class="bg-blue-100 text-blue-500 py-1 px-2 flex rounded text-xs"
                        >
                            {{ team.homework3.name }}
                        </a>

                        <a :href="`https://api.copp14.ru${team.homework4.url}`"  v-if="team.homework4" download
                            class="bg-blue-100 text-blue-500 py-1 px-2 flex rounded text-xs mt-3"
                        >
                            {{ team.homework4.name }}
                        </a>
                    </td>

                    <td class="py-2 px-4 font-semibold text-sm border">
                        <Input type="number" v-model="team.grade1" />
                    </td>

                    <td class="py-2 px-4 font-semibold text-sm border">
                        <Input type="number" v-model="team.grade2" />
                    </td>

                    <td class="py-2 px-4 font-semibold text-sm border">
                        <Input type="number" v-model="team.grade3" />
                    </td>

                    <td class="py-2 px-4 font-semibold text-sm border">
                        <Input type="number" v-model="team.grade4" />
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

    <div class="flex flex-col gap-y-5" v-if="user.role.name === 'teams'">
        <Card v-for="team in teams" :key="team.id">
            <template #header>
                <div class="font-semibold -my-1">
                    {{ team.name }}
                </div>
            </template>

            <div class="flex flex-col divide-y divide-gray-200 -m-5">
                <div v-for="participant in team.participants" :key="participant.id"
                    class="px-5 py-2"
                >
                    <div class="flex gap-x-5">
                        <div class="font-medium text-sm flex-shrink-0 w-4/12">
                            {{ participant.name }}
                        </div>

                        <div class="flex-shrink-0 w-4/12 text-sm">
                            {{ participant.email }}
                        </div>

                        <div class="flex-shrink-0 w-4/12">
                            <button class="text-xs uppercase font-semibold bg-blue-100 py-1 px-2 rounded text-blue-500 flex items-center gap-x-1"
                                v-if="participant.document"
                                @click="downloadDocuments(participant.id)"
                            >
                                <Icon icon="download" class="w-5" />
                                Документы
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    </div>
</div>
</template>
