<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{ speed: number; color: string; density: number }>();

const styleContent = `
<style>
  @keyframes grid-move {
    0% { transform: translateY(0) scale(1); opacity: 0; }
    10% { opacity: 0.8; }
    90% { opacity: 0.8; }
    100% { transform: translateY(400px) scale(2.5); opacity: 0; }
  }
  .grid-hline {
    animation: grid-move linear infinite;
    transform-origin: 50% 30%; /* Ponto de fuga */
  }
</style>
`;

// Linhas verticais que convergem para um ponto de fuga (Perspective)
const vLines = computed(() => {
  const lines = [];
  const centerX = 1000;
  for (let i = -props.density; i <= props.density; i++) {
    lines.push({
      id: i,
      x1: centerX, y1: 300, // Ponto de fuga (Horizonte)
      x2: centerX + (i * 100), y2: 1500 // Espalhamento na base
    });
  }
  return lines;
});

// Linhas horizontais que se movem "para frente"
const hLines = computed(() => {
  return Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    y: 350, // Nascem logo abaixo do horizonte
    dur: props.speed,
    del: (props.speed / 15) * i // Distribui uniformemente no tempo
  }));
});
</script>

<template>
  <g class="cybergrid-effect">
    <defs v-html="styleContent"></defs>
    
    <circle cx="1000" cy="300" r="150" :fill="color" opacity="0.1" />
    <circle cx="1000" cy="300" r="100" :fill="color" opacity="0.2" />

    <line 
      v-for="line in vLines" :key="`v-${line.id}`"
      :x1="line.x1" :y1="line.y1" :x2="line.x2" :y2="line.y2"
      :stroke="color" stroke-width="2" opacity="0.3"
    />

    <line 
      v-for="line in hLines" :key="`h-${line.id}`"
      class="grid-hline"
      x1="-1000" :y1="line.y" x2="3000" :y2="line.y"
      :stroke="color" stroke-width="2"
      :style="{ animationDuration: `${line.dur}s`, animationDelay: `-${line.del}s` }"
    />
  </g>
</template>