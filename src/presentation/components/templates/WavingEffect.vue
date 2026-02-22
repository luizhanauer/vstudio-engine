<script setup lang="ts">
defineProps<{ speed: number; color: string }>();

const styleContent = `
<style>
  @keyframes wave-motion {
    0%, 100% { transform: translateX(0) translateY(0); }
    50% { transform: translateX(-40px) translateY(15px); }
  }
  .wave-path { animation: wave-motion infinite ease-in-out; transform-origin: center; }
</style>
`;
</script>

<template>
  <g class="waving-effect">
    <defs v-html="styleContent"></defs>
    
    <path class="wave-path" :style="{ animationDuration: `${speed}s`, opacity: 0.25 }" :fill="color" d="M-100,600 C200,700 500,500 800,600 C1100,700 1400,500 1700,600 L1700,768 L-100,768 Z" />
    <path class="wave-path" :style="{ animationDuration: `${speed * 1.5}s`, animationDirection: 'reverse', opacity: 0.15 }" :fill="color" d="M-200,550 C150,450 450,650 750,550 C1050,450 1350,650 1650,550 L1650,768 L-200,768 Z" />
  </g>
</template>