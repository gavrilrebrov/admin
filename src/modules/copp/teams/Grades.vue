<script setup>
import { useStore } from 'vuex'
import { computed, onMounted } from 'vue'

const store = useStore()
const list = computed(() => {
    return strore.state.teams.list
})

onMounted(() => {
    store.dispatch('teams/getExperts')
})

const experts = computed(() => store.state.teams.experts)

</script>


<template>
<div>
    <table>
        <thead>
            <tr>
                <th rowspan="2">#</th>
                <th rowspan="2">Команда</th>
                <th rowspan="2">Организация</th>
                <th colspan="9">Баллы</th>
            </tr>

            <tr>
                <th>Присяжный</th>
            </tr>
        </thead>
    </table>
</div>
</template>
