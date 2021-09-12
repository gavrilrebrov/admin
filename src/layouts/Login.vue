<script setup>
import Field from '../components/form/Field.vue'
import Button from '../components/Button.vue'
import Notice from '../components/Notice.vue'
import pkg from '../../package.json'

import { useStore } from 'vuex'

import { ref } from 'vue'

const store = useStore()

let form = ref({
    login: '',
    password: '',
})

const login = () => {
    store.commit('notice', null)

    if (form.value.login === '' || form.value.password === '') {
        store.commit('notice', {
            type: 'error',
            text: 'Заполните поля'
        })
    } else {
        store.dispatch('login', {
            login: form.value.login,
            password: form.value.password
        })
    }

}
</script>

<template>
<div>
    <div class="p-5 flex items-center justify-center w-screen h-screen
            bg-gray-100
        "
    >
        <div class="">
            <div class="font-semibold text-xl mb-2
                text-center
            ">
                Авторизация
            </div>

            <div class="
                    flex flex-col
                    gap-y-3
                "
            >
                <Field label="Логин" v-model="form.login"  />

                <Field label="Пароль" type="password" v-model="form.password"  />
            </div>

            <Notice class="mt-5" />

            <div class="mt-5 text-center">
                <Button @click="login" label="Войти" icon="arrow-right" icon-right />
            </div>

            <div class="mt-5 text-center text-sm font-semibold text-gray-400">
                v{{ pkg.version }}
            </div>
        </div>
    </div>
</div>
</template>
