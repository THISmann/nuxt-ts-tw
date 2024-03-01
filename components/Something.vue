<template>
  <div class="container">
     <div class="w-full">
       <div class="w-2/5 grid justify-items-end">
         <div class="flex">
           <button type="button" v-if="insertBtn"
             class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:z-10 focus:ring-4 focus:ring-gray-100"
             @click="insertValue"> + Insert Value</button>
           <button type="button"
             class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:z-10 focus:ring-4 focus:ring-gray-100"
             @click="insertDate"> + Insert Date</button>
         </div>
       </div>
       <div class="w-2/5 p-2 h-12 placeholder-gray-300 border-none rounded-md bg-gray-50 draggable" @click="startWritting">
         <div class="flex flex-nowrap" @dragover.prevent @drop="handleDrop">
           <span class="mx-2 text-gray-400 draggable" v-if="showPlaceholder" draggable="true" @dragstart="handleDragStart">
             Start Writing ... </span>
           <input type="text" class="border-none text-gray-700 draggable" v-if="showText" v-model="textContent"
             draggable="true" @dragstart="handleDragStart" />
           <div v-if="showFillBlock" class="p-2 bg-white" draggable="true" @dragstart="handleDragStart">
             <input type="number" class="border-none text-gray-700 bg-gray-100 rounded-sm p-1 w-12 draggable"
               placeholder="fill" v-if="showText" v-model="fill" />
             <span v-if="showCustom"> % </span>
             <input type="text" class="border-none text-gray-700 w-4" v-if="showText && !showCustom"
               v-model="symbol" />
           </div>
           <input type="text" class="border-none text-gray-700 draggable w-8" v-if="showText" placeholder="..."
             draggable="true" @dragstart="handleDragStart" />
           <input type="date" name="" id="" v-if="showDate" class="draggable" draggable="true"
             @dragstart="handleDragStart">
         </div>
       </div>
     </div>
 
     <div class="w-full">
       <div class="w flex" v-if="showDefaultBox">
         <div class="flex items-center mb-4 m-3">
           <input id="default-radio-1" type="radio" value="" name="default-radio" @click="showDefaultSymbol"
             class="w-4 h-4 bg-gray-100 border-gray-300 focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
             v-model="radioValue">
           <label for="default-radio-1" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">% </label>
         </div>
 
         <div class="flex items-center mb-4 m-3" v-if="showCustomBox">
           <input id="default-radio-2" type="radio" value="" name="default-radio" @click="showCustomSymbol"
             class="w-4 h-4 bg-gray-100 border-gray-300 focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
             v-model="radioValue">
           <label for="default-radio-2" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Custom</label>
           <span class="m-3"> {{ symbol }} </span>
         </div>
       </div>
     </div>
  </div>
 </template>
 
 <script setup lang="ts">
 import { ref } from 'vue';
 
 const draggedElement = ref(null);
 
 const handleDragStart = (event) => {
  draggedElement.value = event.target;
 };
 
 const handleDrop = (event) => {
  event.preventDefault();
  if (draggedElement.value) {
     const dropTarget = event.target;
     const draggedElementParent = draggedElement.value.parentNode;
     const dropTargetParent = dropTarget.parentNode;
     const draggedElementIndex = Array.from(draggedElementParent.children).indexOf(draggedElement.value);
     const dropTargetIndex = Array.from(dropTargetParent.children).indexOf(dropTarget);
     draggedElementParent.insertBefore(draggedElement.value, dropTargetParent.children[dropTargetIndex]);
     dropTargetParent.insertBefore(dropTarget, draggedElementParent.children[draggedElementIndex]);
  }
 };
 
 const radioValue = ref('');
 const showDefaultBox = ref(false);
 const showCustomBox = ref(false);
 const insertBtn = ref(true);
 
 const insertValue = () => {
  showDefaultBox.value = true;
  showCustomBox.value = true;
  insertBtn.value = false;
  showFillBlock.value = true;
 };
 
 const showPlaceholder = ref(true);
 const showText = ref(false);
 const textContent = ref('we aim to use');
 const showFillBlock = ref(false);
 const fill = ref('fill');
 const symbol = ref('%');
 const showDate = ref(false);
 const showCustom = ref(true);
 const startWritting = () => {
  showPlaceholder.value = false;
  showText.value = true;
 };
 
 const insertDate = () => {
  showDate.value = true;
 };
 
 const showCustomSymbol = () => {
  showCustom.value = false;
 };
 
 const showDefaultSymbol = () => {
  showCustom.value = true;
 };
 </script>
 
 <style>
 .draggable {
  cursor: move;
 }
 </style>
 