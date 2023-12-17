<template>
<div class="max-w-screen overflow-hidden">
  <Message />

  <div v-if="!appStore.user" class="w-screen h-screen flex items-center justify-center bg-gray-100 relative z-10">
    <div class="flex flex-col gap-y-8 items-center">
      <div class="text-center font-bold text-2xl text-slate-600">
        Вход в систему
      </div>

      <Card>
        <form class="space-y-5" ref="formRef" @submit="login">
          <Field label="Логин или E-mail">
            <Input v-model="loginFields.identifier" placeholder="Введите логин или E-mail" />
          </Field>

          <Field label="Пароль">
            <Input v-model="loginFields.password" type="password" placeholder="Введите пароль" />
          </Field>

          <div>
            <Button :submit="true" class="w-full">Войти</Button>
          </div>
        </form>
      </Card>
    </div>
  </div>

  <div v-if="appStore.user" class="w-screen h-screen flex">
    <div class="bg-slate-800 w-60 flex flex-col justify-between shrink-0 relative z-40">
      <div class="py-3 px-5 flex items-center gap-x-3">
        <div class="grow w-full text-sm flex flex-col gap-y-5">
          <div class="flex items-center gap-x-3">
            <div>
              <Icon icon="user-circle" class="w-6 h-6 text-white" />
            </div>

            <div class="flex flex-col gap-y-1">
              <div class="font-semibold text-gray-100">
                {{ appStore.user.username }}
              </div>
            </div>
          </div>

          <div>
            <Button class="flex items-center gap-x-2" size="sm" @click="logout">
              <Icon icon="logout" class="h-4 mt-[1px]" />
              <span>Выход</span>
            </Button>
          </div>
        </div>
      </div>

      <div class="flex flex-col p-2 grow h-full gap-y-1">
        <router-link :to="item.route"
          class="flex items-center p-2 gap-x-3 group cursor-pointer rounded duration-200"
          v-for="item in menuItems"
          :key="item.id"
          :class="{
            'bg-gray-900': item.plural === route.params.slug
          }"
        >
          <Icon class="w-6 transition shrink-0" :icon="item.icon"
            :class="{
              'text-sky-500': item.plural === route.params.slug,
              'text-slate-500': item.plural !== route.params.slug
            }"
          />

          <div class="font-medium text-sm transition"
            :class="{
              'text-white': item.plural === route.params.slug,
              'text-slate-400': item.plural !== route.params.slug
            }"
          >
            {{ item.label }}
          </div>
        </router-link>
      </div>

      <div class="p-5 text-sm font-bold text-gray-500">
        v0.1
      </div>
    </div>

    <div class="w-full max-h-full bg-slate-100 h-screen oveflow-hidden">
      <router-view />
    </div>
  </div>
</div>
</template>

<script setup>
import { defineProps, onMounted, ref } from 'vue'
import { useAppStore } from '@/stores/app'
import Cookies from 'js-cookie'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'

import Message from './message.vue'
import Card from './card.vue'
import Field from './field.vue'
import Input from './input.vue'
import Button from './button.vue'
import Icon from './icon.vue'

const props = defineProps(['user', 'allowedResources', 'menu'])
const appStore = useAppStore()
const user = ref(null)
const menuItems = ref([])
const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:1337'
const { t } = useI18n()
const route = useRoute()

const loginFields = ref({
  identifier: null,
  password: null,
})

onMounted(() => {
  init()
})

const init = async () => {
  if (Cookies.get('token')) {
    const res = await fetch(`${apiUrl}/api/users/me`, {
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`
      }
    })

    const json = await res.json()

    if (json.id) {
      appStore.$patch({
        user: json
      })

      const ctb = await fetch(`${apiUrl}/api/content-type-builder/content-types`, {
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`
        }
      })

      const ctbj = await ctb.json()

      if (ctbj.data) {
        const contentTypes = ctbj.data.filter(i => !i.plugin)

        appStore.$patch({
          contentTypes,
        })

        let _mi = contentTypes.map(i => ({
          id: i.apiID,
          label: t(`models.${i.schema.pluralName}.plural`),
          route: `/r/${i.schema.pluralName}`,
          icon: t(`models.${i.schema.pluralName}.icon`),
          plural: i.schema.pluralName,
        }))

        if (props.menu) {
          menuItems.value = props.menu.concat(_mi.filter(i => props.allowedResources.includes(i.plural)))
        } else {
          // menuItems.value = _mi.filter(i => props.allowedResources.includes(i.route))
        }
      }
    }
  }
}

const login = async (e) => {
  e.preventDefault()

  if (!loginFields.value.identifier || !loginFields.value.password) {
    appStore.$patch({
      message: {
        type: 'error',
        text: 'Все поля обязательны для заполнения'
      }
    })
  } else {
    const res = await fetch(`${apiUrl}/api/auth/local`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'post',
      body: JSON.stringify({
        identifier: loginFields.value.identifier,
        password: loginFields.value.password,
      })
    })

    const json = await res.json()

    if (json.error) {
      if (json.error.name === 'ValidationError') {
        appStore.$patch({
          message: {
            type: 'error',
            text: 'Неправильный логин или пароль'
          }
        })
      }
    } else {
      if (json.jwt) {
        Cookies.set('token', json.jwt)
        appStore.$patch({
          user: json.user
        })

        init()
      }
    }
  }
}
</script>