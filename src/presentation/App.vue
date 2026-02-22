<script setup lang="ts">
import { ref, watchEffect, nextTick, onMounted } from 'vue';
import { useEngineStore } from '../application/store/useEngineStore';
import { executeSvgDownload } from '../application/useCases/DownloadSvgFile';
import { executePngDownload } from '../application/useCases/DownloadPngFile';
import type { TableElement } from '../domain/entities/VStudioTypes';

import ControlPanel from './components/ControlPanel.vue';
import SvgCanvas from './components/SvgCanvas.vue';
import CodeEditor from './components/CodeEditor.vue';
import TableEditorModal from './components/TableEditorModal.vue';

// 1. Store
const { state, addTextElement, removeTextElement, addTable, removeTable, getShareableUrl, loadFromUrl } = useEngineStore();

// 2. Local State
const rawSvgCode = ref('');
const isManualEditMode = ref(false);
const isEditorOpen = ref(false);

const isTableModalOpen = ref(false);
const editingTable = ref<TableElement | null>(null);

// 3. Lifecycle
onMounted(() => {
  const loaded = loadFromUrl();
  if (loaded) console.log("Configuração importada da URL.");
});

// 4. Methods
const formatXml = (xml: string): string => {
  let formatted = '';
  let pad = 0;
  xml.split(/>\s*</).forEach((node: string) => {
    if (node.match(/^\/\w/)) pad -= 1;
    formatted += '  '.repeat(pad) + '<' + node + '>\r\n';
    if (node.match(/^<?\w[^>]*[^\/]$/)) pad += 1;
  });
  return formatted.substring(1, formatted.length - 2);
};

// Sincroniza SVG para o Code Editor
watchEffect(() => {
  if (!isManualEditMode.value) {
    nextTick(() => {
      const svgElement = document.getElementById('profile-svg-header') as SVGSVGElement | null;
      if (svgElement) rawSvgCode.value = formatXml(svgElement.outerHTML);
    });
  }
});

const triggerDownload = (format: 'svg' | 'png') => {
  const svgElement = document.getElementById('profile-svg-header') as SVGSVGElement | null;
  if (format === 'svg') {
    executeSvgDownload(svgElement, 'vstudio-render.svg');
  } else {
    executePngDownload(svgElement, 'vstudio-render.png', state.canvas.width, state.canvas.height);
  }
};

const copyShareLink = async () => {
  const url = getShareableUrl();
  try {
    await navigator.clipboard.writeText(url);
    alert('Link de compartilhamento copiado! Envie para outros devs.');
  } catch (err) {
    console.error('Falha ao copiar:', err);
  }
};

const openTableEditor = (id: string) => {
  const table = state.tables.find(t => t.id === id);
  if (table) {
    editingTable.value = table;
    isTableModalOpen.value = true;
  }
};
</script>

