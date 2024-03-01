<template>
  <div>
    <div class="flex">
      <button type="button" v-if="insertBtn"
        class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        @click="insertValue"> + Insert Value</button>
      <button type="button"
        class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        @click="insertDate"> + Insert Date</button>
    </div>
    <div class="mb-6 w-96">
      <input class="w-96 p-4 h-12 placeholder-gray-300 border-none rounded-md bg-gray-100" v-model="inputValue"
        @click="insertText" placeholder="Start Writing...">
    </div>

    <div class="w-96 flex" v-if="div1">
      <div class="flex items-center mb-4 m-3">
        <input id="default-radio-1" type="radio" value="" name="default-radio"
          class="w-4 h-4  bg-gray-100 border-gray-300 focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          v-model="radioValue">
        <label for="default-radio-1" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">%</label>
      </div>

      <div class="flex items-center mb-4 m-3" v-if="div2">
        <input id="default-radio-2" type="radio" value="" name="default-radio"
          class="w-4 h-4  bg-gray-100 border-gray-300 focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          v-model="radioValue">
        <label for="default-radio-2" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Custom</label>
      </div>
    </div>
    
    <EditorContent @click="startWritting" class="w-96 p-4 h-12 placeholder-gray-300 border-none rounded-md bg-gray-100"
      :editor="editor" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import StarterKit from '@tiptap/starter-kit';
import { Editor, EditorContent } from '@tiptap/vue-3';
import Placeholder from '@tiptap/extension-placeholder';
import { Node } from '@tiptap/core';
import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import { DateInputExtension } from '../DateInputExtension';

const editor = ref<Editor | null>(null);
const inputValue = ref('');
const radioValue = ref('');
const insertVal = ref();
const div1 = ref(false);
const div2 = ref(false);
const insertBtn = ref(true);
let firstClick = true;

const insertValue = () => {
  div1.value = true;
  div2.value = true;
  insertBtn.value = false;
  editor.value?.commands.insertContent('<span>Hello world</span>');
};

const startWritting = () => {
  editor.value?.setEditable(true)
  if (firstClick) {
    editor.value?.commands.insertContent('<div draggable="true" class="text-gray-500"> Example Text </div>');
    firstClick = false;
  }
}

const insertDate = () => {
  if (!editor.value) {
    console.error('Editor is not initialized');
    return;
  }

  const currentDate = new Date().toISOString().slice(0, 10);
  const dateInputHtml = `<input type="date" id="start" value="${currentDate}" min="2018-01-01"/>`;
  editor.value.commands.insertContent(dateInputHtml)
  //   {
  //   type: 'heading',
  //   html: dateInputHtml,
  // }
  // );
};

// Mounting the editor
onMounted(() => {
//   editor.value = new Editor({
//     //content: `<p>If you want to check the state, you can call <code>editor.isEditable()</code>.</p>`,
//     extensions: [
//       StarterKit,
//       Document,
//         Paragraph,
//         DateInputExtension,
//         Text, 
//       Placeholder.configure({ 
//         placeholder: 'Write something …',
//       }),
//     ],
//     editable: false,
//   });
  
 });

// Unmounting the editor
onBeforeUnmount(() => {
  // if (editor.value) {
  //   editor.value.destroy();
  //   editor.value = null;
  // }
});
</script>

<style lang="scss">
/* Basic editor styles */
.tiptap {
  >*+* {
    margin-top: 0.75em;
  }
}

/* Placeholder (at the top) */
.tiptap p.is-editor-empty:first-child::before {
  content: attr(data-placeholder);
  float: left;
  color: #adb5bd;
  pointer-events: none;
  height: 0;
}

/* Placeholder (on every new line) */
/* .tiptap p.is-empty::before {
  content: attr(data-placeholder);
  float: left;
  color: #adb5bd;
  pointer-events: none;
  height: 0;
} */
</style>









 


<script setup>
import Editor from '@tinymce/tinymce-vue'
</script>

<template>
  <main id="sample">
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />
    <Editor api-key="a225rl5i9vt1ra9ba25smymq9l9cygg2dypg1fb1b7wmn37q" :init="{
      selector: 'input',  // change this value according to your HTML
      plugins: 'insertdatetime',
      toolbar: 'insertdatetime',
      insertdatetime_dateformat: '%d-%m-%Y'
    }" />
  </main>
</template>

<style scoped>
.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  #sample {
    display: flex;
    flex-direction: column;
    place-items: center;
    width: 1000px;
  }
}
</style>