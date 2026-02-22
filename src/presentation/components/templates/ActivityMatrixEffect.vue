<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{ speed: number; color: string; density: number }>();

const styleContent = `
<style>
  @keyframes fade-cell {
    0%, 100% { opacity: 0.05; }
    50% { opacity: 0.6; }
  }
  .matrix-cell { animation: fade-cell infinite ease-in-out; }
</style>
`;

const grid = computed(() => {
  const cells = [];
  // Usa a densidade para definir a quantidade de colunas e o tamanho dos quadrados
  const cols = Math.max(10, props.density); 
  const size = 2000 / cols;
  const rows = Math.ceil(1500 / size);

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      // Cria um padrão orgânico onde algumas células são mais ativas que outras
      if (Math.random() > 0.3) {
        cells.push({
          id: `${r}-${c}`,
          x: c * size,
          y: r * size,
          size: size * 0.8, // 20% de gap
          dur: Math.random() * (props.speed * 2) + 2,
          del: Math.random() * 5
        });
      }
    }
  }
  return cells;
});
</script>

<template>
  <g class="activity-matrix-effect">
    <defs v-html="styleContent"></defs>
    <rect 
      v-for="cell in grid" :key="cell.id"
      class="matrix-cell"
      :x="cell.x" :y="cell.y" 
      :width="cell.size" :height="cell.size" 
      :fill="color" rx="4"
      :style="{ animationDuration: `${cell.dur}s`, animationDelay: `${cell.del}s` }"
    />
  </g>
</template>