<script setup>
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { computed } from 'vue'
import Notice from '../../../components/Notice.vue'
import Icon from '../../../components/Icon.vue'

const route = useRoute()
const store = useStore()

const count = computed(() => store.state.teams.count)
const user = computed(() => store.state.user)
const notice = computed(() => store.state.notice)
const isLoading = computed(() => store.state.teams.isLoading)

const print = () => {
    if (window.print) window.print()
}
</script>

<template>
<div>
    <div class="bg-white px-6 shadow sticky top-0 z-30 print:hidden">
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

                <div v-if="route.name === 'teams-grades'">
                    Оценки
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

            <div v-if="route.name === 'teams-grades'">
                <button class="
                        bg-green-500
                        text-sm
                        py-2 px-3
                        text-white
                        rounded
                    "
                    @click="print"
                >
                    Распечатать протокол
                </button>
            </div>

            <div v-if="user.role.name === 'teams'"
                class="
                    inline-flex
                    gap-x-2
                "
            >
                <router-link
                    :to="`/teams`"
                    class="
                        py-2
                        px-3
                        text-sm
                        rounded
                        font-semibold
                        text-gray-500
                    "
                    :class="{
                        'text-blue-500 bg-blue-100': route.name === 'teams-list'
                    }"
                >
                    Участники
                </router-link>

                <router-link
                    :to="`/teams/grades`"
                    class="
                        py-2
                        px-3
                        text-sm
                        rounded
                        font-semibold
                        text-gray-500
                    "
                    :class="{
                        'text-blue-500 bg-blue-100': route.name === 'teams-grades'
                    }"
                >
                    Баллы
                </router-link>
            </div>

            <div v-if="user.role.name === 'proo-expert' && !isLoading"
                class="
                    inline-flex items-center gap-x-5
                "
            >
                <a href="/grading.xlsx" class="
                        bg-green-500
                        inline-flex
                        cursor-pointer
                        gap-x-2
                        text-white
                        px-3 py-2
                        rounded
                        text-sm
                        shadow
                        font-medium
                        hover:shadow-lg
                        duration-200
                    "
                    download
                >
                    <Icon icon="excel" class="w-5" />
                    <div>Скачать оценочный лист</div>
                </a>

                <label class="
                        text-sm
                        font-semibold
                        bg-blue-500
                        py-2 px-4
                        text-white
                        rounded-md
                        inline-flex
                        items-center
                        gap-x-2
                        hover:bg-blue-600
                        duration-200
                        cursor-pointer
                        shadow
                        hover:shadow-lg
                    "
                    for="saveGrades"
                >
                    Сохранить
                </label>
            </div>
        </div>
    </div>

    <div v-if="notice" class="
        container mx-auto
        max-w-screen-xl
        mt-5
    ">
        <Notice :notice="notice" />
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
