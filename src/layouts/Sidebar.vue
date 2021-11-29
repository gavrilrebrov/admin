<script setup>
import Icon from '../components/Icon.vue'
import pkg from '../../package.json'

import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const user = computed(() => store.state.user)

const logout = () => store.dispatch('logout')
</script>

<template>
<div class="w-screen h-screen
    flex
">
    <div class="bg-gray-800 w-60 flex flex-col justify-between flex-shrink-0">
        <div class="bg-gray-700 py-3 px-5 flex items-center gap-x-3">
            <div class="text-gray-800 w-10 p-2 bg-gray-500 rounded-full flex-shrink-0">
                <Icon icon="user" />
            </div>

            <div class="flex-grow-1 w-full text-sm " v-if="user">
                <div class="font-medium text-gray-100">
                    {{ user.username }}
                </div>

                <div class="text-gray-400 text-xs">
                    {{ user.role.name }}
                </div>
            </div>

            <button class="w-6 text-blue-500 flex-shrink-0" title="Выход"
                @click="logout"
            >
                <Icon icon="logout" />
            </button>
        </div>

        <div class="flex flex-col p-2 flex-grow-1 h-full gap-y-1">
            <router-link to="/"
                class="
                    flex items-center
                    p-2
                    gap-x-4
                    hover:bg-gray-900
                    cursor-pointer
                    rounded-md
                    duration-200
                "
            >
                <Icon icon="home"
                    class="w-6 text-gray-500"
                />

                <div class="font-medium text-gray-300 text-sm">
                    Консоль
                </div>
            </router-link>

            <router-link to="/pages"
                class="
                    flex items-center
                    p-2
                    gap-x-4
                    hover:bg-gray-900
                    cursor-pointer
                    rounded-md
                    duration-200
                "
            >
                <Icon icon="collection"
                    class="w-6 text-gray-500"
                />

                <div class="font-medium text-gray-300 text-sm">
                    Страницы
                </div>
            </router-link>

            <router-link to="/posts"
                class="
                    flex items-center
                    p-2
                    gap-x-4
                    hover:bg-gray-900
                    cursor-pointer
                    rounded-md
                    duration-200
                "
            >
                <Icon icon="newspaper"
                    class="w-6 text-gray-500"
                />

                <div class="font-medium text-gray-300 text-sm">
                    Новости
                </div>
            </router-link>

            <router-link to="/applications"
                class="
                    flex items-center
                    p-2
                    gap-x-4
                    hover:bg-gray-900
                    cursor-pointer
                    rounded-md
                    duration-200
                "
            >
                <Icon icon="clipboard-check"
                    class="w-6 text-gray-500"
                />

                <div class="font-medium text-gray-300 text-sm">
                    Заявки
                </div>
            </router-link>

            <router-link to="/people"
                class="
                    flex items-center
                    p-2
                    gap-x-4
                    hover:bg-gray-900
                    cursor-pointer
                    rounded-md
                    duration-200
                "
            >
                <Icon icon="users"
                    class="w-6 text-gray-500"
                />

                <div class="font-medium text-gray-300 text-sm">
                    Команда
                </div>
            </router-link>
        </div>

        <div class="p-5 bg-gray-800 text-sm font-semibold text-gray-500">
            v{{ pkg.version }}
        </div>
    </div>

    <div class="w-full max-h-full bg-gray-100 overflow-y-auto">
        <router-view />
    </div>
</div>
</template>
