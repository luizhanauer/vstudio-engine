<script setup>
import { svgConfig } from '../../domain/entities/SvgConfig';
import { executeSvgDownload } from '../../application/useCases/DownloadSvgFile';

function handleDownload() {
  const svgElement = document.getElementById('profile-svg-header');
  executeSvgDownload(svgElement, 'clean-profile-header.svg');
}
</script>

<template>
  <aside class="w-80 bg-white border-r border-gray-200 p-6 flex flex-col gap-6 shadow-xl z-10 h-full overflow-y-auto">
    <h1 class="text-2xl font-bold text-gray-800 tracking-tight">Setup Header</h1>
    
    <div class="flex flex-col gap-4">
      <div class="flex flex-col gap-1">
        <label class="text-xs font-semibold text-gray-500 uppercase">Nome do Perfil</label>
        <input v-model="svgConfig.identity.name" class="p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-400 outline-none" />
      </div>

      <div class="flex flex-col gap-1">
        <label class="text-xs font-semibold text-gray-500 uppercase">Cargo / Role</label>
        <input v-model="svgConfig.identity.role" class="p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-400 outline-none" />
      </div>

      <div class="flex flex-col gap-1">
        <label class="text-xs font-semibold text-gray-500 uppercase">Efeito Visual</label>
        <select v-model="svgConfig.settings.effectType" class="p-2 rounded-lg border border-gray-300 bg-white outline-none">
          <option value="waving">Waving Ocean</option>
          <option value="particles">Floating Particles</option>
          <option value="matrix">Matrix Rain</option>
        </select>
      </div>

      <div class="flex flex-col gap-1">
        <label class="text-xs font-semibold text-gray-500 uppercase">Velocidade: {{ svgConfig.settings.animationSpeed }}s</label>
        <input type="range" min="2" max="30" v-model.number="svgConfig.settings.animationSpeed" class="accent-green-500" />
      </div>

      <div class="flex flex-col gap-1" v-if="svgConfig.settings.effectType !== 'waving'">
        <label class="text-xs font-semibold text-gray-500 uppercase">Densidade: {{ svgConfig.settings.density }}</label>
        <input type="range" min="10" max="150" v-model.number="svgConfig.settings.density" class="accent-green-500" />
      </div>

      <div class="flex flex-col gap-1">
        <label class="text-xs font-semibold text-gray-500 uppercase">Cor Principal</label>
        <input type="color" v-model="svgConfig.theme.primary" class="w-full h-10 border-0 rounded cursor-pointer" />
      </div>
    </div>

    <button 
      @click="handleDownload" 
      class="mt-auto bg-gray-900 text-white py-3 rounded-xl font-bold hover:bg-black transition-colors"
    >
      Download SVG
    </button>
  </aside>
</template>