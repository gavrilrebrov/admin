<script setup>
import Button from './button.vue'
import Field from './field.vue'
import Input from './input.vue'
import Editor from './editor.vue'
import ImageUploader from './image-uploader.vue'
import Select from './select.vue'

import { useRouter, useRoute } from 'vue-router'
import { ref, onMounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAppStore } from '@/stores/app'
import grid from '@/views/grid.js'
import Cookies from 'js-cookie'

const { t } = useI18n()
const router = useRouter()
const route = useRoute()
const appStore = useAppStore()
const columns = ref({})
const fields = ref({})
const attachments = ref({})
const relatedItems = ref({})
const enumerations = ref({})
const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:1337'

onMounted(async () => {
  await initFields()
  await initItem()
})

watch(() => appStore.contentTypes, async value => {
  if (value) {
    await initFields()
    await initItem()
  }
  
})

watch(() => appStore.item, async value => {
  if (value) {
    await initFields()
    await initItem()
  }
})

const initItem = () => {
  if (appStore.contentTypes) {
    for (let i in columns.value) {
      if (columns.value[i].type && columns.value[i] !== null && columns.value[i] !== undefined) {
        if (columns.value[i].type === 'media') {
          attachments.value[i] = {
            url: route.meta.action === 'edit' ? (appStore.item && appStore.item[i] && appStore.item[i].data ? (apiUrl + appStore.item[i].data.attributes.url) : null) : null,
            id: route.meta.action === 'edit' ? (appStore.item && appStore.item[i] && appStore.item[i].data ? appStore.item[i].data.id : null) : null,
            file: null,
          }
        } else if (columns.value[i].type === 'enumeration') {
          enumerations.value[i] = columns.value[i].enum.map(i => {
            const enumValue = i
            const label = i.slice(1)

            return {
              label,
              value: enumValue,
            }
          })

          if (appStore.item[i]) {
            fields.value[i] = route.meta.action === 'new' ? null : appStore.item[i]
          }
        } else if (columns.value[i].relation === 'manyToOne') {
          fields.value[i] = route.meta.action === 'new' ? null : (appStore.item[i] ? appStore.item[i].data.id : null)
        } else {
          if (i !== 'createdAt' && i !== 'updatedAt' && i !== 'publishedAt' && i !== 'id') {
            fields.value[i] = route.meta.action === 'new' ? null : (appStore.item[i] ? appStore.item[i] : null)
          }
        }
      }
    }
  }
}

const initFields = async () => {
  const types = appStore.contentTypes

  if (types) {
    const model = types.find(i => i.schema.pluralName === route.params.slug)

    for (let i in model.schema.attributes) {
      let column = model.schema.attributes[i]

      if (column.relation === 'manyToOne') {
        const type = types.find(i => i.uid === column.target)

        if (type) {
          const _res = await fetch(`${apiUrl}/api/${type.schema.pluralName}`, {
            headers: {
              Authorization: `Bearer ${Cookies.get('token')}`,
            }
          })
          const _json = await _res.json()

          relatedItems.value[i] = _json.data.map(i => ({
            label: i.attributes.name,
            value: i.id,
          }))
        }
      }

      if (column.relation !== 'oneToMany') {
        columns.value[i] = column
      }
    }
  }
}

