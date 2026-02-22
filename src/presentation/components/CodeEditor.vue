<script setup lang="ts">
import { shallowRef, watch } from 'vue';
import { Codemirror } from 'vue-codemirror';
import { html } from '@codemirror/lang-html';
import { oneDark } from '@codemirror/theme-one-dark';

const props = defineProps<{ modelValue: string; }>();
const emit = defineEmits<{ (e: 'update:modelValue', value: string): void; (e: 'manual-edit'): void; }>();

const extensions = [html(), oneDark];
const localCode = shallowRef(props.modelValue);

watch(() => props.modelValue, (newVal) => { if (newVal !== localCode.value) localCode.value = newVal; });

const handleInput = (value: string) => {
  localCode.value = value;
  emit('update:modelValue', value);
  emit('manual-edit');
};
</script>

<template>
  <div class="h-full w-full flex flex-col bg-[#282c34] font-mono text-sm relative">
    <header class="flex items-center justify-between px-4 py-2 bg-[#21252b] border-b border-gray-800 text-gray-400 text-xs select-none">
      <div class="flex items-center gap-2"><span class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span><span>vstudio-output.svg</span></div>
    </header>
    <div class="flex-1 overflow-auto custom-scrollbar">
      <Codemirror v-model="localCode" :style="{ height: '100%', outline: 'none' }" :autofocus="false" :indent-with-tab="true" :tab-size="2" :extensions="extensions" @change="handleInput" />
    </div>
  </div>
</template>

<style scoped>
:deep(.cm-editor) { outline: none !important; height: 100%; }
:deep(.cm-scroller) { font-family: 'JetBrains Mono', 'Fira Code', monospace; font-size: 13px; line-height: 1.6; }
</style>