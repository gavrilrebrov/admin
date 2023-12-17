<script setup>
import { ref, watch, defineEmits, onMounted } from 'vue'
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import ExtensionTable from '@tiptap/extension-table'
import ExtensionTableRow from '@tiptap/extension-table-row'
import ExtensionTableCell from '@tiptap/extension-table-cell'
import ExtensionTableHeader from '@tiptap/extension-table-header'

import Icon from './icon.vue'
import Button from './button.vue'

const props = defineProps(['modelValue', 'type'])
const emit = defineEmits(['update:modelValue'])

const editor = useEditor({
  content: props.modelValue,
  extensions: [
    StarterKit,
    ExtensionTable.configure({
        resizable: true,
    }),
    ExtensionTableRow,
    ExtensionTableCell,
    ExtensionTableHeader
  ],
  onUpdate: ({ editor }) => {
    emit('update:modelValue', editor.getHTML())
  },
  editorProps: {
    attributes: {
      class: 'max-w-full h-96 overflow-y-auto rounded-md w-full px-3 focus:bg-slate-200 focus:outline-none text-sm transition bg-slate-100 prose'
    }
  }
})

watch(() => props.modelValue, value => {
  const isSame = editor.value.getHTML() === value

  if (isSame) return

  editor.value.commands.setContent(value, false)
})
</script>

<template>
<div class="flex flex-col gap-y-2 w-full" v-if="editor">
  <div class="flex gap-x-4">
    <div class="flex rounded overflow-hidden h-9">
      <Button
        :secondary="!editor.isActive('bold')" class="w-9 h-9 flex items-center justify-center rounded-none shadow-none"
        @click="editor.chain().focus().toggleBold().run()"
      >
        <Icon icon="bold" class="w-5 shrink-0" />
      </Button>

      <Button
        :secondary="!editor.isActive('italic')" class="w-9 h-9 flex items-center justify-center rounded-none shadow-none"
        @click="editor.chain().focus().toggleItalic().run()"
      >
        <Icon icon="italic" class="w-5 shrink-0" />
      </Button>

      <Button
        :secondary="!editor.isActive('strike')" class="w-9 h-9 flex items-center justify-center rounded-none shadow-none"
        @click="editor.chain().focus().toggleStrike().run()"
      >
        <Icon icon="strike" class="w-5 shrink-0" />
      </Button>

      <Button
        :secondary="!editor.isActive('code')" class="w-9 h-9 flex items-center justify-center rounded-none shadow-none"
        @click="editor.chain().focus().toggleCode().run()"
      >
        <Icon icon="code" class="w-5 shrink-0" />
      </Button>
    </div>

    <div class="flex rounded overflow-hidden h-9">
      <Button
        :secondary="!editor.isActive('paragraph')" class="w-9 h-9 flex items-center justify-center rounded-none shadow-none"
        @click="editor.chain().focus().setParagraph().run()"
      >
        <Icon icon="paragraph" class="w-5 shrink-0" />
      </Button>

      <Button
        :secondary="!editor.isActive('heading', { level: 1 })"
        class="w-9 h-9 flex items-center justify-center rounded-none shadow-none"
        @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
      >
        <Icon icon="h1" class="w-5 shrink-0" />
      </Button>

      <Button
        :secondary="!editor.isActive('heading', { level: 2 })" class="w-9 h-9 flex items-center justify-center rounded-none shadow-none"
        @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
      >
        <Icon icon="h2" class="w-5 shrink-0" />
      </Button>

      <Button
        :secondary="!editor.isActive('heading', { level: 3 })" class="w-9 h-9 flex items-center justify-center rounded-none shadow-none"
        @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
      >
        <Icon icon="h3" class="w-5 shrink-0" />
      </Button>

      <Button
        :secondary="!editor.isActive('codeBlock')" class="w-9 h-9 flex items-center justify-center rounded-none shadow-none"
        @click="editor.chain().focus().toggleCodeBlock().run()"
      >
        <Icon icon="terminal" class="w-5 shrink-0" />
      </Button>
    </div>

    <div class="flex rounded overflow-hidden h-9">
      <Button
        :secondary="!editor.isActive('bulletList')" class="w-9 h-9 flex items-center justify-center rounded-none shadow-none"
        @click="editor.chain().focus().toggleBulletList().run()"
      >
        <Icon icon="list-ul" class="w-5 shrink-0" />
      </Button>

      <Button
        :secondary="!editor.isActive('orderedList')" class="w-9 h-9 flex items-center justify-center rounded-none shadow-none"
        @click="editor.chain().focus().toggleOrderedList().run()"
      >
        <Icon icon="list-ol" class="w-5 shrink-0" />
      </Button>

      <Button
        :secondary="!editor.isActive('blockquote')" class="w-9 h-9 flex items-center justify-center rounded-none shadow-none"
        @click="editor.chain().focus().toggleBlockquote().run()"
      >
        <Icon icon="blockquote" class="w-5 shrink-0" />
      </Button>
    </div>
  </div>

  <div class="flex gap-x-4">
    <div class="flex rounded overflow-hidden h-9">
      <Button
        :secondary="true" class="w-9 h-9 flex items-center justify-center rounded-none shadow-none"
        @click="editor.chain().focus().undo().run()"
      >
        <Icon icon="undo" class="w-5 shrink-0" />
      </Button>

      <Button
        :secondary="true" class="w-9 h-9 flex items-center justify-center rounded-none shadow-none"
        @click="editor.chain().focus().redo().run()"
      >
        <Icon icon="redo" class="w-5 shrink-0" />
      </Button>
    </div>

    <div class="flex rounded overflow-hidden h-9">
      <Button
        :secondary="true" class="w-9 h-9 flex items-center justify-center rounded-none shadow-none"
        @click="editor.chain().focus().insertTable({ rows: 2, cols: 3 }).run()"
      >
        <Icon icon="add-table" class="w-5 shrink-0" />
      </Button>

      <Button
        :secondary="true" class="w-9 h-9 flex items-center justify-center rounded-none shadow-none"
        @click="editor.chain().focus().deleteTable().run()"
        v-if="editor.can().deleteTable()"
      >
        <Icon icon="delete-table" class="w-5 shrink-0" />
      </Button>

      <Button
        :secondary="true" class="w-9 h-9 flex items-center justify-center rounded-none shadow-none"
        @click="editor.chain().focus().addRowBefore().run()"
        v-if="editor.can().addRowBefore()"
      >
        <Icon icon="add-row" class="w-5 shrink-0" />
      </Button>

      <Button
        :secondary="true" class="w-9 h-9 flex items-center justify-center rounded-none shadow-none"
        @click="editor.chain().focus().addColumnBefore().run()"
        v-if="editor.can().addColumnBefore()"
      >
        <Icon icon="add-col" class="w-5 shrink-0" />
      </Button>

      <Button
        :secondary="true" class="w-9 h-9 flex items-center justify-center rounded-none shadow-none"
        @click="editor.chain().focus().deleteRow().run()"
        v-if="editor.can().deleteRow()"
      >
        <Icon icon="delete-row" class="w-5 shrink-0" />
      </Button>

      <Button
        :secondary="true" class="w-9 h-9 flex items-center justify-center rounded-none shadow-none"
        @click="editor.chain().focus().deleteColumn().run()"
        v-if="editor.can().deleteColumn()"
      >
        <Icon icon="delete-col" class="w-5 shrink-0" />
      </Button>
    </div>
  </div>

  <EditorContent :editor="editor" />
