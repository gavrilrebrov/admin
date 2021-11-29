<script setup>
import { useRoute, useRouter } from 'vue-router'

import Icon from '@/components/Icon.vue'

const route = useRoute()
const router = useRouter()

const create = () => {
    router.push('/people/create')
}
</script>

<template>
<div>
    <div class="bg-white text-gray-700 h-16 flex items-center shadow justify-between sticky top-0">
        <div class="inline-block px-5 font-semibold">
            Команда
        </div>

        <div class="inline-flex gap-x-4 px-5">
            <button class="button"
                v-if="route.name === 'people-list'"
                @click="create"
            >
                <Icon icon="plus" class="w-5 h-5" />
                <div>
                    Создать
                </div>
            </button>
        </div>
    </div>

    <router-view />
</div>
</template>
