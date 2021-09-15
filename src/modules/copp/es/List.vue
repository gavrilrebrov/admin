<script setup>
import Table from '../../../components/Table.vue'
import { onMounted, watch, computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const project = computed(() => store.state.project)

const list = computed(() => {
    let _list = store.state.es.list

    let output = []

    for (let i in _list) {
        let item = _list[i]

        let q = JSON.parse(item.questionnaire)
        let r = q.find(i => i.question === 'Укажите предыдущую должность и место работы:')

        output.push({
            name: item.name,
            contacts: {
                phone: item.phone,
                email: item.email,
                address: item.address
            },
            workplace: r && r.answer,
            tutor: item.tutor.name,
            date: item.created_at,
            id: item.id,
            description: item.citizenCategory
        })
    }

    return output
})

watch(project, value => {
    if (value) {
        store.dispatch('es/getList')
    }
})

const columns = [
    { label: 'Заявитель', key: 'name', type: 'description' },
    { label: 'Контакты', key: 'contacts', type: 'contacts' },
    { label: 'Предыдущее место работы', key: 'workplace' },
    { label: 'Тьютор', key: 'tutor' },
    { label: 'Дата', key: 'date', type: 'datetime' },
    { label: 'Документы', key: 'documents', type: 'download' }
]

const onDownload = (id) => {
    console.log('download: ', id)
}
</script>

<template>
<div>
    <Table :columns="columns" :data="list" show="es"
        @onDownload="onDownload"
    />
</div>
</template>
