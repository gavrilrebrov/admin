<script setup>
import { useStore } from 'vuex'
import { computed, onMounted, reactive, watch, watchEffect, ref } from 'vue'
import Icon from '../../../components/Icon.vue'
import Input from '../../../components/form/Input.vue'

const store = useStore()
const list = computed(() => {
    return store.state.teams.list
})

// let teams = ref([])

onMounted(() => {
    store.dispatch('teams/getExperts')
    initTeams()
})

const experts = computed(() => {
    return store.state.teams.experts.filter(i => {
        return i.username !== 'expert-0' && i.username !== 'expert-3'
    })
})

const getExpertName = (expertName) => {
    let fio = expertName.split(' ')

    return `${fio[0]} ${fio[1][0]}. ${fio[2][0]}.`
}

const teams = ref([])

// watch(list, value => {
//     let _teams = value
//     let output = []

//     for (let t in _teams) {
//         let _team = _teams[t]

//         output.push({
//             average: calcAverage(_team),
//             name: _team.name,
//             courseName: _team.courseName,
//             organization: _team.participants[0].jobPlace,
//             identifier: _team.identifier,
//             grades: _team.grades,
//             id: _team.id,
//             additionals: 0
//         })
//     }

//     output.sort((a, b) => {
//         if (a.average < b.average) return 1
//         if (a.average > b.average) return -1
//         return 0
//     })

//     console.log('output: ', output)

//     teams.value = output.map(i => i)

//     // teams.value = output

//     console.log('teams: ', teams.value)
// })

// const teams = computed(() => {




//     return output
// })

const getGradeValue = (team, expert) => {
    let grade = team.grades.find(i => {
        return i.expert === expert.id
    })

    if (grade) {
        return grade.value
    } else {
        return 0
    }
}

const calcAverage = (team) => {
    let val = 0
    let sum = 0

    for (let g in team.grades) {
        let grade = team.grades[g]

        sum = sum + grade.value
    }

    if (sum > 0) val = sum / team.grades.length

    if (team.additionals) {
        val = val + team.additionals
    }

    return val
}

const initTeams = () => {
    let _teams = store.state.teams.list
    let output = []

    for (let t in _teams) {
        let _team = _teams[t]

        output.push({
            average: calcAverage(_team),
            name: _team.name,
            courseName: _team.courseName,
            organization: _team.participants[0].jobPlace,
            identifier: _team.identifier,
            grades: _team.grades,
            id: _team.id,
            additionals: 0
        })
    }

    output.sort((a, b) => {
        if (a.average < b.average) return 1
        if (a.average > b.average) return -1
        return 0
    })

    teams.value = output
}

const setAdditional = (team) => {
    teams.value.sort((a, b) => {
        if ((a.average + a.additionals) < (b.average + b.additionals)) return 1
        if ((a.average + a.additionals) > (b.average + b.additionals)) return -1
        return 0
    })
}
</script>


