<script setup>
import Card from '@/components/Card.vue'
import Icon from '@/components/Icon.vue'
import Notice from '@/components/Notice.vue'
import Field from '@/components/form/Field.vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import { ref, computed, watch, onMounted } from 'vue'

const store = useStore()
const route = useRoute()
const router = useRouter()

const loading = store.state.events.loading
const event = computed(() => store.state.events.item)

const fields = ref({
    name: '',
    slug: '',
    description: '',
    active: false,
    logo: null,

})
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
                >
                    <Icon icon="check" class="h-5 w-5" v-if="!isLoading" />
                    <Icon icon="loader" class="h-5 w-5 animate-spin" v-if="isLoading" />
                    <span>Сохранить</span>
                </button>
            </div>
        </template>

        <div class="flex flex-col gap-y-4">
            <div class="flex gap-x-4">
                <div class="w-8/12">
                    <Field label="Название" v-model="fields.name" />
                </div>

                <div class="w-4/12">
                    <Field label="UID" v-model="fields.slug" />
                </div>
            </div>
        </div>
    </Card>
</div>
</template>
