<script setup lang="ts">
import { computed } from 'vue';
import type { TableElement } from '../../domain/entities/VStudioTypes';

const props = defineProps<{ table: TableElement }>();

const rowHeight = computed(() => props.table.fontSize * 2.5);
const maxCols = computed(() => Math.max(...props.table.rows.map(r => r.cells.length), 1));
const colWidth = computed(() => props.table.width / maxCols.value);

const startX = computed(() => `calc(${props.table.xPosition}% - ${props.table.width / 2}px)`);
const startY = computed(() => `${props.table.yPosition}%`);
</script>

<template>
  <g :style="{ transform: `translate(${startX}, ${startY})` }">
    <g v-for="(row, rowIndex) in table.rows" :key="row.id" :transform="`translate(0, ${rowIndex * rowHeight})`">
      <g v-for="(cell, colIndex) in row.cells" :key="cell.id" :transform="`translate(${colIndex * colWidth}, 0)`">
        <rect 
          :width="colWidth" 
          :height="rowHeight" 
          :fill="row.isHeader ? table.headerBgColor : 'transparent'"
          :stroke="table.showBorders ? table.borderColor : 'transparent'"
          :stroke-width="table.showBorders ? table.borderSize : 0"
        />
        <text 
          :x="colWidth / 2" 
          :y="rowHeight / 2 + (table.fontSize / 3)" 
          text-anchor="middle" 
          :fill="row.isHeader ? table.headerColor : table.textColor" 
          font-family="sans-serif" 
          :font-weight="row.isHeader ? 'bold' : 'normal'" 
          :font-size="`${table.fontSize}px`"
        >
          {{ cell.content }}
        </text>
      </g>
    </g>
  </g>
</template>