</div>
</template>

<style>
.ProseMirror {
    margin: 0;
    box-sizing: border-box;
    padding: 14px;
}

.ProseMirror > * + * {
    margin-top: 0.75em;
}

.ProseMirror ul, .ProseMirror ol {
    padding: 0 1rem;
}

.ProseMirror h1,
.ProseMirror h2,
.ProseMirror h3 {
    line-height: 1.1;
}

.ProseMirror code {
    background-color: rgba(#616161, 0.1);
    color: #616161;
}

.ProseMirror pre {
    background: #0D0D0D;
    color: #FFF;
    font-family: monospace;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;
}

.ProseMirror pre code {
    color: inherit;
    padding: 0;
    background: none;
    font-size: 0.8rem;
}

.ProseMirror img {
    max-width: 100%;
    height: auto;
}

.ProseMirror blockquote {
    padding-left: 1rem;
    border-left: 2px solid rgba(#0D0D0D, 0.1);
}

.ProseMirror hr {
    border: none;
    border-top: 2px solid rgba(#0D0D0D, 0.1);
    margin: 2rem 0;
}

.ProseMirror table {
    border-collapse: collapse;
    table-layout: fixed;
    width: 100%;
    margin: 0;
    overflow: hidden;
}

.ProseMirror table td,
.ProseMirror table th {
    min-width: 1em;
    border: 2px solid #ced4da;
    padding: 3px 5px;
    vertical-align: top;
    box-sizing: border-box;
    position: relative;
}

.ProseMirror table td > *,
.ProseMirror table th > * {
    margin-bottom: 0;
}

.ProseMirror table th {
    font-weight: bold;
    text-align: left;
    background-color: #f1f3f5;
}

.ProseMirror table .selectedCell:after {
    z-index: 2;
    position: absolute;
    content: "";
    left: 0; right: 0; top: 0; bottom: 0;
    background: rgba(200, 200, 255, 0.4);
    pointer-events: none;
}

.ProseMirror table .column-resize-handle {
    position: absolute;
    right: -2px;
    top: 0;
    bottom: -2px;
    width: 4px;
    background-color: #adf;
    pointer-events: none;
}

.ProseMirror table p {
    margin: 0;
}

.tableWrapper {
  overflow-x: auto;
}

.resize-cursor {
  cursor: ew-resize;
  cursor: col-resize;
}
</style>