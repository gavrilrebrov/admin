<script setup>
import { useStore } from 'vuex'
import { computed } from 'vue'
import Icon from '../../../components/Icon.vue'
import Card from '../../../components/Card.vue'
import moment from 'moment/min/moment-with-locales'
import Table from '../../../components/Table.vue'

const store = useStore()

const isLoading = computed(() => store.state.teams.isLoading)
const user = computed(() => store.state.user)

const teams = computed(() => {
    let list = store.state.teams.list
    let documents = store.state.teams.documents

    let output = []

    for (let i in list) {
        let parts = list[i].participants.map(i => {
            let role

            if (i.role === 'manager') role = 1
            if (i.role === 'producer') role = 2
            if (i.role === 'designer') role = 3
            if (i.role === 'developer') role = 4

            let docs = documents.find(d => d.user.username === `${i.role}-${i.identifier}`)
            let _docs = null

            if (docs) {
                _docs = {
                    passportMain: docs.passport_main ? `https://api.copp14.ru${docs.passport_main.url}` : null,
                    passportAddress: docs.passport_address ? `https://api.copp14.ru${docs.passport_address.url}` : null,
                    application: docs.application ? `https://api.copp14.ru${docs.application.url}` : null,
                    agreement: docs.agreement ? `https://api.copp14.ru${docs.agreement.url}` : null,
                    inn: docs.inn ? `https://api.copp14.ru${docs.inn.url}` : null,
                    snils: docs.snils ? `https://api.copp14.ru${docs.snils.url}` : null,
                    education: docs.education ? `https://api.copp14.ru${docs.education.url}` : null,
                    educationAdditional: docs.education_additional ? `https://api.copp14.ru${docs.education_additional.url}` : null,
                }
            }

            return {
                role,
                name: i.name,
                phone: i.phone,
                email: i.email,
                jobPlace: i.jobPlace,
                jobPosition: i.jobPosition,
                identifier: i.identifier,
                docs: _docs,
                id: i.id
            }
        })

        parts = parts.sort(function (a, b) {
            if (a.role > b.role) {
                return 1; }
            if (a.role < b.role) {
                return -1; }
            return 0;
        })

        let grade = list[i].grades.find(g => g.expert === user.value.id)

        output.push({
            name: list[i].name ? list[i].name : '-',
            participants: parts,
            identifier: list[i].identifier,
            created_at: list[i].created_at,
            courseName: list[i].courseName,
            homework1: list[i].homework1,
            homework2: list[i].homework2,
            homework3: list[i].homework3,
            organization: parts[0].jobPlace,
            id: list[i].id,
            description: parts[0].jobPlace,
            grade: grade ? grade.value : 0,
            courseNameCP: 'https://copp-sakha.ru'
        })
    }

    return output
})

const getRoleName = (roleName) => {
    if (roleName === 1) {
        return 'Менеджер (Team-lead)'
    } else if (roleName === 3) {
        return 'Дизайнер'
    } else if (roleName === 4) {
        return 'Разработчик'
    } else if (roleName === 2) {
        return 'Методист/Продюсер'
    }
}

const columns = [
    { label: '#', key: 'identifier' },
    { label: 'Команда', key: 'name', type: 'description' },
    { label: 'Курс', key: 'courseName' },
    { label: 'Курс на ЦП', key: 'courseNameCP', type: 'link' },
    { label: 'ОП-1', key: 'homework1', type: 'file' },
    { label: 'ОП-2', key: 'homework2', type: 'file' },
    // { label: 'ДЗ-3', key: 'homework3', type: 'file' },
    { label: 'Баллы', key: 'grade', type: 'input-number' },
]

const save = () => {
    store.commit('notice', null)
    store.dispatch('teams/saveGrades', teams.value)
}

const downloadDocuments = (id) => {
    store.dispatch('teams/downloadDocuments', id)
}

moment.locale('ru')
</script>

