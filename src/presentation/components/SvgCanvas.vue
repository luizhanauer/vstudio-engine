<script setup lang="ts">
import { computed } from 'vue';
import { useEngineStore } from '../../application/store/useEngineStore';

// Efeitos originais
import WavingEffect from './templates/WavingEffect.vue';
import ParticlesEffect from './templates/ParticlesEffect.vue';
import MatrixEffect from './templates/MatrixEffect.vue';
// Efeitos Tech/Net
import NexusEffect from './templates/NexusEffect.vue';
import CircuitEffect from './templates/CircuitEffect.vue';
import CyberGridEffect from './templates/CyberGridEffect.vue';
// Efeitos Data/Logic
import ActivityMatrixEffect from './templates/ActivityMatrixEffect.vue';
import StreamPulseEffect from './templates/StreamPulseEffect.vue';
import QuantumOrbitsEffect from './templates/QuantumOrbitsEffect.vue';

import SvgTable from './SvgTable.vue';

const { state: svgConfig } = useEngineStore();

const activeTemplate = computed(() => {
  const templates = { 
    waving: WavingEffect, 
    particles: ParticlesEffect, 
    matrix: MatrixEffect,
    nexus: NexusEffect,
    circuit: CircuitEffect,
    cybergrid: CyberGridEffect,
    activity: ActivityMatrixEffect,
    pulse: StreamPulseEffect,
    quantum: QuantumOrbitsEffect,
    none: null 
  };
  return templates[svgConfig.effect.type];
});

const dynamicViewBox = computed(() => `0 0 ${svgConfig.canvas.width} ${svgConfig.canvas.height}`);
</script>

<template>
  <svg id="profile-svg-header" width="100%" height="100%" :viewBox="dynamicViewBox" xmlns="http://www.w3.org/2000/svg">
    <rect width="100%" height="100%" :fill="svgConfig.canvas.backgroundColor" />
    <component v-if="activeTemplate" :is="activeTemplate" :speed="svgConfig.effect.speed" :color="svgConfig.effect.primaryColor" :density="svgConfig.effect.density" />
    
    <text v-for="element in svgConfig.elements" :key="element.id" x="50%" :y="`${element.yPosition}%`" text-anchor="middle" :fill="element.colorHex" font-family="sans-serif" :font-weight="element.fontWeight" :font-size="`${element.fontSize}px`" letter-spacing="2px">{{ element.content }}</text>
    
    <SvgTable v-for="table in svgConfig.tables" :key="table.id" :table="table" />
  </svg>
</template>