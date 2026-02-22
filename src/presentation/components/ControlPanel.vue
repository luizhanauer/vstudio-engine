<script setup lang="ts">
import type { EngineConfiguration } from "../../domain/entities/VStudioTypes";

defineProps<{ config: EngineConfiguration }>();

const emit = defineEmits<{
  (e: "add-element"): void;
  (e: "remove-element", id: string): void;
  (e: "add-table"): void;
  (e: "remove-table", id: string): void;
  (e: "edit-table", id: string): void;
}>();
</script>

<template>
  <div class="flex flex-col gap-6 text-gray-200">
    <div
      class="bg-slate-900/80 backdrop-blur-md rounded-xl p-5 border border-blue-500/30 shadow-[0_4px_20px_rgba(0,100,255,0.15)] relative overflow-hidden"
    >
      <div
        class="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-50"
      ></div>
      <h3 class="text-sm font-bold text-blue-400 mb-4 flex items-center gap-2">
        <span
          class="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_#3b82f6]"
        ></span>
        Dimensões & Fundo
      </h3>
      <div class="grid grid-cols-2 gap-3 mb-4">
        <div>
          <label
            class="text-[10px] font-bold text-gray-400 uppercase tracking-wider"
            >Largura (px)</label
          >
          <input
            type="number"
            v-model.number="config.canvas.width"
            class="w-full mt-1 p-2 bg-slate-950 border border-slate-700 rounded-lg text-sm text-blue-300 focus:border-blue-500 outline-none transition-colors"
          />
        </div>
        <div>
          <label
            class="text-[10px] font-bold text-gray-400 uppercase tracking-wider"
            >Altura (px)</label
          >
          <input
            type="number"
            v-model.number="config.canvas.height"
            class="w-full mt-1 p-2 bg-slate-950 border border-slate-700 rounded-lg text-sm text-blue-300 focus:border-blue-500 outline-none transition-colors"
          />
        </div>
      </div>
      <div class="flex flex-col gap-1">
        <label
          class="text-[10px] font-bold text-gray-400 uppercase tracking-wider"
          >Cor de Fundo</label
        >
        <div class="flex gap-2 items-center mt-1">
          <input
            type="color"
            v-model="config.canvas.backgroundColor"
            class="w-10 h-10 rounded cursor-pointer border-0 p-0 bg-slate-950"
          />
          <input
            type="text"
            v-model="config.canvas.backgroundColor"
            class="flex-1 p-2 bg-slate-950 border border-slate-700 rounded-lg text-sm font-mono text-blue-300 outline-none uppercase"
          />
        </div>
      </div>
    </div>

    <div
      class="bg-slate-900/80 backdrop-blur-md rounded-xl p-5 border border-green-500/30 shadow-[0_4px_20px_rgba(34,197,94,0.15)] relative overflow-hidden"
    >
      <div
        class="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-green-400 to-transparent opacity-50"
      ></div>
      <h3 class="text-sm font-bold text-green-400 mb-4 flex items-center gap-2">
        <span
          class="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e]"
        ></span>
        Efeito Visual
      </h3>
      <div class="flex flex-col gap-4">
        <div>
          <label
            class="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1"
            >Tipo de Engine</label
          >
          <select
            v-model="config.effect.type"
            class="w-full p-2 bg-slate-950 border border-slate-700 rounded-lg text-sm text-green-300 outline-none"
          >
            <optgroup label="Orgânicos">
              <option value="waving">Waving Ocean</option>
              <option value="particles">Floating Particles</option>
            </optgroup>
            <optgroup label="Infraestrutura & Rede">
              <option value="nexus">Nexus Topology (BGP)</option>
              <option value="circuit">Circuit Flow (PCB)</option>
              <option value="cybergrid">Cyber Grid (3D)</option>
            </optgroup>
            <optgroup label="Dados & Lógica">
              <option value="activity">Activity Matrix (Git Graph)</option>
              <option value="pulse">Stream Pulse (Audio)</option>
              <option value="quantum">Quantum Orbits (Math)</option>
              <option value="matrix">Matrix Rain</option>
            </optgroup>
            <optgroup label="Minimalista">
              <option value="none">Clean (Nenhum Efeito)</option>
            </optgroup>
          </select>
        </div>
        <div
          v-if="
            config.effect.type !== 'none' && config.effect.type !== 'waving'
          "
        >
          <label
            class="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1"
            >Densidade ({{ config.effect.density }})</label
          >
          <input
            type="range"
            min="10"
            max="150"
            v-model.number="config.effect.density"
            class="w-full accent-green-500"
          />
        </div>
        <div v-if="config.effect.type !== 'none'">
          <label
            class="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1"
            >Cor do Efeito</label
          >
          <div class="flex gap-2 items-center">
            <input
              type="color"
              v-model="config.effect.primaryColor"
              class="w-10 h-10 rounded cursor-pointer border-0 p-0 bg-slate-950"
            />
            <input
              type="text"
              v-model="config.effect.primaryColor"
              class="flex-1 p-2 bg-slate-950 border border-slate-700 rounded-lg text-sm font-mono text-green-300 outline-none uppercase"
            />
          </div>
        </div>
      </div>
    </div>

    <div
      class="bg-slate-900/80 backdrop-blur-md rounded-xl p-5 border border-purple-500/30 shadow-[0_4px_20px_rgba(168,85,247,0.15)] relative overflow-hidden"
    >
      <div
        class="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent opacity-50"
      ></div>
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-sm font-bold text-purple-400 flex items-center gap-2">
          <span
            class="w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_8px_#a855f7]"
          ></span>
          Textos & Camadas
        </h3>
        <button
          @click="emit('add-element')"
          class="text-xs bg-purple-600/20 text-purple-300 hover:bg-purple-500 hover:text-white px-3 py-1 rounded-lg transition-colors border border-purple-500/30"
        >
          + Texto
        </button>
      </div>
      <div class="flex flex-col gap-3">
        <div
          v-for="element in config.elements"
          :key="element.id"
          class="bg-slate-950 p-3 rounded-lg border border-slate-700 relative group transition-all hover:border-purple-500/50"
        >
          <button
            @click="emit('remove-element', element.id)"
            class="absolute -top-2 -right-2 bg-red-500 text-white w-5 h-5 rounded-full text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
          >
            ×
          </button>
          <input
            type="text"
            v-model="element.content"
            class="w-full p-1 bg-transparent border-b border-slate-700 focus:border-purple-500 text-sm font-semibold outline-none mb-2 text-gray-100"
          />
          <div class="grid grid-cols-2 gap-2 mt-2">
            <div>
              <label class="text-[9px] text-gray-500 uppercase font-bold"
                >Tamanho (px)</label
              >
              <input
                type="number"
                v-model.number="element.fontSize"
                class="w-full p-1 text-sm bg-slate-900 border border-slate-700 rounded text-purple-200 outline-none"
              />
            </div>
            <div>
              <label class="text-[9px] text-gray-500 uppercase font-bold"
                >Posição Y (%)</label
              >
              <input
                type="number"
                v-model.number="element.yPosition"
                class="w-full p-1 text-sm bg-slate-900 border border-slate-700 rounded text-purple-200 outline-none"
              />
            </div>
          </div>
          <div class="mt-3 flex gap-2 items-center">
            <input
              type="color"
              v-model="element.colorHex"
              class="w-6 h-6 rounded cursor-pointer border-0 p-0 bg-transparent"
            />
            <span class="text-xs font-mono text-purple-300">{{
              element.colorHex.toUpperCase()
            }}</span>
            <select
              v-model="element.fontWeight"
              class="ml-auto text-xs bg-slate-900 border border-slate-700 rounded text-gray-300 p-1 outline-none"
            >
              <option value="normal">Normal</option>
              <option value="bold">Bold</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <div
      class="bg-slate-900/80 backdrop-blur-md rounded-xl p-5 border border-cyan-500/30 shadow-[0_4px_20px_rgba(6,182,212,0.15)] relative overflow-hidden"
    >
      <div
        class="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-50"
      ></div>

      <div class="flex justify-between items-center mb-4">
        <h3 class="text-sm font-bold text-cyan-400 flex items-center gap-2">
          <span
            class="w-2 h-2 rounded-full bg-cyan-500 shadow-[0_0_8px_#06b6d4]"
          ></span>
          Tabelas & Grades
        </h3>
        <button
          @click="emit('add-table')"
          class="text-xs bg-cyan-600/20 text-cyan-300 hover:bg-cyan-500 hover:text-white px-3 py-1 rounded-lg transition-colors border border-cyan-500/30"
        >
          + Tabela
        </button>
      </div>

      <div class="flex flex-col gap-3">
        <div
          v-if="config.tables.length === 0"
          class="text-xs text-slate-500 italic text-center py-2"
        >
          Nenhuma tabela adicionada.
        </div>

        <div
          v-for="table in config.tables"
          :key="table.id"
          class="bg-slate-950 p-3 rounded-lg border border-slate-700 flex justify-between items-center group hover:border-cyan-500/50 transition-colors"
        >
          <span class="text-sm text-gray-300 font-semibold"
            >Grade ({{ table.rows.length }} linhas)</span
          >
          <div class="flex gap-2">
            <button
              @click="emit('edit-table', table.id)"
              class="text-xs bg-cyan-600/20 hover:bg-cyan-600 border border-cyan-500/50 text-cyan-300 hover:text-white px-2 py-1 rounded transition-colors"
            >
              Editar
            </button>
            <button
              @click="emit('remove-table', table.id)"
              class="text-xs bg-red-900/50 hover:bg-red-600 text-red-300 hover:text-white px-2 py-1 rounded transition-colors"
            >
              ×
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
