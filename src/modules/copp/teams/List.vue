<script setup>
import { useStore } from 'vuex'
import { computed } from 'vue'

import Icon from '@/components/Icon.vue'
import Card from '@/components/Card.vue'

const store = useStore()

const isLoading = computed(() => store.state.teams.isLoading)
const user = computed(() => store.state.user)

const teams = computed(() => store.state.teams.list)

const downloadDocuments = id => {
    store.dispatch('teams/downloadDocuments', id)
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
