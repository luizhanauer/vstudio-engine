import { reactive } from 'vue';

export const svgConfig = reactive({
  identity: {
    name: 'LUIZ HANAUER',
    role: 'Software Engineer',
  },
  theme: {
    background: '#121d2f',
    primary: '#00ff7f',
    text: '#ffffff',
  },
  settings: {
    effectType: 'waving', // 'waving', 'particles', 'matrix'
    animationSpeed: 15,
    density: 60,
  }
});