import { reactive } from 'vue';
import type { EngineConfiguration, TableElement } from '../../domain/entities/VStudioTypes';

const state = reactive<EngineConfiguration>({
  canvas: { width: 1280, height: 768, backgroundColor: '#0a0b10' },
  effect: { type: 'activity', speed: 15, density: 39, primaryColor: '#289f91' },
  elements: [
    { id: crypto.randomUUID(), content: 'LUIZ HANAUER', fontSize: 64, yPosition: 25, colorHex: '#FFFFFF', fontWeight: 'bold' },
    { id: crypto.randomUUID(), content: 'Software Developer & DevOps | PHP - Laravel - Golang - Vue.js', fontSize: 24, yPosition: 35, colorHex: '#FFFFFF', fontWeight: 'normal' }
  ],
  tables: []
});

export function useEngineStore() {
  const addTextElement = (): void => {
    state.elements.push({ id: crypto.randomUUID(), content: 'Nova Camada', fontSize: 20, yPosition: 50, colorHex: '#ffffff', fontWeight: 'normal' });
  };

  const removeTextElement = (id: string): void => {
    const idx = state.elements.findIndex(e => e.id === id);
    if (idx !== -1) state.elements.splice(idx, 1);
  };

  const addTable = (): void => {
    const newTable: TableElement = {
      id: crypto.randomUUID(), xPosition: 50, yPosition: 55, width: 800, fontSize: 16,
      textColor: '#ffffff', headerColor: '#ffffff', headerBgColor: '#1e293b',
      borderColor: '#3b82f6', borderSize: 1, showBorders: true,
      rows: [
        { id: crypto.randomUUID(), isHeader: true, cells: [{ id: crypto.randomUUID(), content: 'Princípio' }, { id: crypto.randomUUID(), content: 'Prática' }] },
        { id: crypto.randomUUID(), cells: [{ id: crypto.randomUUID(), content: 'Clean Architecture' }, { id: crypto.randomUUID(), content: 'Camadas Desacopladas' }] }
      ]
    };
    state.tables.push(newTable);
  };

  const removeTable = (id: string): void => {
    const idx = state.tables.findIndex(t => t.id === id);
    if (idx !== -1) state.tables.splice(idx, 1);
  };

  const getShareableUrl = (): string => {
    const jsonStr = JSON.stringify(state);
    const base64 = btoa(encodeURIComponent(jsonStr));
    const url = new URL(window.location.href);
    url.hash = `config=${base64}`;
    return url.toString();
  };

  const loadFromUrl = (): boolean => {
    try {
      const hash = window.location.hash;
      if (hash.startsWith('#config=')) {
        const base64 = hash.replace('#config=', '');
        const jsonStr = decodeURIComponent(atob(base64));
        const loadedState = JSON.parse(jsonStr) as EngineConfiguration;
        Object.assign(state, loadedState);
        return true;
      }
    } catch (e) {
      console.error('Falha ao carregar configuração da URL:', e);
    }
    return false;
  };

  return { state, addTextElement, removeTextElement, addTable, removeTable, getShareableUrl, loadFromUrl };
}