<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{ speed: number; color: string; density: number }>();

const styleContent = `
<style>
  @keyframes rain-drop { 
    0% { transform: translateY(-50px); opacity: 0; } 
    10% { opacity: 0.8; } 
    90% { opacity: 0.8; } 
    100% { transform: translateY(1200px); opacity: 0; } 
  }
  .matrix-text { font-family: monospace; font-size: 16px; animation: rain-drop infinite linear; opacity: 0; writing-mode: vertical-rl; text-orientation: upright; }
</style>
`;

const columns = computed(() => {
  return Array.from({ length: props.density }).map((_, i) => ({
    id: i, x: (2000 / props.density) * i, dur: Math.random() * (props.speed / 2) + 2,
    del: Math.random() * 5, text: Math.random().toString(36).substring(2, 8).toUpperCase()
  }));
});
</script>

<template>
  <g class="matrix-effect">
    <defs v-html="styleContent"></defs>
    <text v-for="c in columns" :key="c.id" class="matrix-text" :x="c.x" y="0" :fill="color" :style="{ animationDuration: `${c.dur}s`, animationDelay: `${c.del}s` }">{{ c.text }}</text>
  </g>
</template>