<template>
<div>
    <div v-if="isLoading"
        class="
            w-full h-full
            flex items-center justify-center
        "
    >
        <Icon icon="loader" class="w-16 h-16 text-blue-500 animate-spin" />
    </div>

    <div v-if="user.role.name === 'proo-expert'">
        <button id="saveGrades" @click="save" class="hidden"></button>
        <Table :columns="columns" :data="teams" v-if="!isLoading"/>
        <!-- Оценивание закрыто -->
    </div>

    <div class="flex flex-col gap-y-5" v-if="user.role.name === 'teams'">
        <Card
            v-for="team in teams"
            :key="team.id"
        >
            <template #header>
                <div class="flex items-center py-5 w-full -m-5">
                    <div class="
                            flex-shrink-0
                            w-24
                            font-semibold
                            text-2xl
                            text-gray-300
                            pl-5
                        "
                    >
                        #<span class="text-blue-500">{{ team.identifier }}</span>
                    </div>

                    <div class="flex-grow flex flex-col gap-y-1">
                        <div
                            class="
                                font-semibold
                                flex items-center gap-x-3
                            "
                        >
                            <div>{{ team.name }}</div>
                            <div class="font-semibold text-gray-500 text-sm">Курс: {{ team.courseName }}</div>
                        </div>

                        <div class="text-gray-400
                                font-medium
                                text-sm
                            "
                        >{{ team.organization }}</div>
                    </div>

                    <div class="
                            flex-shrink-0
                            flex
                            gap-x-2
                            text-sm"
                    >
                        <div class="
                            font-semibold
                            px-2 py-1
                            text-xs
                            flex items-center justify-center
                            rounded
                        "
                            :class="{
                                'bg-blue-100 text-blue-500': team.homework1,
                                'bg-gray-100 text-gray-500': !team.homework1,
                            }"
                            :title="team.homework1 ? 'Работа загружена' : 'Работа не загружена'"
                        >
                            <a :href="`https://api.copp14.ru${team.homework1.url}`" target="_blank" v-if="team.homework1" >ДЗ-1</a>

                            <span v-if="!team.homework1">ДЗ-1</span>
                        </div>

                        <div class="
                            font-semibold
                            px-2 py-1
                            text-xs
                            flex items-center justify-center
                            rounded
                        "
                            :class="{
                                'bg-blue-100 text-blue-500': team.homework2,
                                'bg-gray-100 text-gray-500': !team.homework2,
                            }"
                            :title="team.homework2 ? 'Работа загружена' : 'Работа не загружена'"
                        >
                            <a :href="`https://api.copp14.ru${team.homework2.url}`" target="_blank" v-if="team.homework2" >ДЗ-2</a>

                            <span v-if="!team.homework2">ДЗ-2</span>
                        </div>

                        <div class="
                            font-semibold
                            px-2 py-1
                            text-xs
                            flex items-center justify-center
                            rounded
                        "
                            :class="{
                                'bg-blue-100 text-blue-500': team.homework3,
                                'bg-gray-100 text-gray-500': !team.homework3,
                            }"
                            :title="team.homework3 ? 'Работа загружена' : 'Работа не загружена'"
                        >
                            <a :href="`https://api.copp14.ru${team.homework3.url}`" target="_blank" v-if="team.homework3" >ДЗ-3</a>

                            <span v-if="!team.homework3">ДЗ-3</span>
                        </div>
                    </div>
                </div>
            </template>

            <div class="flex flex-col divide-y divide-gray-200 -m-5">
                <div class=""
                    v-for="participant in team.participants"
                    :key="participant.id"
                >
                    <div class="
                        flex
                        text-sm
                        items-center
                        py-3
                    ">
                        <div class="
                                flex-shrink-0
                                w-24
                                text-gray-300
                                font-semibold
                                text-lg
                                pl-5
                            "
                        >
                            #{{ participant.identifier }}
                        </div>

                        <div class="
                                flex-grow
                            "
                        >
                            <div class="font-medium">
                                {{ participant.name }}
                            </div>

                            <div class="text-gray-500">
                                {{ participant.jobPosition }}
                            </div>
                        </div>

                        <div class="mr-5 cursor-pointer"
                            @click="downloadDocuments(participant.id)"
                        >
                            <div class="flex gap-x-2 text-xs bg-blue-100 text-blue-500
                                font-semibold
                                px-2 py-1
                                text-xs
                                flex items-center justify-center
                                rounded
                            ">
                                <Icon icon="download" class="w-4 h-4 text-blue-500" />
                                <span>Документы</span>
                            </div>
                        </div>

                        <div class="
                                w-72 flex-shrink-0
                                flex flex-col
                                gap-y-1
                                text-sm
                            "
                        >
                            <div class="flex items-center gap-x-2">
                                <Icon icon="phone" class="w-4 h-4 text-blue-500" />
                                <a :href="`tel:+7${participant.phone}`">{{ participant.phone }}</a>
                            </div>
                            <div class="flex items-center gap-x-2">
                                <Icon icon="at-symbol" class="w-4 h-4 text-blue-500" />
                                <a :href="`mailto:${participant.email}`">{{ participant.email }}</a>
                            </div>
                        </div>

                        <div class="
                                w-48 flex-shrink-0
                            "
                        >
                            <div class="
                                    text-xs
                                    font-semibold
                                    text-white
                                    inline-block
                                    rounded-sm
                                "
                                :class="{
                                    'text-red-500 bg-red-100': participant.role === 1,
                                    'text-yellow-500 bg-yellow-100': participant.role === 3,
                                    'text-indigo-500 bg-indigo-100': participant.role === 4,
                                    'text-green-500 bg-green-100': participant.role === 2,
                                }"
                                style="padding:2px 5px"
                            >
                                {{ getRoleName(participant.role) }}
                            </div>
                        </div>
                    </div>

                    <!-- <div class="text-xs flex px-5 pb-5 font-semibold ml-20 gap-x-2" v-if="participant.docs">
                        <a :href="participant.docs.passportMain" download v-if="participant.docs.passportMain"
                            class="bg-blue-100 text-blue-500 px-2 py-1 rounded"
                        >Паспорт: главная</a>

                        <a :href="participant.docs.passportAddress" download v-if="participant.docs.passportAddress"
                            class="bg-blue-100 text-blue-500 px-2 py-1 rounded"
                        >Паспорт: прописка</a>

                        <a :href="participant.docs.application" download v-if="participant.docs.application"
                            class="bg-blue-100 text-blue-500 px-2 py-1 rounded"
                        >Заявление</a>

                        <a :href="participant.docs.inn" download v-if="participant.docs.inn"
                            class="bg-blue-100 text-blue-500 px-2 py-1 rounded"
                        >ИНН</a>

                        <a :href="participant.docs.snils" download v-if="participant.docs.snils"
                            class="bg-blue-100 text-blue-500 px-2 py-1 rounded"
                        >СНИЛС</a>

                        <a :href="participant.docs.education" download v-if="participant.docs.education"
                            class="bg-blue-100 text-blue-500 px-2 py-1 rounded"
                        >Документ об образовании</a>

                        <a :href="participant.docs.educationAdditional" download v-if="participant.docs.educationAdditional"
                            class="bg-blue-100 text-blue-500 px-2 py-1 rounded"
                        >Дополнительный документ</a>
                    </div> -->
                </div>
            </div>
        </Card>
    </div>
</div>
</template>
