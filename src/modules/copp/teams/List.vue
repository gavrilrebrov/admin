<script setup>
import { useStore } from 'vuex'
import { computed } from 'vue'
import Icon from '../../../components/Icon.vue'
import Card from '../../../components/Card.vue'
import moment from 'moment/min/moment-with-locales'

const store = useStore()

const isLoading = computed(() => store.state.teams.isLoading)
const teams = computed(() => {
    let list = store.state.teams.list

    let output = []

    for (let i in list) {
        let parts = list[i].participants.map(i => {
            let role

            if (i.role === 'manager') role = 1
            if (i.role === 'producer') role = 2
            if (i.role === 'designer') role = 3
            if (i.role === 'developer') role = 4

            return {
                role,
                name: i.name,
                phone: i.phone,
                email: i.email,
                jobPlace: i.jobPlace,
                jobPosition: i.jobPosition,
                identifier: i.identifier,
            }
        })

        parts = parts.sort(function (a, b) {
            if (a.role > b.role) {
                return 1; }
            if (a.role < b.role) {
                return -1; }
            return 0;
        })

        output.push({
            name: list[i].name,
            participants: parts,
            identifier: list[i].identifier,
            created_at: list[i].created_at,
        })
    }

    return output
})

const getRoleName = (roleName) => {
    if (roleName === 1) {
        return 'Менеджер (Team-lead)'
    } else if (roleName === 3) {
        return 'Дизайнер'
    } else if (roleName === 4) {
        return 'Разработчик'
    } else if (roleName === 2) {
        return 'Методист/Продюсер'
    }
}

moment.locale('ru')
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

    <div class="flex flex-col gap-y-5">
        <Card
            v-for="team in teams"
            :key="team.id"
        >
            <template #header>
                <div class="flex items-center justify-between w-full">
                    <div class="
                            flex-shrink-0
                            pr-5
                            font-semibold
                            text-2xl
                            text-gray-300
                        "
                    >
                        #<span class="text-blue-500">{{ team.identifier }}</span>
                    </div>
                    <div class="flex-grow">
                        <div class="text-gray-500
                                font-medium
                                text-sm
                            "
                        >Название курса:</div>
                        <div
                            class="
                                font-semibold
                            "
                        >{{ team.name }}</div>
                    </div>

                    <div class="text-right">
                        <span class="text-sm
                                text-gray-500
                                font-medium
                            "
                        >Дата регистрации:</span>
                        <div>{{ moment(team.created_at).format('LLL') }}</div>
                    </div>
                </div>
            </template>


            <div class="
                    grid grid-cols-4
                    gap-x-5
                "
            >
                <div
                    v-for="participant in team.participants"
                    :key="participant.id"
                    class="
                        flex flex-col
                        gap-y-3
                    "
                >
                    <div class="inline-flex gap-x-2">
                        <div class="font-semibold text-xs
                                rounded bg-gray-200
                                py-1 px-2
                                text-gray-500
                            "
                        >
                            #{{ participant.identifier }}
                        </div>
                        <div class="
                                text-xs
                                font-semibold
                                text-white
                                inline-block
                                py-1 px-2
                                rounded
                            "
                            :class="{
                                'text-red-500 bg-red-200': participant.role === 1,
                                'text-yellow-500 bg-yellow-200': participant.role === 3,
                                'text-indigo-500 bg-indigo-200': participant.role === 4,
                                'text-green-500 bg-green-200': participant.role === 2,
                            }"
                        >
                            {{ getRoleName(participant.role) }}
                        </div>
                    </div>

                    <div class="font-semibold">
                        {{ participant.name }}
                    </div>

                    <div class="flex items-center gap-x-2">
                        <Icon icon="phone" class="w-4 h-4 text-blue-500" />
                        <a :href="`tel:+7${participant.phone}`">{{ participant.phone }}</a>
                    </div>

                    <div class="flex items-center gap-x-2">
                        <Icon icon="at-symbol" class="w-4 h-4 text-blue-500" />
                        <a :href="`mailto:${participant.email}`">{{ participant.email }}</a>
                    </div>

                    <div>
                        <div class="text-sm text-gray-400">
                            Место работы:
                        </div>
                        {{ participant.jobPlace }}
                    </div>

                    <div>
                        <div class="text-sm text-gray-400">
                            Должность:
                        </div>
                        {{ participant.jobPosition }}
                    </div>
                </div>
            </div>
        </Card>
    </div>
</div>
</template>
