<script setup>
import Icon from '../components/Icon.vue'
import pkg from '../../package.json'

import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const store = useStore()
const user = computed(() => store.state.user)

onMounted(async () => {
    if (route.name === 'home') {
        router.push('/events')
    }
})

const logout = () => store.dispatch('logout')
</script>

<template>
<div class="bg-gray-100 min-h-screen">
    <div class="bg-gray-800 px-5 print:hidden">
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
                    Мероприятия
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
