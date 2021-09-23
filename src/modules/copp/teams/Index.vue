<script setup>
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { computed } from 'vue'

const route = useRoute()
const store = useStore()

const count = computed(() => store.state.teams.count)
</script>

<template>
<div>
    <div class="bg-white px-6 shadow sticky top-0 z-30">
        <div class="
                container
                mx-auto
                max-w-screen-xl
                flex items-center
                justify-between
                gap-x-6
            "
        >
            <div class="
                    font-semibold
                    text-lg
                    flex items-center
                    py-4 gap-x-4
                "
            >
                <div v-if="route.name === 'teams-list'">
                    Команды
                </div>
            </div>

            <div v-if="route.name === 'teams-list'"
                class="
                    flex-grow
                    text-sm
                    text-gray-500
                "
            >
                Найдено записей: {{ count }}
            </div>
        </div>
    </div>

    <div class="p-6">
        <div class="
                container
                mx-auto
                max-w-screen-xl
            "
        >
            <router-view />
        </div>
    </div>
</div>
</template>

<style>

</style>
