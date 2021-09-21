<script setup>
import { ref, watch, defineEmits, onMounted } from 'vue'
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Icon from '../Icon.vue'

const props = defineProps(['modelValue', 'type'])
const emit = defineEmits(['update:modelValue'])

const editor = useEditor({
    content: props.modelValue,
    extensions: [
        StarterKit
    ],
    onUpdate: ({ editor }) => {
        emit('update:modelValue', editor.getHTML())
    },
    editorProps: {
        attributes: {
            class: 'prose max-w-full h-96 overflow-hidden border border-gray-300 rounded-md w-full p-3 focus:ring-blue-500 focus:border-blue-500 focus:ring-1 focus:outline-none'
        }
    }
})

watch(() => props.modelValue, value => {
    editor.value.commands.setContent(value)
})
</script>

<template>
<div class="flex flex-col gap-y-3" v-if="editor">
    <div class="flex gap-x-3">
        <div class="rounded-md overflow-hidden">
            <button class="p-2"
                @click="editor.chain().focus().toggleBold().run()"
                :class="{
                    'bg-blue-500 text-white': editor.isActive('bold'),
                    'bg-blue-100 text-blue-500': !editor.isActive('bold')
                }"
            >
                <Icon icon="bold" class="w-6" />
            </button>

            <button class="p-2"
                @click="editor.chain().focus().toggleItalic().run()"
                :class="{
                    'bg-blue-500 text-white': editor.isActive('italic'),
                    'bg-blue-100 text-blue-500': !editor.isActive('italic')
                }"
            >
                <Icon icon="italic" class="w-6" />
            </button>

            <button class="p-2"
                @click="editor.chain().focus().toggleStrike().run()"
                :class="{
                    'bg-blue-500 text-white': editor.isActive('strike'),
                    'bg-blue-100 text-blue-500': !editor.isActive('strike')
                }"
            >
                <Icon icon="strike" class="w-6" />
            </button>

            <!-- <button class="p-2"
                @click="editor.chain().focus().toggleUnderline().run()"
                :class="{
                    'bg-blue-500 text-white': editor.isActive('underline'),
                    'bg-blue-100 text-blue-500': !editor.isActive('underline')
                }"
            >
                <Icon icon="underline" class="w-6" />
            </button> -->

            <button class="p-2"
                @click="editor.chain().focus().toggleCode().run()"
                :class="{
                    'bg-blue-500 text-white': editor.isActive('code'),
                    'bg-blue-100 text-blue-500': !editor.isActive('code')
                }"
            >
                <Icon icon="code" class="w-6" />
            </button>
        </div>

        <div class="rounded-md overflow-hidden">
            <button class="p-2"
                @click="editor.chain().focus().setParagraph().run()"
                :class="{
                    'bg-blue-500 text-white': editor.isActive('paragraph'),
                    'bg-blue-100 text-blue-500': !editor.isActive('paragraph')
                }"
            >
                <Icon icon="paragraph" class="w-6" />
            </button>

            <button class="p-2"
                @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
                :class="{
                    'bg-blue-500 text-white': editor.isActive('heading', { level: 1 }),
                    'bg-blue-100 text-blue-500': !editor.isActive('heading', { level: 1 })
                }"
            >
                <Icon icon="h1" class="w-6" />
            </button>

            <button class="p-2"
                @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
                :class="{
                    'bg-blue-500 text-white': editor.isActive('heading', { level: 2 }),
                    'bg-blue-100 text-blue-500': !editor.isActive('heading', { level: 2 })
                }"
            >
                <Icon icon="h2" class="w-6" />
            </button>

            <button class="p-2"
                @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
                :class="{
                    'bg-blue-500 text-white': editor.isActive('heading', { level: 3 }),
                    'bg-blue-100 text-blue-500': !editor.isActive('heading', { level: 3 })
                }"
            >
                <Icon icon="h3" class="w-6" />
            </button>

            <button class="p-2"
                @click="editor.chain().focus().toggleCodeBlock().run()"
                :class="{
                    'bg-blue-500 text-white': editor.isActive('codeBlock'),
                    'bg-blue-100 text-blue-500': !editor.isActive('codeBlock')
                }"
            >
                <Icon icon="terminal" class="w-6" />
            </button>
        </div>

        <div class="rounded-md overflow-hidden">
            <button class="p-2"
                @click="editor.chain().focus().toggleBulletList().run()"
                :class="{
                    'bg-blue-500 text-white': editor.isActive('bulletList'),
                    'bg-blue-100 text-blue-500': !editor.isActive('bulletList')
                }"
            >
                <Icon icon="list-ul" class="w-6" />
            </button>

            <button class="p-2"
                @click="editor.chain().focus().toggleOrderedList().run()"
                :class="{
                    'bg-blue-500 text-white': editor.isActive('orderedList'),
                    'bg-blue-100 text-blue-500': !editor.isActive('orderedList')
                }"
            >
                <Icon icon="list-ol" class="w-6" />
            </button>

            <button class="p-2"
                @click="editor.chain().focus().toggleBlockquote().run()"
                :class="{
                    'bg-blue-500 text-white': editor.isActive('blockquote'),
                    'bg-blue-100 text-blue-500': !editor.isActive('blockquote')
                }"
            >
                <Icon icon="blockquote" class="w-6" />
            </button>
        </div>

        <div class="rounded-md overflow-hidden">
            <button class="p-2 bg-blue-100 text-blue-500"
                @click="editor.chain().focus().setHorizontalRule().run()"
            >
                <Icon icon="minus" class="w-6" />
            </button>

            <button class="p-2 bg-blue-100 text-blue-500"
                @click="editor.chain().focus().undo().run()"
            >
                <Icon icon="undo" class="w-6" />
            </button>

            <button class="p-2 bg-blue-100 text-blue-500"
                @click="editor.chain().focus().redo().run()"
            >
                <Icon icon="redo" class="w-6" />
            </button>
        </div>


    </div>

    <EditorContent :editor="editor" />
</div>
</template>
