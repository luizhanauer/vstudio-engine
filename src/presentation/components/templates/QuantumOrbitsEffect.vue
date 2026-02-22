<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{ speed: number; color: string; density: number }>();

const styleContent = `
<style>
  @keyframes spin-orbit {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  .quantum-orbit {
    animation: spin-orbit linear infinite;
    transform-origin: 1000px 750px; /* Centro fixo do canvas 2000x1500 */
  }
</style>
`;

const orbits = computed(() => {
  // Limita a quantidade de anéis para manter a estética clean
  const ringCount = Math.min(Math.max(3, Math.floor(props.density / 4)), 25);
  
  return Array.from({ length: ringCount }).map((_, i) => {
    const radius = 100 + (i * 45); // Espaçamento entre as órbitas
    const direction = i % 2 === 0 ? 'normal' : 'reverse';
    const dashLength = Math.random() * 100 + 10;
    
    return {
      id: i,
      r: radius,
      dur: (Math.random() * props.speed * 2) + 10, // Rotações lentas e majestosas
      dir: direction,
      dash: `${dashLength} ${dashLength * 1.5}`,
      electronSize: Math.random() > 0.5 ? Math.random() * 4 + 2 : 0 // Adiciona elétrons em algumas órbitas
    };
  });
});
</script>

<template>
  <g class="quantum-orbits-effect">
    <defs v-html="styleContent"></defs>
    
    <circle cx="1000" cy="750" r="20" :fill="color" opacity="0.8" />
    <circle cx="1000" cy="750" r="40" :stroke="color" fill="none" stroke-width="2" opacity="0.3" />

    <g 
      v-for="orbit in orbits" :key="orbit.id"
      class="quantum-orbit"
      :style="{ animationDuration: `${orbit.dur}s`, animationDirection: orbit.dir }"
    >
      <circle 
        cx="1000" cy="750" :r="orbit.r" 
        :stroke="color" fill="none" stroke-width="1.5" opacity="0.4"
        :stroke-dasharray="orbit.dash"
      />
      <circle 
        v-if="orbit.electronSize > 0"
        :cx="1000 + orbit.r" cy="750" :r="orbit.electronSize" 
        :fill="color" opacity="0.9"
        style="filter: drop-shadow(0 0 5px currentColor)"
      />
    </g>
  </g>
</template>