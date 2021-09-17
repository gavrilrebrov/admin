<script setup>
import Icon from '../../../components/Icon.vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { ref } from 'vue'

const route = useRoute()
const router = useRouter()
const store = useStore()

let search = ref('')

const back = async () => {
    await store.dispatch('es/getList')
    router.push('/es')
}

const onSubmit = (e) => {
    e.preventDefault()

    store.dispatch('es/getList', {
        search: search.value
    })
}
</script>

<template>
<div>
    <div class="bg-white px-6 shadow sticky top-0">
        <div class="
                container
                mx-auto
                lg:max-w-screen-xl
                lg:flex
                lg:items-center
                lg:justify-between
            "
        >
            <div class="
                    font-semibold
                    text-lg
                    flex items-center
                    py-4
                    gap-x-4
                "
            >
                <button @click="back" v-if="route.name === 'es-applications-item'">
                    <Icon icon="arrow-left" class="w-6 text-blue-500" />
                </button>

                <div v-if="route.name === 'es-applications-list'">
                    Заявки
                </div>

                <div v-if="route.name === 'es-applications-item'">
                    {{ `Заявка №${route.params.applicationId}` }}
                </div>
            </div>

            <form class="
                    flex items-center
                    gap-x-2
                "
                @submit="onSubmit"
                v-if="route.name === 'es-applications-list'"
            >
                <input type="text" class="
                        border-gray-300
                        rounded
                        text-sm
                        focus:ring-blue-500
                        focus:border-blue-500
                    "
                    v-model="search"
                    placeholder="Поиск"
                >

                <button class="
                        bg-blue-500
                        p-2
                        rounded
                    "
                    type="submit"
                >
                    <Icon
                        icon="search"
                        class="w-5 text-white"
                    />
                </button>
            </form>
        </div>
    </div>

    <div class="p-6">
        <div class="
                container
                mx-auto
                lg:max-w-screen-xl
            "
        >
            <router-view />
        </div>
    </div>
</div>
</template>