<template>
  <div class="flex h-screen w-full bg-[#0B1120] font-sans text-gray-100 overflow-hidden selection:bg-blue-500/30 relative">
    
    <TableEditorModal 
      :is-open="isTableModalOpen" 
      :table="editingTable" 
      @close="isTableModalOpen = false" 
    />

    <aside class="w-96 bg-[#0F172A] border-r border-blue-900/50 flex flex-col shadow-[10px_0_30px_rgba(0,0,0,0.5)] z-20">
      
      <div class="p-5 border-b border-blue-900/50 bg-gradient-to-b from-blue-900/20 to-transparent flex justify-between items-center">
        <div>
          <h1 class="text-xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
            VStudio Engine
          </h1>
          <p class="text-[10px] text-blue-300/60 mt-0.5 font-mono">v1.1.0 | Architect Mode</p>
        </div>
        <button @click="copyShareLink" class="bg-blue-600/20 hover:bg-blue-600 border border-blue-500/50 text-blue-300 hover:text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 shadow-[0_0_10px_rgba(37,99,235,0.2)]" title="Gerar URL compartilhável">
          <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
          Share
        </button>
      </div>
      
      <div class="flex-1 overflow-y-auto p-5 custom-scrollbar">
        <ControlPanel 
          :config="state" 
          @add-element="addTextElement" 
          @remove-element="removeTextElement"
          @add-table="addTable"
          @remove-table="removeTable"
          @edit-table="openTableEditor"
        />
      </div>

      <div class="p-5 border-t border-blue-900/50 bg-[#0F172A] flex gap-3">
        <button @click="triggerDownload('svg')" class="flex-1 bg-blue-600/20 border border-blue-500 hover:bg-blue-600 text-blue-300 hover:text-white py-2.5 rounded-lg font-bold transition-all flex justify-center items-center gap-2 text-sm shadow-[0_0_10px_rgba(37,99,235,0.15)]">
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
          Baixar SVG
        </button>
        <button @click="triggerDownload('png')" class="flex-1 bg-purple-600 hover:bg-purple-500 text-white py-2.5 rounded-lg font-bold transition-all shadow-[0_0_15px_rgba(147,51,234,0.4)] hover:shadow-[0_0_25px_rgba(147,51,234,0.6)] flex justify-center items-center gap-2 text-sm">
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
          Baixar PNG
        </button>
      </div>
    </aside>

    <main class="flex-1 flex flex-col min-w-0 relative bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-[#0B1120] to-[#0B1120]">
      
      <section class="flex-1 p-8 overflow-hidden relative flex items-center justify-center transition-all duration-300">
        <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PHBhdGggZD0iTTAgMGg0MHY0MEgweiIgZmlsbD0ibm9uZSIvPPHBhdGggZD0iTTAgNDBoNDBNNDAgMHY0MCIgc3Ryb2tlPSJyZ2JhKDQ1LCA2NSwgMTMwLCAwLjE1KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9zdmc+')] pointer-events-none"></div>
        
        <div class="w-full max-w-5xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-lg overflow-hidden ring-1 ring-white/10 bg-black relative z-10 transition-transform duration-500 flex items-center justify-center"
             :style="{ aspectRatio: `${state.canvas.width} / ${state.canvas.height}` }">
          <SvgCanvas />
        </div>
      </section>

      <div class="absolute bottom-4 right-4 z-30 transition-all duration-300" :class="{ 'bottom-[42%]': isEditorOpen }">
        <button @click="isEditorOpen = !isEditorOpen" class="bg-slate-800 hover:bg-slate-700 border border-blue-500/30 text-blue-300 px-4 py-2 rounded-full shadow-[0_0_10px_rgba(0,0,0,0.5)] flex items-center gap-2 text-sm font-bold font-mono transition-all backdrop-blur-md">
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path v-if="!isEditorOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
          {{ isEditorOpen ? 'Hide Source Code' : 'View Source Code' }}
        </button>
      </div>

      <section class="border-t border-blue-900/50 flex flex-col relative transition-all duration-300 ease-in-out bg-[#0F172A] z-20"
               :class="isEditorOpen ? 'h-[40%] opacity-100 translate-y-0' : 'h-0 opacity-0 translate-y-full border-t-0 overflow-hidden'">
        <div v-if="isManualEditMode" class="absolute top-12 right-6 z-20 bg-yellow-500/10 border border-yellow-500/50 text-yellow-500 text-xs px-3 py-1.5 rounded flex items-center gap-2 backdrop-blur-md">
          <span>Modo de Edição Manual Ativo</span>
          <button @click="isManualEditMode = false" class="underline hover:text-yellow-400 font-bold">Sincronizar com UI</button>
        </div>
        <CodeEditor v-model="rawSvgCode" @manual-edit="isManualEditMode = true" />
      </section>

    </main>
  </div>
</template>

<style>
/* Manutenção das Scrollbars Globais para manter estética premium */
.custom-scrollbar::-webkit-scrollbar { width: 6px; height: 6px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 10px; }
.custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #334155; }
</style>