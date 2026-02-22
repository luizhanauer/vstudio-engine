<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{ speed: number; color: string; density: number }>();

const styleContent = `
<style>
  @keyframes float-up { 
    0% { transform: translateY(0); opacity: 0; } 
    50% { opacity: 0.8; } 
    100% { transform: translateY(-150px); opacity: 0; } 
  }
  .particle-item { animation: float-up infinite linear; opacity: 0; }
</style>
`;

const particles = computed(() => {
  return Array.from({ length: props.density }).map((_, i) => ({
    id: i, cx: Math.random() * 2000, cy: Math.random() * 1500,
    r: Math.random() * 2 + 1, dur: Math.random() * props.speed + 3,
    del: Math.random() * 5
  }));
});
</script>

<template>
  <g class="particles-effect">
    <defs v-html="styleContent"></defs>
    <circle v-for="p in particles" :key="p.id" class="particle-item" :cx="p.cx" :cy="p.cy" :r="p.r" :fill="color" :style="{ animationDuration: `${p.dur}s`, animationDelay: `${p.del}s` }" />
  </g>
</template>