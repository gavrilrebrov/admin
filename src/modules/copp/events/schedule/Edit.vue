<script setup>
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import { computed, ref, onMounted, watch } from 'vue'

import Card from '@/components/Card.vue'
import Icon from '@/components/Icon.vue'
import Field from '@/components/form/Field.vue'
import Notice from '@/components/Notice.vue'

const store = useStore()
const route = useRoute()
const router = useRouter()

const loading = store.state.events.schedules.loading
const categoriesLoading = store.state.events.categories.loading

const categories = computed(() => {
    const cats = store.state.events.categories.list && store.state.events.categories.list.map(i => ({
        value: i.id,
        label: i.name
    }))

    cats.unshift({
        value: null,
        label: 'Не выбрана'
    })

    return cats
})

const item = computed(() => store.state.events.schedules.item)

const back = () => {
    router.push(`/events/${route.params.eventId}/schedule`)
}

const title = computed(() => {
    if (route.name === 'events-schedule-create') {
        return 'Создать событие'
    } else if (route.name === 'events-schedule-edit') {
        return 'Редактирование события'
    }
})

const fields = ref({
    title: '',
    description: '',
    startDate: null,
    endDate: null,
    category: null,
    organizer: '',
    event: +route.params.eventId,
    registration: false,
})

const confs = ref([])

const save = () => {
    store.dispatch('events/schedules/save', {
        id: +route.params.scheduleId,
        fields: fields.value,
        confs: confs.value
    })
}

const confTypes = [
    { label: 'ZOOM', value: 'zoom' },
]

onMounted(async () => {
    store.commit('notice', null)
    store.dispatch('events/categories/getList')
    store.dispatch('events/schedules/getItem', +route.params.scheduleId)
})

watch(item, value => {
    if (value) {
        fields.value.title = value.title
        fields.value.description = value.description
        fields.value.startDate = value.startDate
        fields.value.endDate = value.endDate
        fields.value.category = value.category ? value.category.id : null
        fields.value.organizer = value.organizer
        fields.value.registration = value.registration

        if (value.conferences.length > 0) {
            confs.value = value.conferences
        }
    }
})

const remove = () => {
    store.dispatch('events/schedules/remove', {
        id: +route.params.scheduleId,
        eventId: +route.params.eventId
    })
}

const addConf = () => {
    confs.value.push({
        link: '',
        type: 'zoom',
        code: '',
        identifier: '',
    })
}

const dropConf = (index) => {
    confs.value.splice(index, 1)
}
</script>

<template>
<div>
    <div v-if="loading.get" class="w-full h-full flex items-center justify-center">
        <Icon icon="loader" class="w-16 h-16 text-blue-500 animate-spin" />
    </div>

    <Card v-if="!loading.get">
        <template #header>
            <div class="flex-shrink-0 flex items-center mr-4">
                <button @click="back">
                    <Icon icon="arrow-left" class="w-6 text-blue-500" />
                </button>
            </div>

            <div class="font-medium text-gray-900 text-lg flex-grow">
                {{ title }}
            </div>

            <div>
                <button class="button" @click="save"
                    :disabled="loading.save"
                >
                    <Icon icon="check" class="w-5 h-5" v-if="!loading.save" />
                    <Icon icon="loader" class="h-5 w-5 animate-spin" v-if="loading.save" />
                    <span>Сохранить</span>
                </button>
            </div>
        </template>

        <Notice />

        <div class="flex flex-col gap-y-4">
            <div class="flex gap-x-4">
                <div class="w-8/12">
                    <Field label="Название" v-model="fields.title" />
                </div>

                <div class="w-4/12">
                    <Field label="Категория" v-model="fields.category" type="select" :items="categories" v-if="categories" />
                </div>
            </div>

            <div class="flex gap-x-4">
                <div class="w-2/12">
                    <Field label="Начало" v-model="fields.startDate" type="datetime" />
                </div>

                <div class="w-2/12">
                    <Field label="Конец" v-model="fields.endDate" type="datetime" />
                </div>

                <div class="w-6/12">
                    <Field label="Организатор" v-model="fields.organizer" />
                </div>

                <div class="w-2/12">
                    <Field label="Доступно для регистрации" v-model="fields.registration" type="toggle" />
                </div>
            </div>

            <div>
                <div v-if="confs.length > 0" class="mb-4">
                    <div v-for="conf, confIndex in confs" :key="confIndex"
                        class="flex gap-x-4 items-end"
                    >
                        <Field type="select" :items="confTypes" v-model="conf.type" label="Платформа"
                            class="w-2/12"
                        />

                        <Field v-model="conf.link" label="Ссылка"
                            class="w-4/12"
                         />

                        <Field v-model="conf.identifier" label="Идентификатор" />

                        <Field v-model="conf.code" label="Код доступа" />

                        <button class="button button_red h-9"
                            @click="dropConf(confIndex)"
                        >
                            <Icon icon="x" class="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <button class="flex text-sm items-center gap-x-2 font-semibold text-blue-500"
                    @click="addConf"
                    v-if="confs.length === 0"
                >
                    <Icon icon="zoom" class="w-6 h-6" />
                    <span>Добавить конференцию</span>
                </button>
            </div>

            <div>
                <Field type="editor" v-model="fields.description" label="Описание" />
            </div>
        </div>

        <div class="mt-5" v-if="route.params.scheduleId">
            <button class="button button_red" @click="remove">
                <Icon icon="x" class="w-5 h-5" />
                <span>Удалить</span>
            </button>
        </div>
    </Card>
</div>
</template>