<template>
<div>
    <div class="screen:hidden">
        <div class="text-center py-5 text-sm">
            Автономная некоммерческая организация дополнительного профессионального образования
        </div>

        <div class="flex gap-x-8 justify-between text-sm">
            <img src="/copp-logo.png" alt="copp-logo" class="w-56 flex-shrink-0">

            <div class="flex flex-col gap-y-1">
                <div class="flex items-center gap-x-2">
                    <Icon icon="location-marker" class="w-6" />

                    <div>ул. Крупской, 13, г. Якутск, 677000</div>
                </div>

                <div class="flex items-center gap-x-2">
                    <Icon icon="phone" class="w-6" />

                    <div>8 (800) 222-41-40</div>
                </div>

                <div class="flex items-center gap-x-2">
                    <Icon icon="at-symbol" class="w-6" />

                    <div>
                        copp14@mail.ru
                    </div>
                </div>

                <div>ИНН 1435347747 ОГРН 1191447015605</div>
            </div>
        </div>

        <div class="
                font-semibold
                mt-10
                text-center
                text-lg
            "
        >Итоговый протокол экспертной комиссии по оцениванию проектных работ участников II регионального этапа проекта «PROопережение»</div>

        <table class="text-xs mt-5">
            <thead>
                <tr>
                    <th class="border p-2">
                        <div>№</div>
                    </th>
                    <th class="border">
                        <div>
                            Название команды
                        </div>
                    </th>
                    <th class="border p-2">
                        <div>
                            Наименование организации
                        </div>
                    </th>
                    <th class="border p-2">
                        <div>
                            Название курса
                        </div>
                    </th>
                    <th class="border p-2">
                        <div>
                            Итоговый рейтинг (балл)
                        </div>
                    </th>
                    <th class="border p-2">
                        <div>
                            Место
                        </div>
                    </th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="team, teamIndex in teams" :key="team.id">
                    <td class="border p-2">
                        <div>
                            {{ team.identifier }}
                        </div>
                    </td>

                    <td class="border p-2">
                        <div>
                            {{ team.name }}
                        </div>
                    </td>

                    <td class="border p-2">
                        <div>
                            {{ team.organization }}
                        </div>
                    </td>

                    <td class="border p-2">
                        <div>
                            {{ team.courseName }}
                        </div>
                    </td>

                    <td class="border p-2 text-center">
                        <div>
                            {{ calcAverage(team).toLocaleString('ru', { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}
                        </div>
                    </td>

                    <td class="border p-2 text-center">
                        <div>
                            {{ teamIndex + 1 }}
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>

        <div class="flex flex-col gap-y-5 mt-10 text-sm">
            <div class="flex justify-between">
                <div class="w-72">
                    Председатель
                </div>

                <div>
                    <div class="text-xs mt-6">
                        (личная подпись)
                    </div>
                </div>

                <div class="w-56 text-right">
                    М.Ю.Присяжный
                </div>
            </div>

            <div class="flex justify-between">
                <div class="w-72">
                    Заместитель председателя
                </div>

                <div>
                    <div class="text-xs mt-6">
                        (личная подпись)
                    </div>
                </div>

                <div class="w-56 text-right">
                    В.Г.Хабаров
                </div>
            </div>

            <div class="flex justify-between">
                <div class="w-72">
                    Член комиссии
                </div>

                <div>
                    <div class="text-xs mt-6">
                        (личная подпись)
                    </div>
                </div>

                <div class="w-56 text-right">
                    Г.А. Антонова-Тен
                </div>
            </div>

            <div class="flex justify-between">
                <div class="w-72">
                    Член комиссии
                </div>

                <div>
                    <div class="text-xs mt-6">
                        (личная подпись)
                    </div>
                </div>

                <div class="w-56 text-right">
                    Л.М. Иванова
                </div>
            </div>

            <div class="flex justify-between">
                <div class="w-72">
                    Член комиссии
                </div>

                <div>
                    <div class="text-xs mt-6">
                        (личная подпись)
                    </div>
                </div>

                <div class="w-56 text-right">
                    А.М. Соловьев
                </div>
            </div>

            <div class="flex justify-between">
                <div class="w-72">
                    Член комиссии
                </div>

                <div>
                    <div class="text-xs mt-6">
                        (личная подпись)
                    </div>
                </div>

                <div class="w-56 text-right">
                    Н.В. Федотова
                </div>
            </div>

            <div class="flex justify-between">
                <div class="w-72">
                    Ответственный секретарь
                </div>

                <div>
                    <div class="text-xs mt-6">
                        (личная подпись)
                    </div>
                </div>

                <div class="w-56 text-right">
                    С.В. Гермогенова
                </div>
            </div>
        </div>
    </div>

    <div class="
            bg-white
            shadow
            rounded-lg
            print:hidden
        "
    >
        <table>
            <thead>
                <tr>
                    <th rowspan="2" class="
                            p-4
                            border
                            text-sm
                        "
                    >№</th>
                    <th rowspan="2" class="
                            p-4
                            border
                            text-sm
                        "
                    >Команда</th>
                    <th colspan="9" class="
                            p-4
                            border
                            text-sm
                        "
                    >Баллы</th>
                </tr>

                <tr>
                    <th v-for="expert in experts" :key="expert.id"
                        class="border"
                    >
                        <div class="
                                text-xs
                                font-medium
                                text-gray-400
                                p-4
                            "
                        >
                            {{ getExpertName(expert.name) }}
                        </div>
                    </th>

                    <th class="border">
                        <div class="
                                text-xs
                                font-medium
                                text-gray-400
                                p-4
                            "
                        >
                            Дополнительные баллы
                        </div>
                    </th>

                    <th class="border">
                        <div class="
                                text-xs
                                font-medium
                                text-gray-400
                                p-4
                            "
                        >
                            Итого
                        </div>
                    </th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="team in teams" :key="team.id">
                    <td class="px-4 py-2 border">
                        <div class="
                                text-sm
                                text-gray-400
                                font-medium
                            "
                        >
                            {{ team.identifier }}
                        </div>
                    </td>

                    <td class="px-4 py-3 border">
                        <div class="
                                text-sm
                                font-semibold
                            "
                        >
                            <div>
                                {{ team.name }}
                            </div>

                            <div class="
                                font-normal
                                text-gray-400
                            ">
                                {{ team.organization }}
                            </div>
                        </div>
                    </td>

                    <td v-for="expert in experts" :key="expert.id"
                        class="
                            px-4 py-3 border
                        "
                    >
                        <div class="
                                text-sm
                                font-medium
                            "
                            :class="{
                                'text-gray-300': getGradeValue(team, expert) === 0
                            }"
                        >
                            {{ getGradeValue(team, expert) }}
                        </div>
                    </td>

                    <td class="px-4 py-3 border">
                        <!-- <div v-if="isAdditionals(team.id)"
                            class="text-center text-sm mb-3 font-semibold"
                        >
                            {{ isAdditionals(team.id).value.toLocaleString('ru', { style: 'decimal' }) }}
                        </div>

                        <div class="inline-flex text-sm font-semibold rounded overflow-hidden">
                            <div class="
                                bg-red-100
                                text-red-500
                                py-2 px-3
                                cursor-pointer
                            "
                                @click="dropAdditional(team.id)"
                            >-0,01</div>
                            <div class="
                                bg-green-100
                                text-green-500
                                py-2 px-3
                                cursor-pointer
                            "
                                @click="addAdditional(team.id)"
                            >+0,01</div>
                        </div> -->
                        <Input v-model="team.additionals" type="number" class="w-16" @focusout="setAdditional(team)" />
                    </td>

                    <td class="px-4 py-3 border">
                        <div class="
                                text-sm
                                font-medium
                            "
                        >
                            {{ calcAverage(team).toLocaleString('ru', { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</div>
</template>
