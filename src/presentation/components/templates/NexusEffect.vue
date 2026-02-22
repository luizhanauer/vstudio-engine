<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{ speed: number; color: string; density: number }>();

const styleContent = `
<style>
  @keyframes pulse-node {
    0%, 100% { opacity: 0.3; transform: scale(1); }
    50% { opacity: 1; transform: scale(1.5); }
  }
  @keyframes link-flow {
    0% { stroke-dashoffset: 100; opacity: 0.1; }
    50% { opacity: 0.6; }
    100% { stroke-dashoffset: 0; opacity: 0.1; }
  }
  .nexus-node { animation: pulse-node infinite ease-in-out; transform-origin: center; }
  .nexus-link { stroke-dasharray: 10 20; animation: link-flow linear infinite; }
</style>
`;

const nodes = computed(() => {
  return Array.from({ length: props.density }).map((_, i) => ({
    id: i,
    x: Math.random() * 2000,
    y: Math.random() * 1500,
    r: Math.random() * 2 + 2,
    dur: Math.random() * (props.speed / 2) + 2,
    del: Math.random() * 5
  }));
});

// Conecta nós próximos para formar a malha
const links = computed(() => {
  const connections = [];
  
  for (let i = 0; i < nodes.value.length; i++) {
    const nodeA = nodes.value[i];
    if (!nodeA) continue; // Guard clause: Garante ao TS que o objeto existe

    for (let j = i + 1; j < nodes.value.length; j++) {
      const nodeB = nodes.value[j];
      if (!nodeB) continue; // Guard clause: Garante ao TS que o objeto existe

      const dx = nodeA.x - nodeB.x;
      const dy = nodeA.y - nodeB.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      if (dist < 250) { // Distância máxima para conectar
        connections.push({
          id: `${i}-${j}`,
          x1: nodeA.x, y1: nodeA.y,
          x2: nodeB.x, y2: nodeB.y,
          dur: Math.random() * props.speed + 5
        });
      }
    }
  }
  
  return connections.slice(0, props.density * 2); // Limita conexões para performance
});
</script>

<template>
  <g class="nexus-effect">
    <defs v-html="styleContent"></defs>
    <line 
      v-for="link in links" :key="link.id" 
      class="nexus-link"
      :x1="link.x1" :y1="link.y1" :x2="link.x2" :y2="link.y2" 
      :stroke="color" stroke-width="1"
      :style="{ animationDuration: `${link.dur}s` }"
    />
    <circle 
      v-for="node in nodes" :key="node.id" 
      class="nexus-node"
      :cx="node.x" :cy="node.y" :r="node.r" 
      :fill="color" 
      :style="{ animationDuration: `${node.dur}s`, animationDelay: `${node.del}s` }" 
    />
  </g>
</template>