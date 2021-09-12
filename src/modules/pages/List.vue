<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import Icon from '../../components/Icon.vue'

const store = useStore()

const pages = computed(() => store.getters['pages/list'])
</script>

<template>
<div class="p-5 container mx-auto lg:max-w-screen-lg">
    <div class="bg-white rounded-md shadow">
        <div class=""
            v-for="item in pages"
            :key="item.id"
        >
            <div class="flex items-center px-5 py-4 border-b justify-between">
                <div class="font-medium">
                    {{ item.name }}
                </div>

                <router-link :to="`/pages/${item.id}`">
                    <Icon icon="pencil" class="w-5 text-blue-500" />
                </router-link>
            </div>

            <div class="pl-5">
                <div class="pt-3"
                    v-for="child in item.pages"
                    :key="child.id"
                >
                    <div class="flex items-center pt-0 px-5 py-4 justify-between">
                        <div class="font-medium">
                            {{ child.name }}
                        </div>

                        <router-link :to="`/pages/${child.id}`">
                            <Icon icon="pencil" class="w-5 text-blue-500" />
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>