const save = async (isDraft = null) => {
  const res = await fetch(`${apiUrl}/api/${route.params.slug}${route.meta.action === 'edit' ? ('/' + route.params.id) : ''}`, {
    method: route.meta.action === 'edit' ? 'put' : 'post',
    headers: {
      Authorization: `Bearer ${Cookies.get('token')}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      data: isDraft !== null ? {
        ...fields.value,
        publishedAt: isDraft === false ? null : new Date(),
      } : fields.value
    })
  })

  const json = await res.json()

  const model = appStore.contentTypes.find(i => i.schema.pluralName === route.params.slug)

  if (json.data) {
    if (attachments.value) {
      for (let i in attachments.value) {
        if (attachments.value[i]['file']) {
          if (attachments.value[i]['file'] === 'removed') {
            await fetch(`${apiUrl}/api/upload/files/${attachments.value[i]['id']}`, {
              method: 'delete',
              headers: {
                Authorization: 'Bearer ' + Cookies.get('token')
              }
            })
          } else {
            const formData = new FormData()
            formData.append('files', attachments.value[i]['file'])
            formData.append('ref', model.uid)
            formData.append('refId', json.data.id)
            formData.append('field', i)

            await fetch(apiUrl + '/api/upload', {
              method: 'post',
              headers: {
                Authorization: 'Bearer ' + Cookies.get('token'),
              },
              body: formData
            })
          }
        }
      }
    }

    router.push(`/r/${route.params.slug}`)

    appStore.$patch({
      item: null,
      message: {
        type: 'success',
        text: 'Изменения успешно сохранены'
      }
    })
  }
}

const back = () => {
  appStore.$patch({
    item: null,
  })

  router.push(`/r/${route.params.slug}`)
}

const remove = async () => {
  await fetch(`${apiUrl}/api/${route.params.slug}/${route.params.id}`, {
    method: 'delete',
    headers: {
      Authorization: 'Bearer ' + Cookies.get('token'),
    },
  })

  appStore.$patch({
    item: null,
  })

  router.push(`/r/${route.params.slug}`)

  appStore.$patch({
    item: null,
    message: {
      type: 'success',
      text: 'Запись успешно удалена'
    }
  })
}
</script>

<template>
<div class="overflow-y-scroll max-h-screen pb-6 min-h-screen">
  <div class="sticky top-0 z-10 py-3 bg-white z-10 border-b border-slate-100">
    <div class="flex justify-between items-center px-6">
      <div class="flex gap-x-2">
        <Button @click="route.meta.action === 'new' ? save(false) : save()">
          Сохранить
        </Button>

        <Button @click="save(true)" v-if="(appStore.item && !appStore.item.publishedAt) || !appStore.item">
          Опубликовать
        </Button>

        <Button @click="save(false)" v-if="appStore.item && appStore.item.publishedAt">
          Снять с публикации
        </Button>
      </div>

      <div>
        <Button @click="back"
          :secondary="true"
        >
          Отмена
        </Button>
      </div>
    </div>
  </div>

  <form class="flex flex-col gap-y-5 mx-3 py-5">
    <div v-for="row, rowIndex in grid[route.params.slug]" :key="rowIndex"
      class="flex"
    >
      <div v-for="cell, cellIndex in row" :key="cellIndex"
        class="px-3"
        :class="cell.width ? `w-${cell.width} shrink-0` : 'grow'"
      >
        <div v-if="Array.isArray(cell)" class="w-full flex flex-col gap-y-5">
          <div v-for="cCell, cCellIndex in cell" :key="cCellIndex"
            :class="cCell.width ? `w-${cCell.width}` : 'grow'"
            
          >
            <div v-if="Array.isArray(cCell)" class="flex -mx-3">
              <div v-for="ccCell, ccCellIndex in cCell" :key="ccCellIndex"
                :class="ccCell.width ? `w-${ccCell.width}` : 'grow'"
                class="px-3"
              >
                <div v-if="columns[ccCell.slug] && columns[ccCell.slug].type && columns[ccCell.slug].type === 'string'">
                  <Field :label="t(`models.${route.params.slug}.fields.${ccCell.slug}`)">
                    <Input v-model="fields[ccCell.slug]" />
                  </Field>
                </div>

                <div v-if="columns[ccCell.slug] && columns[ccCell.slug].type && (columns[ccCell.slug].type === 'decimal' || columns[ccCell.slug].type === 'integer')">
                  <Field :label="t(`models.${route.params.slug}.fields.${ccCell.slug}`)">
                    <Input v-model="fields[ccCell.slug]" />
                  </Field>
                </div>

                <div v-if="columns[ccCell.slug] && columns[ccCell.slug].type && columns[ccCell.slug].type === 'string'">
                  <Field :label="t(`models.${route.params.slug}.fields.${ccCell.slug}`)">
                    <Input v-model="fields[ccCell.slug]" />
                  </Field>
                </div>

                <div v-if="columns[ccCell.slug] && columns[ccCell.slug].type && (columns[ccCell.slug].type === 'decimal' || columns[ccCell.slug].type === 'integer')">
                  <Field :label="t(`models.${route.params.slug}.fields.${ccCell.slug}`)">
                    <Input v-model="fields[ccCell.slug]" />
                  </Field>
                </div>

                <div v-if="columns[ccCell.slug] && columns[ccCell.slug].type && columns[ccCell.slug].type === 'richtext'">
                  <Field :label="t(`models.${route.params.slug}.fields.${ccCell.slug}`)">
                    <Editor v-model="fields[ccCell.slug]" />
                  </Field>
                </div>

                <div v-if="columns[ccCell.slug] && columns[ccCell.slug].type && columns[ccCell.slug].type === 'media'">
                  <Field :label="t(`models.${route.params.slug}.fields.${ccCell.slug}`)">
                    <ImageUploader v-model="attachments[ccCell.slug]" class="w-40" />
                  </Field>
                </div>

                <div v-if="columns[ccCell.slug] && columns[ccCell.slug].type && columns[ccCell.slug].relation === 'manyToOne'">
                  <Field :label="t(`models.${route.params.slug}.fields.${ccCell.slug}`)">
                    <Select :options="relatedItems[ccCell.slug]" v-model="fields[ccCell.slug]" />
                  </Field>
                </div>

                <div v-if="columns[ccCell.slug] && columns[ccCell.slug].type && columns[ccCell.slug].type === 'enumeration'">
                  <Field :label="t(`models.${route.params.slug}.fields.${ccCell.slug}`)">
                    <!-- <Select :options="relatedItems[cell.slug]" v-model="fields[cell.slug]" /> -->
                  </Field>
                </div>
              </div>
            </div>







            <div v-if="columns[cCell.slug] && columns[cCell.slug].type === 'string'">
              <Field :label="t(`models.${route.params.slug}.fields.${cCell.slug}`)">
                <Input v-model="fields[cCell.slug]" />
              </Field>
            </div>

            <div v-if="columns[cCell.slug] && (columns[cCell.slug].type === 'decimal' || columns[cCell.slug].type === 'integer')">
              <Field :label="t(`models.${route.params.slug}.fields.${cCell.slug}`)">
                <Input v-model="fields[cCell.slug]" />
              </Field>
            </div>

            <div v-if="columns[cCell.slug] && columns[cCell.slug].type === 'richtext'">
              <Field :label="t(`models.${route.params.slug}.fields.${cCell.slug}`)">
                <Editor v-model="fields[cCell.slug]" />
              </Field>
            </div>

            <div v-if="columns[cCell.slug] && columns[cCell.slug].type === 'media'">
              <Field :label="t(`models.${route.params.slug}.fields.${cCell.slug}`)">
                <ImageUploader v-model="attachments[cCell.slug]" class="w-40" />
              </Field>
            </div>

            <div v-if="columns[cCell.slug] && columns[cCell.slug].relation === 'manyToOne'">
              <Field :label="t(`models.${route.params.slug}.fields.${cCell.slug}`)">
                <Select :options="relatedItems[cCell.slug]" v-model="fields[cCell.slug]" />
              </Field>
            </div>

            <div v-if="columns[cCell.slug] && columns[cCell.slug].type === 'enumeration'">
              <Field :label="t(`models.${route.params.slug}.fields.${cCell.slug}`)">
                <Select :options="enumerations[cCell.slug]" v-model="fields[cCell.slug]" />
              </Field>
            </div>
          </div>
        </div>
        




        <div v-if="columns[cell.slug] && columns[cell.slug].type === 'string'">
          <Field :label="t(`models.${route.params.slug}.fields.${cell.slug}`)">
            <Input v-model="fields[cell.slug]" />
          </Field>
        </div>

        <div v-if="columns[cell.slug] && (columns[cell.slug].type === 'decimal' || columns[cell.slug].type === 'integer')">
          <Field :label="t(`models.${route.params.slug}.fields.${cell.slug}`)">
            <Input v-model="fields[cell.slug]" />
          </Field>
        </div>

        <div v-if="columns[cell.slug] && columns[cell.slug].type === 'richtext'">
          <Field :label="t(`models.${route.params.slug}.fields.${cell.slug}`)">
            <Editor v-model="fields[cell.slug]" />
          </Field>
        </div>

        <div v-if="columns[cell.slug] && columns[cell.slug].type === 'media'">
          <Field :label="t(`models.${route.params.slug}.fields.${cell.slug}`)">
            <ImageUploader v-model="attachments[cell.slug]" class="w-40" />
          </Field>
        </div>

        <div v-if="columns[cell.slug] && columns[cell.slug].relation === 'manyToOne'">
          <Field :label="t(`models.${route.params.slug}.fields.${cell.slug}`)">
            <Select :options="relatedItems[cell.slug]" v-model="fields[cell.slug]" />
          </Field>
        </div>

        <div v-if="columns[cell.slug] && columns[cell.slug].type === 'enumeration'">
          <Field :label="t(`models.${route.params.slug}.fields.${cell.slug}`)">
            <Select :options="enumerations[cell.slug]" v-model="fields[cell.slug]" />
          </Field>
        </div>
      </div>
    </div>
  </form>

  <div class="px-6 mt-10" v-if="route.meta.action === 'edit'">
    <button class="text-sm bg-red-100 text-red-500 font-medium py-2 px-3 rounded shadow-sm"
      @click="remove"
    >
      Удалить
    </button>
  </div>
</div>
</template>