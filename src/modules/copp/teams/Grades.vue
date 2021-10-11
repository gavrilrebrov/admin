<script setup>
import { useStore } from 'vuex'
import { computed, onMounted } from 'vue'

const store = useStore()
const list = computed(() => {
    return strore.state.teams.list
})

onMounted(() => {
    store.dispatch('teams/getExperts')
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

const teams = computed(() => {
    return store.state.teams.list
})

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

    console.log('team: ', team)

    for (let e in experts.value) {
        let expert = experts[e]

        console.log('expert: ', expert)
    }

    return val
}
</script>


<template>
<div class="
        bg-white
        shadow
        rounded-lg
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
                >#</th>
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
                            {{ team.participants[0].jobPlace }}
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
                    <div class="
                            text-sm
                            font-medium
                        "
                    >
                        {{ calcAverage(team) }}
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
</div>
</template>
