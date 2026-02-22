<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{ speed: number; color: string; density: number }>();

const styleContent = `
<style>
  @keyframes pulse-bar {
    0%, 100% { transform: scaleY(0.1); opacity: 0.3; }
    50% { transform: scaleY(1); opacity: 0.8; }
  }
  .pulse-bar {
    animation: pulse-bar infinite ease-in-out;
    transform-origin: center; /* Expande a partir do centro */
  }
</style>
`;

const bars = computed(() => {
  const barCount = Math.max(10, props.density);
  const width = 2000 / barCount;
  
  return Array.from({ length: barCount }).map((_, i) => {
    // Usa uma função seno para criar um padrão de onda natural na altura base
    const waveHeight = Math.abs(Math.sin(i * 0.2)) * 300 + 100;
    
    return {
      id: i,
      x: i * width,
      y: 750 - (waveHeight / 2), // Centralizado verticalmente (assumindo canvas h=1500)
      w: width * 0.6, // 40% gap
      h: waveHeight,
      dur: Math.random() * props.speed + 1, // Ritmo rápido e caótico
      del: Math.random() * 2
    };
  });
});
</script>

<template>
  <g class="stream-pulse-effect">
    <defs v-html="styleContent"></defs>
    <line x1="0" y1="750" x2="2000" y2="750" :stroke="color" stroke-width="2" opacity="0.2" />
    
    <rect 
      v-for="bar in bars" :key="bar.id"
      class="pulse-bar"
      :x="bar.x" :y="bar.y" 
      :width="bar.w" :height="bar.h" 
      :fill="color" rx="5"
      :style="{ animationDuration: `${bar.dur}s`, animationDelay: `${bar.del}s` }"
    />
  </g>
</template>