// @vitest-environment jsdom
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useEngineStore } from './useEngineStore';

describe('useEngineStore (Application Layer)', () => {
  beforeEach(() => {
    const { state } = useEngineStore();
    state.elements = [];
    state.tables = [];
  });

  it('deve inicializar com as configurações padrão de canvas', () => {
    const { state } = useEngineStore();
    expect(state.canvas.width).toBe(1280);
    expect(state.canvas.height).toBe(768);
    // FIX: Atualizado para refletir sua mudança manual
    expect(state.effect.type).toBe('activity'); 
    expect(state.effect.primaryColor).toBe('#289f91');
  });

  it('deve adicionar um novo elemento de texto tipado corretamente', () => {
    const { state, addTextElement } = useEngineStore();
    
    expect(state.elements.length).toBe(0);
    addTextElement();
    
    expect(state.elements.length).toBe(1);
    
    const newElement = state.elements[0];
    if (newElement) {
      expect(typeof newElement.id).toBe('string');
      expect(newElement.content).toBe('Nova Camada');
      expect(newElement.fontSize).toBeTypeOf('number');
    } else {
      expect.fail('Elemento não foi criado.');
    }
  });

  it('deve remover um elemento de texto pelo ID', () => {
    const { state, addTextElement, removeTextElement } = useEngineStore();
    
    addTextElement();
    const elementId = state.elements[0]?.id;
    
    expect(elementId).toBeDefined();
    
    if (elementId) {
      removeTextElement(elementId);
      expect(state.elements.length).toBe(0);
    }
  });

  it('deve gerar uma URL de compartilhamento válida em Base64', () => {
    const { getShareableUrl } = useEngineStore();
    
    // FIX: Usando a API nativa do Vitest para simular a janela
    vi.stubGlobal('location', { href: 'http://localhost:5173/' });

    const url = getShareableUrl();
    expect(url).toContain('http://localhost:5173/#config=');
    
    const base64Hash = url.split('#config=')[1];
    expect(base64Hash).toBeDefined();
    
    if (base64Hash) {
      const decodedJson = decodeURIComponent(atob(base64Hash));
      expect(() => JSON.parse(decodedJson)).not.toThrow();
    }
    
    vi.unstubAllGlobals();
  });
});