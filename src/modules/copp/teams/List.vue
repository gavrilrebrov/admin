<script setup>
import { useStore } from 'vuex'
import { computed } from 'vue'
import Icon from '../../../components/Icon.vue'
import Card from '../../../components/Card.vue'

const store = useStore()

const isLoading = computed(() => store.state.teams.isLoading)
const teams = computed(() => store.state.teams.list)

const getRoleName = (roleName) => {
    if (roleName === 'manager') {
        return 'Менеджер (Team-lead)'
    } else if (roleName === 'designer') {
        return 'Дизайнер'
    } else if (roleName === 'developer') {
        return 'Разработчик'
    } else if (roleName === 'producer') {
        return 'Методист/Продюсер'
    }
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

    <div class="flex flex-col gap-y-5">
        <Card
            v-for="team in teams"
            :key="team.id"
        >
            <template #header>
                <div class="flex items-center gap-x-2 text-lg">
                    <div class="text-gray-400 font-medium">Название курса:</div>
                    <div
                        class="
                            font-semibold
                        "
                    >{{ team.name }}</div>
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
                    <div class="font-semibold">
                        {{ participant.name }}
                    </div>

                    <div>
                        <div class="
                                text-xs
                                font-semibold
                                text-white
                                inline-block
                                py-1 px-2
                                rounded
                            "
                            :class="{
                                'text-red-500 bg-red-200': participant.role === 'manager',
                                'text-yellow-500 bg-yellow-200': participant.role === 'designer',
                                'text-indigo-500 bg-indigo-200': participant.role === 'developer',
                                'text-green-500 bg-green-200': participant.role === 'producer',
                            }"
                        >
                            {{ getRoleName(participant.role) }}
                        </div>
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
