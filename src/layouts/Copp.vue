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
    if (user.value.role.name === 'employment-support') {
        if (route.name !== 'es-applications-item') {
            await store.dispatch('es/getTutors')
            await store.dispatch('es/getList')
            router.push('/es')
        }
    } else if (user.value.role.name === 'teams') {
        if (route.name !== 'teams-item') {
            await store.dispatch('teams/getList')
            router.push('/teams')
        }
    }
})

const logout = () => store.dispatch('logout')

const title = computed(() => {
    if (user.value.role.name === 'employment-support') {
        return 'Содействие занятости'
    } else if (user.value.role.name === 'teams') {
        return 'PROопережение'
    }
})
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
            <div>
                <div class="
                    font-semibold
                        py-4
                    "
                >
                    {{ title }}
                </div>
            </div>

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
</template>
