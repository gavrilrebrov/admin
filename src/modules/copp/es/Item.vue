<script setup>
import { onMounted, computed, watch, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import moment from 'moment-timezone'
import Icon from '../../../components/Icon.vue'
import config from '../../../config.json'

const route = useRoute()
const store = useStore()

const item = computed(() => store.state.es.item)
const isLoading = computed(() => store.state.isLoading)

const lokusValue = computed(() => {
    if (item.value.lokus) {
        let data = JSON.parse(item.value.lokus)

        let ext = 0
        let int = 0
        let total = 0

        for (let i in data) {
            let number = '' + data[i].number
            let answer = data[i].answer

            if (number === '2' && answer === 'a') ext++
            if (number === '2' && answer === 'b') int++

            if (number === '3' && answer === 'b') ext++
            if (number === '3' && answer === 'a') int++

            if (number === '4' && answer === 'b') ext++
            if (number === '4' && answer === 'a') int++

            if (number === '5' && answer === 'b') ext++
            if (number === '5' && answer === 'a') int++

            if (number === '6' && answer === 'a') ext++
            if (number === '6' && answer === 'b') int++

            if (number === '7' && answer === 'a') ext++
            if (number === '7' && answer === 'b') int++

            if (number === '9' && answer === 'a') ext++
            if (number === '9' && answer === 'b') int++

            if (number === '10' && answer === 'b') ext++
            if (number === '10' && answer === 'a') int++

            if (number === '11' && answer === 'b') ext++
            if (number === '11' && answer === 'a') int++

            if (number === '12' && answer === 'b') ext++
            if (number === '12' && answer === 'a') int++

            if (number === '13' && answer === 'b') ext++
            if (number === '13' && answer === 'a') int++

            if (number === '15' && answer === 'b') ext++
            if (number === '15' && answer === 'a') int++

            if (number === '16' && answer === 'a') ext++
            if (number === '16' && answer === 'b') int++

            if (number === '17' && answer === 'a') ext++
            if (number === '17' && answer === 'b') int++

            if (number === '18' && answer === 'a') ext++
            if (number === '18' && answer === 'b') int++

            if (number === '20' && answer === 'a') ext++
            if (number === '20' && answer === 'b') int++

            if (number === '21' && answer === 'a') ext++
            if (number === '21' && answer === 'b') int++

            if (number === '22' && answer === 'b') ext++
            if (number === '22' && answer === 'a') int++

            if (number === '23' && answer === 'a') ext++
            if (number === '23' && answer === 'b') int++

            if (number === '25' && answer === 'a') ext++
            if (number === '25' && answer === 'b') int++

            if (number === '26' && answer === 'b') ext++
            if (number === '26' && answer === 'a') int++

            if (number === '28' && answer === 'b') ext++
            if (number === '28' && answer === 'a') int++

            if (number === '29' && answer === 'a') ext++
            if (number === '29' && answer === 'b') int++

            if (
                number === '2' || number === '3' || number === '4' || number === '5' ||
                number === '6' || number === '7' || number === '9' || number === '10' ||
                number === '11' || number === '12' || number === '13' || number === '15' ||
                number === '16' || number === '17' || number === '18' || number === '20' ||
                number === '21' || number === '22' || number === '23' || number === '25' ||
                number === '26' || number === '28' || number === '29'
            ) {
                total++
            }
        }

        return {
            ext: Math.round((100 * ext) / total),
            int: Math.round((100 * int) / total)
        }
    } else {
        return null
    }

})

const anchorValue = computed(() => {
    if (item.value.anchor) {
        let data = JSON.parse(item.value.anchor)

        let competence = 0
        let management = 0
        let independence = 0
        let workStability = 0
        let lifeStability = 0
        let service = 0
        let challenge = 0
        let lifestyle = 0
        let enterprise = 0

        let keys = {
            competence: ['1', '9', '17', '25', '33'],
            management: ['2', '10', '18', '26', '34'],
            independence: ['3', '11', '19', '27', '35'],
            workStability: ['4', '12', '36'],
            lifeStability: ['20', '28', '41'],
            service: ['5', '13', '21', '29', '37'],
            challenge: ['6', '14', '22', '30', '38'],
            lifestyle: ['7', '15', '23', '31', '39'],
            enterprise: ['8', '16', '24', '32', '40'],
        }

        for (let i in data) {
            let number = '' + data[i].number
            let answer = +data[i].answer

            if (keys.competence.includes(number)) competence += answer
            if (keys.management.includes(number)) management += answer
            if (keys.independence.includes(number)) independence += answer
            if (keys.workStability.includes(number)) workStability += answer
            if (keys.lifeStability.includes(number)) lifeStability += answer
            if (keys.service.includes(number)) service += answer
            if (keys.challenge.includes(number)) challenge += answer
            if (keys.lifestyle.includes(number)) lifestyle += answer
            if (keys.enterprise.includes(number)) enterprise += answer
        }

        competence = Math.round(competence / keys.competence.length)
        management = Math.round(management / keys.management.length)
        independence = Math.round(independence / keys.independence.length)
        workStability = Math.round(workStability / keys.workStability.length)
        lifeStability = Math.round(lifeStability / keys.lifeStability.length)
        service = Math.round(service / keys.service.length)
        challenge = Math.round(challenge / keys.challenge.length)
        lifestyle = Math.round(lifestyle / keys.lifestyle.length)
        enterprise = Math.round(enterprise / keys.enterprise.length)

        return {
            competence,
            management,
            independence,
            workStability,
            lifeStability,
            service,
            challenge,
            lifestyle,
            enterprise
        }
    } else {
        return null
    }

})

onMounted(() => {
    store.dispatch('es/getItem', route.params.applicationId)
})
</script>

<template>
<div>
    <div v-if="item && !isLoading" class="
            bg-white shadow overflow-hidden sm:rounded-lg
        "
    >
        <div class="px-4 py-5 sm:px-6">
            <h3 class="text-lg leading-6 font-medium text-gray-900">
                {{ item.name }}
            </h3>

            <p class="mt-1 max-w-2xl text-sm text-gray-500">
                {{ item.citizenCategory }}
            </p>
        </div>

        <div class="border-t border-gray-200">
            <div class="flex">
                <div
                    :class="{
                        'w-2/3' : item.questionnaire,
                        'w-full': !item.questionnaire
                    }"
                >
                    <dl class="border-b">
                        <div class="
                                bg-gray-50 px-4 py-5
                                sm:grid sm:grid-cols-3 sm:gap-4
                                sm:px-6
                            "
                        >
                            <dt class="text-sm
                                    font-medium text-gray-500
                                "
                            >
                                Номер телефона
                            </dt>

                            <dd class="mt-1 text-sm text-gray-900
                                    sm:mt-0 sm:col-span-2
                                "
                            >
                                <a :href="`tel:+7${item.phone}`">+7{{ item.phone }}</a>
                            </dd>
                        </div>
                        <div class="
                                bg-white
                                px-4 py-5
                                sm:grid sm:grid-cols-3 sm:gap-4
                                sm:px-6
                            "
                        >
                            <dt class="text-sm
                                    font-medium text-gray-500
                                "
                            >
                                E-mail
                            </dt>

                            <dd class="mt-1 text-sm text-gray-900
                                    sm:mt-0 sm:col-span-2
                                "
                            >
                                <a :href="`mailto:${item.email}`">{{ item.email }}</a>
                            </dd>
                        </div>

                        <div class="
                                bg-gray-50
                                px-4 py-5
                                sm:grid sm:grid-cols-3 sm:gap-4
                                sm:px-6
                            "
                        >
                            <dt class="text-sm
                                    font-medium text-gray-500
                                "
                            >
                                Адрес проживания
                            </dt>

                            <dd class="mt-1 text-sm text-gray-900
                                    sm:mt-0 sm:col-span-2
                                "
                            >
                                {{ item.address }}
                            </dd>
                        </div>

                        <div class="
                                bg-white
                                px-4 py-5
                                sm:grid sm:grid-cols-3 sm:gap-4
                                sm:px-6
                            "
                        >
                            <dt class="text-sm
                                    font-medium text-gray-500
                                "
                            >
                                Дата подачи заявки
                            </dt>

                            <dd class="mt-1 text-sm text-gray-900
                                    sm:mt-0 sm:col-span-2
                                "
                            >
                                {{ moment(item.created_at).tz('Asia/Yakutsk').format('DD.MM.YYYY HH:mm') }}
                            </dd>
                        </div>

                        <div class="
                                bg-gray-50
                                px-4 py-5
                                sm:grid sm:grid-cols-3 sm:gap-4
                                sm:px-6
                            "
                        >
                            <dt class="text-sm
                                    font-medium text-gray-500
                                "
                            >
                                Документы
                            </dt>

                            <dd class="mt-1 text-sm text-gray-900
                                    sm:mt-0 sm:col-span-2
                                "
                            >
                                <ul role="list" class="border border-gray-200 rounded-md divide-y divide-gray-200 bg-white">
                                    <li class="pl-3 pr-4 py-3 flex items-center justify-between text-sm"
                                        v-for="doc in item.documents"
                                        :key="doc.id"
                                    >
                                        <div class="w-0 flex-1 flex items-center">
                                            <Icon icon="paper-clip" class="w-6 text-gray-400" />

                                            <span class="ml-2 flex-1 w-0 truncate">
                                                {{ doc.name  }}
                                            </span>
                                        </div>

                                        <div class="ml-4 flex-shrink-0">
                                            <a download :href="`${config.apiUrl.copp}${doc.url}`" class="font-medium text-blue-600 hover:text-blue-500">
                                                Скачать
                                            </a>
                                        </div>
                                    </li>
                                </ul>
                            </dd>
                        </div>
                    </dl>

                    <div>
                        <div class="px-6 py-5 border-b" v-if="lokusValue">
                            <div class="mb-2
                                    font-medium text-gray-600">
                                Локус контроля
                            </div>

                            <div>
                                <div class="flex justify-between
                                        text-sm text-gray-500
                                        font-medium mb-2
                                    "
                                >
                                    <div>Экстернальность</div>

                                    <div>Интернальность</div>
                                </div>

                                <div class="flex rounded-full overflow-hidden">
                                    <div :style="{width:`${lokusValue.ext}%`}"
                                        class="h-2 bg-red-400"
                                    >

                                    </div>

                                    <div :style="{width:`${lokusValue.int}%`}"
                                        class="h-2 bg-green-400"
                                    >

                                    </div>
                                </div>

                                <div class="flex justify-between
                                        mt-2
                                    "
                                >
                                    <div>{{ lokusValue.ext }}%</div>

                                    <div>{{ lokusValue.int }}%</div>
                                </div>
                            </div>
                        </div>

                        <div class="p-6" v-if="anchorValue">
                            <div class="mb-2 font-medium text-gray-600">
                                Якоря карьеры
                            </div>

                            <div class="grid grid-cols-2 gap-x-5 gap-y-3 text-sm">
                                <div>
                                    <div class="text-sm text-gray-600 font-medium">
                                        Профессиональная компетентность
                                    </div>

                                    <div class="bg-blue-200 rounded-full overflow-hidden
                                            my-2
                                        "
                                    >
                                        <div :style="{width:`${anchorValue.competence * 10}%`}"
                                            class="h-2 bg-blue-500 rounded-full"
                                        >
                                        </div>
                                    </div>

                                    <div>
                                        {{ anchorValue.competence }}
                                    </div>
                                </div>

                                <div>
                                    <div class="text-sm text-gray-600 font-medium">
                                        Менеджмент
                                    </div>

                                    <div class="bg-blue-200 rounded-full overflow-hidden
                                            my-2
                                        "
                                    >
                                        <div :style="{width:`${anchorValue.management * 10}%`}"
                                            class="h-2 bg-blue-500 rounded-full"
                                        >
                                        </div>
                                    </div>

                                    <div>
                                        {{ anchorValue.management }}
                                    </div>
                                </div>

                                <div>
                                    <div class="text-sm text-gray-600 font-medium">
                                        Автономия (независимость)
                                    </div>

                                    <div class="bg-blue-200 rounded-full overflow-hidden
                                            my-2
                                        "
                                    >
                                        <div :style="{width:`${anchorValue.independence * 10}%`}"
                                            class="h-2 bg-blue-500 rounded-full"
                                        >
                                        </div>
                                    </div>

                                    <div>
                                        {{ anchorValue.independence }}
                                    </div>
                                </div>

                                <div>
                                    <div class="text-sm text-gray-600 font-medium">
                                        Стабильность работы
                                    </div>

                                    <div class="bg-blue-200 rounded-full overflow-hidden
                                            my-2
                                        "
                                    >
                                        <div :style="{width:`${anchorValue.workStability * 10}%`}"
                                            class="h-2 bg-blue-500 rounded-full"
                                        >
                                        </div>
                                    </div>

                                    <div>
                                        {{ anchorValue.workStability }}
                                    </div>
                                </div>

                                <div>
                                    <div class="text-sm text-gray-600 font-medium">
                                        Стабильность места жительства
                                    </div>

                                    <div class="bg-blue-200 rounded-full overflow-hidden
                                            my-2
                                        "
                                    >
                                        <div :style="{width:`${anchorValue.lifeStability * 10}%`}"
                                            class="h-2 bg-blue-500 rounded-full"
                                        >
                                        </div>
                                    </div>

                                    <div>
                                        {{ anchorValue.lifeStability }}
                                    </div>
                                </div>

                                <div>
                                    <div class="text-sm text-gray-600 font-medium">
                                        Служение
                                    </div>

                                    <div class="bg-blue-200 rounded-full overflow-hidden
                                            my-2
                                        "
                                    >
                                        <div :style="{width:`${anchorValue.service * 10}%`}"
                                            class="h-2 bg-blue-500 rounded-full"
                                        >
                                        </div>
                                    </div>

                                    <div>
                                        {{ anchorValue.service }}
                                    </div>
                                </div>

                                <div>
                                    <div class="text-sm text-gray-600 font-medium">
                                        Вызов
                                    </div>

                                    <div class="bg-blue-200 rounded-full overflow-hidden
                                            my-2
                                        "
                                    >
                                        <div :style="{width:`${anchorValue.challenge * 10}%`}"
                                            class="h-2 bg-blue-500 rounded-full"
                                        >
                                        </div>
                                    </div>

                                    <div>
                                        {{ anchorValue.challenge }}
                                    </div>
                                </div>

                                <div>
                                    <div class="text-sm text-gray-600 font-medium">
                                        Интеграция стилей жизни
                                    </div>

                                    <div class="bg-blue-200 rounded-full overflow-hidden
                                            my-2
                                        "
                                    >
                                        <div :style="{width:`${anchorValue.lifestyle * 10}%`}"
                                            class="h-2 bg-blue-500 rounded-full"
                                        >
                                        </div>
                                    </div>

                                    <div>
                                        {{ anchorValue.lifestyle }}
                                    </div>
                                </div>

                                <div>
                                    <div class="text-sm text-gray-600 font-medium">
                                        Предпринимательство
                                    </div>

                                    <div class="bg-blue-200 rounded-full overflow-hidden
                                            my-2
                                        "
                                    >
                                        <div :style="{width:`${anchorValue.enterprise * 10}%`}"
                                            class="h-2 bg-blue-500 rounded-full"
                                        >
                                        </div>
                                    </div>

                                    <div>
                                        {{ anchorValue.enterprise }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="w-1/2 border-l p-6" v-if="item.questionnaire">
                    <div class="font-medium text-gray-600
                            mb-3
                        "
                    >
                        Анкета
                    </div>

                    <dl class="flex flex-col gap-y-5">
                        <div v-for="question, qIndex in JSON.parse(item.questionnaire)"
                            :key="qIndex"
                        >
                            <dt class="text-sm
                                font-medium text-gray-400">
                                {{ question.question }}
                            </dt>

                            <dd class="mt-1 text-sm text-gray-900">
                                {{ question.answer }}
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>
        </div>
    </div>
</div>
</template>
