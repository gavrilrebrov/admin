<script setup>
import Icon from '../components/Icon.vue'
import pkg from '../../package.json'

import { computed, watch, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'

const store = useStore()
const router = useRouter()
const route = useRoute()
const user = computed(() => store.state.user)

onMounted(async () => {
    if (user.value.role.layout === 'employment-support') {
        if (route.name !== 'es-applications-item') {
            await store.dispatch('es/getTutors')
            await store.dispatch('es/getList')
            router.push('/es')
        }
    }
})

const logout = () => store.dispatch('logout')
</script>

<template>
<div class="bg-gray-100 min-h-screen">
    <div class="bg-gray-800 px-5">
        <div class="
                container
                mx-auto
                lg:max-w-screen-xl
                lg:flex
                lg:items-center
                lg:justify-between
                text-white
            "
        >
            <!-- <div>
                <div class="
                    font-semibold
                        py-4
                    "
                    v-if="project"
                >
                    {{ project.name }}
                </div>
            </div> -->

            <div class="flex items-center py-4">
                <Icon icon="user"
                    class="w-6 mr-3"
                />
                <div>{{ user.username }}</div>

                <button title="Выйти" @click="logout">
                    <Icon
                        icon="logout"
                        class="w-6 text-blue-500 ml-5"
                    />
                </button>
            </div>
        </div>
    </div>

    <router-view />
</div>
<!-- <div class="
    w-screen
    h-screen
    flex
">
    <div
        class="
            bg-gray-800
            w-60
            flex flex-col
            justify-between
            flex-shrink-0
        "
    >
        <div class="
                bg-gray-700
                py-3 px-5
                flex items-center
                gap-x-3
            "
        >
            <div class="
                    text-gray-800
                    w-10
                    p-2
                    bg-gray-500
                    rounded-full
                    flex-shrink-0
                "
            >
                <Icon icon="user" />
            </div>

            <div class="
                    flex-grow-1 w-full text-sm
                "
                v-if="user"
            >
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

        <div class="
                flex flex-col p-2 flex-grow-1 h-full gap-y-1
            "
        >
            <router-link to="/employment-support"
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
                <Icon icon="clipboard-list"
                    class="w-6 text-gray-500"
                />

                <div class="
                        font-medium text-gray-300 text-sm
                    "
                >
                    Содействие занятости
                </div>
            </router-link>
        </div>

        <div class="p-5 bg-gray-800 text-sm font-semibold text-gray-500">
            v{{ pkg.version }}
        </div>
    </div>

    <div class="w-full h-full bg-gray-100">
        <router-view />
    </div>
</div> -->
</template>
