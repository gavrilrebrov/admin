<script setup>
import Card from '@/components/Card.vue'
import Icon from '@/components/Icon.vue'
import Notice from '@/components/Notice.vue'
import Field from '@/components/form/Field.vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import { ref, computed, watch, onMounted } from 'vue'

const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:1337'

const store = useStore()
const route = useRoute()
const router = useRouter()

const loading = computed(() => store.state.events.loading)
const event = computed(() => store.state.events.item)

const fields = ref({
    name: '',
    description: '',
    active: false,
    registration: false,
    youtubeId: '',
    hero: {
        file: null,
        preview: null,
    },

})

const files = ref({
    hero: {
        file: null,
        preview: null,
        id: null
    }
})

watch(event, value => {
    if (value) {
        fields.value.name = value.name
        fields.value.description = value.description
        fields.value.active = value.active
        fields.value.registration = value.registration
        fields.value.youtubeId = value.youtubeId

        if (value.hero) {
            files.value.hero.preview = `${apiUrl}${value.hero.formats.medium.url}`
            files.value.hero.id = value.hero.id
        }
    }
})

onMounted(() => {
    store.commit('notice', null)
    if (route.params.eventId) {
        store.dispatch('events/getItem', route.params.eventId)
    }
})

const save = () => {
    store.dispatch('events/save', {
        id: route.params.eventId,
        fields: fields.value,
        files: files.value
    })
}
</script>

<template>
<div>
    <div v-if="loading.get" class="w-full h-full flex items-center justify-center">
        <Icon icon="loader" class="w-16 h-16 text-blue-500 animate-spin" />
    </div>

    <Notice class="mb-4" />

    <Card v-if="!loading.get">
        <template #header>
            <div class="font-medium text-gray-900 text-lg flex-grow">
                Общяя информация о мероприятии
            </div>

            <div>
                <button class="
                        text-sm
                        font-semibold
                        bg-blue-500
                        text-white
                        py-2 px-3
                        rounded-md
                        inline-flex
                        items-center
                        gap-x-1
                    "
                    @click="save"
                    :disabled="loading && loading.save"
                >
                    <Icon icon="check" class="h-5 w-5" v-if="!loading.save" />
                    <Icon icon="loader" class="h-5 w-5 animate-spin" v-if="loading.save" />
                    <span>Сохранить</span>
                </button>
            </div>
        </template>

        <div class="flex flex-col gap-y-4">
            <div class="flex gap-x-4">
                <div class="w-2/12 flex flex-col gap-y-4">
                    <div>
                        <Field label="Изображение" type="image" v-model="files.hero" />
                    </div>

                    <div>
                        <Field label="ID видео в YouTube" v-model="fields.youtubeId" />
                    </div>
                </div>

                <div class="w-10/12 flex flex-col gap-y-4">
                    <div class="flex gap-x-4">
                        <div class="w-8/12">
                            <Field label="Название" v-model="fields.name" />
                        </div>

                        <div class="w-1/12">
                            <Field label="Активное" v-model="fields.active" type="toggle" />
                        </div>

                        <div class="w-1/12">
                            <Field label="Регистрация" v-model="fields.registration" type="toggle" />
                        </div>
                    </div>

                    <div>
                        <Field class="w-full" type="editor" label="Описание" v-model="fields.description" />
                    </div>
                </div>
            </div>
        </div>
    </Card>
</div>
</template>
