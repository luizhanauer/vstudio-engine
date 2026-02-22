<script setup lang="ts">
import type { TableElement } from '../../domain/entities/VStudioTypes';

const props = defineProps<{ table: TableElement | null; isOpen: boolean }>();
const emit = defineEmits<{ (e: 'close'): void }>();

const addRow = () => {
  if (!props.table) return;
  const colCount = props.table.rows[0]?.cells.length || 1;
  const newCells = Array.from({ length: colCount }).map(() => ({ id: crypto.randomUUID(), content: 'Novo' }));
  props.table.rows.push({ id: crypto.randomUUID(), cells: newCells });
};

const removeRow = (index: number) => {
  if (props.table && props.table.rows.length > 1) {
    props.table.rows.splice(index, 1);
  }
};

const addColumn = () => {
  if (!props.table) return;
  props.table.rows.forEach(row => {
    row.cells.push({ id: crypto.randomUUID(), content: row.isHeader ? 'Novo Head' : 'Novo Dado' });
  });
};

const removeColumn = () => {
  if (!props.table || props.table.rows.length === 0) return;
  
  // FIX: Extração segura para satisfazer o TypeScript estrito
  const firstRow = props.table.rows[0];
  if (firstRow && firstRow.cells.length > 1) {
    props.table.rows.forEach(row => row.cells.pop());
  }
};
</script>

<template>
  <div v-if="isOpen && table" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
    <div class="bg-[#0F172A] border border-blue-500/30 rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.8)] w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden">
      
      <div class="p-5 border-b border-blue-900/50 flex justify-between items-center bg-slate-900">
        <h2 class="text-lg font-bold text-blue-400">Edição de Tabela Visual</h2>
        <button @click="emit('close')" class="text-gray-400 hover:text-white bg-slate-800 hover:bg-red-500/20 px-3 py-1 rounded-lg transition-colors">Fechar</button>
      </div>

      <div class="flex-1 overflow-y-auto p-6 custom-scrollbar flex flex-col gap-6 text-gray-200">
        
        <div class="grid grid-cols-4 gap-4 bg-slate-900/50 p-4 rounded-xl border border-slate-800">
          <div><label class="text-[10px] text-gray-400 uppercase font-bold block mb-1">Largura Total (px)</label><input type="number" v-model.number="table.width" class="w-full p-2 bg-slate-950 border border-slate-700 rounded text-sm text-blue-300 outline-none" /></div>
          <div><label class="text-[10px] text-gray-400 uppercase font-bold block mb-1">Tamanho Fonte (px)</label><input type="number" v-model.number="table.fontSize" class="w-full p-2 bg-slate-950 border border-slate-700 rounded text-sm text-blue-300 outline-none" /></div>
          <div><label class="text-[10px] text-gray-400 uppercase font-bold block mb-1">Posição Y (%)</label><input type="number" v-model.number="table.yPosition" class="w-full p-2 bg-slate-950 border border-slate-700 rounded text-sm text-blue-300 outline-none" /></div>
          <div class="flex items-center gap-2 mt-5">
            <input type="checkbox" v-model="table.showBorders" id="border-toggle" class="w-4 h-4 accent-blue-500" />
            <label for="border-toggle" class="text-sm font-bold text-gray-300 cursor-pointer">Visibilidade das Bordas</label>
          </div>
        </div>

        <div class="grid grid-cols-5 gap-4 bg-slate-900/50 p-4 rounded-xl border border-slate-800">
          <div><label class="text-[10px] text-gray-400 uppercase font-bold block mb-1">Cor do Texto</label><input type="color" v-model="table.textColor" class="w-full h-8 rounded border-0 bg-transparent cursor-pointer" /></div>
          <div><label class="text-[10px] text-gray-400 uppercase font-bold block mb-1">Cor do Header</label><input type="color" v-model="table.headerColor" class="w-full h-8 rounded border-0 bg-transparent cursor-pointer" /></div>
          <div><label class="text-[10px] text-gray-400 uppercase font-bold block mb-1">Fundo Header</label><input type="color" v-model="table.headerBgColor" class="w-full h-8 rounded border-0 bg-transparent cursor-pointer" /></div>
          <div><label class="text-[10px] text-gray-400 uppercase font-bold block mb-1">Cor da Borda</label><input type="color" v-model="table.borderColor" :disabled="!table.showBorders" class="w-full h-8 rounded border-0 bg-transparent cursor-pointer disabled:opacity-50" /></div>
          <div><label class="text-[10px] text-gray-400 uppercase font-bold block mb-1">Tamanho Borda</label><input type="number" v-model.number="table.borderSize" :disabled="!table.showBorders" class="w-full p-1.5 bg-slate-950 border border-slate-700 rounded text-sm text-blue-300 outline-none disabled:opacity-50" /></div>
        </div>

        <div class="border border-slate-700 rounded-xl overflow-hidden bg-slate-950 p-4">
          <div class="flex justify-between mb-4">
            <h3 class="text-sm font-bold text-purple-400">Conteúdo da Tabela</h3>
            <div class="flex gap-2">
              <button @click="removeColumn" class="text-xs bg-slate-800 hover:bg-slate-700 text-gray-300 px-3 py-1 rounded">- Coluna</button>
              <button @click="addColumn" class="text-xs bg-blue-600/30 hover:bg-blue-600 text-blue-200 px-3 py-1 rounded">+ Coluna</button>
            </div>
          </div>
          
          <div class="flex flex-col gap-2">
            <div v-for="(row, rIndex) in table.rows" :key="row.id" class="flex gap-2 items-center">
              <div class="flex-1 flex gap-2">
                <input 
                  v-for="cell in row.cells" :key="cell.id" 
                  type="text" v-model="cell.content" 
                  :class="['w-full p-2 bg-slate-900 border border-slate-700 rounded text-sm outline-none focus:border-purple-500', row.isHeader ? 'font-bold text-purple-300 border-b-2 border-b-purple-500/50' : 'text-gray-200']"
                />
              </div>
              <button @click="removeRow(rIndex)" v-if="!row.isHeader" class="text-red-400 hover:text-red-300 p-2" title="Remover linha">×</button>
              <div v-else class="w-8"></div>
            </div>
            <button @click="addRow" class="w-full mt-2 py-2 border border-dashed border-slate-700 hover:border-blue-500 text-slate-400 hover:text-blue-400 rounded-lg text-sm transition-colors">+ Adicionar Nova Linha</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>