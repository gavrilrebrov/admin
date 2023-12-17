<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import Icon from './icon.vue'
import Button from './button.vue'
import { useAppStore } from '@/stores/app'
import moment from 'moment'
import Cookies from 'js-cookie'
import { onClickOutside } from '@vueuse/core'

moment.locale('ru')

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:1337'
const appStore = useAppStore()
const items = ref([])
const columns = ref({})
const drawer = ref(null)

onMounted(async () => {
  await getItems()

  if (route.meta.action === 'edit') {
    const item = items.value.find(i => i.id === +route.params.id)

    appStore.$patch({
      item,
    })
  }

  if (route.meta.action === 'list' && appStore.contentTypes) {
    const model = appStore.contentTypes.find(i => i.schema.pluralName === route.params.slug)

    for (let i in model.schema.attributes) {
      let column = model.schema.attributes[i]

      if (column.relation !== 'oneToMany' && column.type !== 'richtext') {
        columns.value[i] = column
      }
    }
  }
})

watch(() => appStore.contentTypes, value => {
  if (value && route.meta.action === 'list') {
    const model = value.find(i => i.schema.pluralName === route.params.slug)

    for (let i in model.schema.attributes) {
      let column = model.schema.attributes[i]

      if (column.relation !== 'oneToMany' && column.type !== 'richtext') {
        columns.value[i] = column
      }
    }
  }
})

const getItems = async () => {
  const res = await fetch(`${apiUrl}/api/${route.params.slug}?populate=*&publicationState=preview`, {
    headers: {
      Authorization: `Bearer ${Cookies.get('token')}`,
    }
  })

  const json = await res.json()

  if (json.data && json.data.length > 0) {
    items.value = json.data.map(i => ({
      id: i.id,
      ...i.attributes,
    }))
  } else {
    items.value = []
  }
}

watch(() => route.params.slug, value => {
  columns.value = {}

  const model = appStore.contentTypes.find(i => i.schema.pluralName === value)

  if (model) {
    for (let i in model.schema.attributes) {
      let column = model.schema.attributes[i]

      if (column.relation !== 'oneToMany' && column.type !== 'richtext') {
        columns.value[i] = column
      }
    }

    getItems()
  }
  
})

watch(() => route.meta.action, value => {
  if (value === 'list') {
    getItems()
  }
})

watch(() => route.params.slug, value => {
  if (route.meta.action === 'list') {
    getItems()
  }
})

const selectItem = item => {
  appStore.$patch({
    item,
  })

  router.push(`/r/${route.params.slug}/${item.id}`)
}

const formatDate = date => {
  return moment(date).format('LLL')
}

onClickOutside(drawer, e => {
  router.push(`/r/${route.params.slug}`)
})
</script>

<template>
<div>
  <div class="flex justify-between items-center gap-x-6 bg-white px-6">
    <div class="text-lg font-semibold flex items-center py-4 gap-x-4 shrink-0">
      {{ t(`models.${route.params.slug}.plural`) }}
    </div>

    <div class="flex items-center gap-x-3">
      <Button class="flex items-center gap-x-2"
        @click="router.push(`/r/${route.params.slug}/new`)"
      >
        <Icon icon="plus" class="h-5 w-5" />
        <div>
          Создать
        </div>
      </Button>
    </div>
  </div>

  <div class="p-6 grow overflow-y-auto" style="height:calc(100vh - 60px);max-width:calc(100vw - 264px)">
    <table class="min-w-full bg-white rounded shadow-sm">
      <thead>
        <tr>
          <th v-for="column, columnKey in columns" :key="columnKey"
            class="text-left border border-slate-100 bg-slate-50"
          >
            <div class="p-3 text-slate-400 font-normal uppercase text-xs whitespace-nowrap"
              :class="{'text-right': column.type === 'decimal'}"
            >
              {{ t(`models.${route.params.slug}.fields.${columnKey}`) }}
            </div>
          </th>

          <th class="text-right bg-slate-50">
            <div class="p-3 text-slate-400 font-normal uppercase text-xs">
              Опубликовано
            </div>
          </th>

          <th class="bg-slate-50 shadow sticky -right-[24px]"></th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="item in items" :key="item.id">
          <td v-for="column, columnKey in columns" :key="columnKey"
            class="text-sm border border-slate-100 text-slate-800"
          >
            <div class="p-3" v-if="item[columnKey] && (column.type === 'string' || column.type === 'integer')">
              {{ item[columnKey] }}
            </div>

            <div class="p-3 text-right" v-if="item[columnKey] && column.type === 'decimal' && (columnKey === 'price')">
              {{ item[columnKey].toLocaleString('cn', { style: 'currency', currency: 'RUB' }) }}
            </div>

            <div class="p-3" v-if="item[columnKey] && column.type === 'relation' && item[columnKey]['data']">
              {{ item[columnKey].data.attributes.name }}
            </div>

            <div class="p-3" v-if="item[columnKey] && column.type === 'enumeration'">
              {{ item[columnKey].slice(1) }}
            </div>

            <div class="p-3" v-if="item[columnKey] && column.type === 'media' && !column.multiple">
              <div v-if="item[columnKey].data && item[columnKey].data.attributes.url"
                class="w-20 h-10 bg-cover bg-center rounded"
                :style="{
                  'background-image': `url(${apiUrl}${item[columnKey].data.attributes.url})`
                }"
                >
              </div>

              <div class="w-20 h-10 bg-cover bg-center rounded bg-slate-100 flex items-center justify-center" v-else>
                <Icon icon="photograph" class="w-6 h-6 text-slate-400" />
              </div>
            </div>
          </td>

          <td class="text-sm border-t border-slate-100 text-right text-slate-800">
            <div class="p-3">
              {{ item.publishedAt ? formatDate(item.publishedAt) : '-' }}
            </div>
          </td>

          <td class="text-sm border-t border-slate-100 sticky -right-[24px] bg-white shadow">
            <div class="p-3 text-right">
              <Button :secondary="true" @click="selectItem(item)">
                <Icon icon="pencil" class="w-5 h-5 -mx-[3px]" />
              </Button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="h-screen bg-white fixed top-0 right-0 w-[700px] shadow-lg"
    v-if="route.meta.action === 'new' || route.meta.action === 'edit'"
    ref="drawer"
  >
    <router-view />
  </div>
</div>
</template>