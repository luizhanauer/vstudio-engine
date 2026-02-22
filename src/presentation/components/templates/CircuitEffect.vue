<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{ speed: number; color: string; density: number }>();

const styleContent = `
<style>
  @keyframes circuit-run {
    0% { stroke-dashoffset: 1000; opacity: 0; }
    10% { opacity: 0.8; }
    90% { opacity: 0.8; }
    100% { stroke-dashoffset: 0; opacity: 0; }
  }
  .circuit-path {
    fill: none;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-dasharray: 100 1000;
    animation: circuit-run linear infinite;
  }
</style>
`;

const circuits = computed(() => {
  return Array.from({ length: props.density / 2 }).map((_, i) => {
    const startX = Math.random() * 2000;
    const startY = Math.random() * 1500;
    const dir = Math.random() > 0.5 ? 1 : -1;
    // Desenha linhas com ângulos de 90 e 45 graus típicos de PCB
    const d = `M ${startX} ${startY} 
               L ${startX + 100 * dir} ${startY} 
               L ${startX + 150 * dir} ${startY + 50 * dir} 
               L ${startX + 150 * dir} ${startY + 200 * dir}
               L ${startX + 250 * dir} ${startY + 300 * dir}`;
    return {
      id: i, path: d,
      dur: Math.random() * props.speed + 3,
      del: Math.random() * 5
    };
  });
});
</script>

<template>
  <g class="circuit-effect">
    <defs v-html="styleContent"></defs>
    <path 
      v-for="circuit in circuits" :key="`bg-${circuit.id}`" 
      :d="circuit.path" :stroke="color" stroke-width="2" opacity="0.1" fill="none" 
    />
    <path 
      v-for="circuit in circuits" :key="circuit.id" 
      class="circuit-path"
      :d="circuit.path" :stroke="color"
      :style="{ animationDuration: `${circuit.dur}s`, animationDelay: `${circuit.del}s` }" 
    />
    <circle 
      v-for="circuit in circuits" :key="`dot-${circuit.id}`"
      :cx="circuit.path.split(' ')[1]" :cy="circuit.path.split(' ')[2]" r="4" :fill="color" opacity="0.4"
    />
  </g>
</template>