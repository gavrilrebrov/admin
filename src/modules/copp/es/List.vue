<script setup>
import Table from '../../../components/Table.vue'
import Icon from '../../../components/Icon.vue'
import Field from '../../../components/form/Field.vue'
import { watch, computed, ref } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const project = computed(() => store.state.project)
const tutors = computed(() => {
    let tutors =  store.state.es.tutors.map(i => ({
        label: i.name,
        value: i.id
    }))

    tutors.unshift({
        label: 'Все тьюторы',
        value: null
    })

    return tutors
})

const isLoading = computed(() => store.state.es.isLoading)

const list = computed(() => {
    let _list = store.state.es.list

    let output = []

    for (let i in _list) {
        let item = _list[i]

        let q = item.questionnaire ? JSON.parse(item.questionnaire) : []
        let r = q.find(i => i.question === 'Укажите предыдущую должность и место работы:')

        output.push({
            name: item.name,
            contacts: {
                phone: item.phone,
                email: item.email,
                address: item.address
            },
            workplace: r ? r.answer : 'Не указано',
            tutor: item.tutor ? item.tutor.name : 'Не указано',
            date: item.registeredDate,
            id: item.id,
            description: item.citizenCategory
        })
    }

    return output
})

const columns = [
    { label: 'Заявитель', key: 'name', type: 'description' },
    { label: 'Контакты', key: 'contacts', type: 'contacts' },
    { label: 'Предыдущее место работы', key: 'workplace' },
    { label: 'Тьютор', key: 'tutor' },
    { label: 'Дата', key: 'date', type: 'datetime' },
    { label: 'Документы', key: 'documents', type: 'download' },
]

const onDownload = async (id) => {
    store.dispatch('es/downloadDocuments', id)
}

const citizenCategories = [
    { label: 'Все категории', value: null },
    { label: 'Безработные граждане', value: 'Безработные граждане' },
    { label: 'Граждане, ищущие работу и обратившиеся в органы службы занятости', value: 'Граждане, ищущие работу и обратившиеся в органы службы занятости' },
    { label: 'Лица в возрасте 50-ти лет и старше', value: 'Лица в возрасте 50-ти лет и старше' },
    { label: 'Лица предпенсионного возраста', value: 'Лица предпенсионного возраста' },
    { label: 'Женщины в отпуске по уходу за детьми до трех лет', value: 'Женщины в отпуске по уходу за детьми до трех лет' },
    { label: 'Женщины, не состоящие в трудовых отношениях и имеющие детей дошкольного возраста', value: 'Женщины, не состоящие в трудовых отношениях и имеющие детей дошкольного возраста' }
]

const sorts = [
    { label: 'Сначала новые', value: 'registeredDate:DESC' },
    { label: 'Сначала старые', value: 'registeredDate:ASC' },
    { label: 'по ФИО', value: 'name:ASC' }
]

let selectedCategory = ref(null)
let selectedTutor = ref(null)
let selectedDateRange = ref(null)
let selectedSort = ref('registeredDate:DESC')

watch(selectedCategory, value => {
    store.commit('es/filter', { key: 'citizenCategory', value })
    store.commit('es/filter', { key: 'page', value: 1 })
    store.dispatch('es/getList')
})

watch(selectedTutor, value => {
    store.commit('es/filter', { key: 'tutor', value })
    store.commit('es/filter', { key: 'page', value: 1 })
    store.dispatch('es/getList')
})

watch(selectedDateRange, value => {
    store.commit('es/filter', { key: 'period', value })
    store.commit('es/filter', { key: 'page', value: 1 })
    store.dispatch('es/getList')
})

watch(selectedSort, value => {
    store.commit('es/filter', { key: 'sort', value })
    store.commit('es/filter', { key: 'page', value: 1 })
    store.dispatch('es/getList')
})

let reset = () => {
    selectedCategory.value = null
    selectedDateRange.value = null
    selectedTutor.value = null
    selectedSort.value = 'registeredDate:DESC'

    store.commit('es/resetFilter')

    store.dispatch('es/getList')
}

let exportExcel = () => {
    store.dispatch('es/exportExcel')
}
</script>

<template>
<div>
    <div class="grid grid-cols-5 mb-5 gap-x-5 items-end">
        <Field label="Категория" type="select" :items="citizenCategories" v-model="selectedCategory" />

        <Field label="Тьютор" type="select" :items="tutors" v-model="selectedTutor" />

        <Field label="Период" type="daterange" v-model="selectedDateRange" />

        <Field label="Сортировка" type="select" :items="sorts" v-model="selectedSort" />

        <button
            class="
                bg-blue-200
                py-2
                font-semibold
                rounded-md
                text-blue-500
                text-sm
                w-48
                duration-200
                hover:bg-blue-300
            "
            @click="reset"
        >Сбросить все фильтры</button>
    </div>

    <div class="mb-5">
        <button
            class="
                relative bg-green-500
                rounded-md shadow-sm
                text-white
                px-3 py-2
                text-left cursor-pointer
                focus:outline-none
                sm:text-sm
                inline-flex items-center
                gap-x-2
            "
            @click="exportExcel"
        >
            <Icon icon="excel" class="w-6" />
            Экспорт в Excel
        </button>
    </div>

    <div v-if="isLoading" class="w-full h-full flex items-center justify-center">
        <Icon icon="loader" class="w-16 h-16 text-blue-500 animate-spin" />
    </div>

    <Table :columns="columns" :data="list" show="es"
        @onDownload="onDownload"
        v-if="!isLoading"
    />
</div>
</template>
