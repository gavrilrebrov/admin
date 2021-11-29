<script setup>
import Card from '@/components/Card.vue'
import Icon from '@/components/Icon.vue'
import Field from '@/components/form/Field.vue'
import Loader from '@/components/Loader.vue'

const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:1337'

import { useRoute, useRouter } from 'vue-router'
import { computed, ref, watch, onMounted } from 'vue'
import { useStore } from 'vuex'

const route = useRoute()
const router = useRouter()
const store = useStore()

const loading = computed(() => store.state.people.loading)
const item = computed(() => store.state.people.item)

const title = computed(() => route.name === 'people-edit' ? 'Редактировать персону' : 'Новая персона')

const save = () => {
    store.dispatch('people/save', {
        id: route.params.personId,
        fields: fields.value,
        files: files.value,
    })
}

const files = ref({
    photo: {
        file: null,
        preview: null,
        id: null,
    }
})

const fields = ref({
    name: '',
    description: '',
})

watch(item, value => {
    if (value) {
        fields.value.name = value.name
        fields.value.description = value.description

        if (value.photo) {
            files.value.photo.preview = `${apiUrl}${value.photo.url}`
            files.value.photo.id = value.photo.id
        }
    }
})

onMounted(() => {
    if (route.params.personId) {
        store.dispatch('people/item.get', route.params.personId)
    }
})

const remove = () => {
    store.dispatch('people/remove', route.params.personId)
}
</script>

<template>
<div class="p-5 w-full">
    <Loader v-if="loading.get" />

    <div class="container mx-auto lg:max-w-screen-lg" v-if="!loading.get">
        <Card>
            <template #header>
                <router-link class="mr-5" to="/people">
                    <Icon icon="arrow-left" class="w-5 text-blue-500" />
                </router-link>

                <div class="font-semibold text-gray-900 flex-grow">
                    {{ title }}
                </div>

                <div>
                    <button class="button"
                        @click="save"
                    >
                        <Icon icon="save" class="w-5" v-if="!loading.save" />
                        <Icon icon="loader" class="w-5 animate-spin" v-if="loading.save" />
                        <div>Сохранить</div>
                    </button>
                </div>
            </template>

            <div class="flex gap-x-5">
                <div class="w-3/12">
                    <Field label="Фото" type="image" v-model="files.photo" />
                </div>

                <div class="w-9/12 flex flex-col gap-y-5">
                    <div>
                        <Field label="Имя" v-model="fields.name" />
                    </div>

                    <div>
                        <Field label="Описание" type="text" v-model="fields.description" />
                    </div>

                    <div v-if="route.name === 'people-edit'">
                        <button class="button button_red" @click="remove" :disabled="loading.remove">
                            <Icon icon="x" class="w-5" v-if="!loading.remove" />
                            <Icon icon="loader" class="w-5 animate-spin" v-if="loading.remove" />
                            <div>
                                Удалить
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </Card>
    </div>
</div>
</template>
