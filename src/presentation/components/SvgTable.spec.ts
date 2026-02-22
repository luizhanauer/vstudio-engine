// @vitest-environment jsdom
import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import SvgTable from './SvgTable.vue';
import type { TableElement } from '../../domain/entities/VStudioTypes';

describe('SvgTable.vue', () => {
  const mockTableData: TableElement = {
    id: 'table-1',
    xPosition: 50,
    yPosition: 50,
    width: 800,
    fontSize: 16,
    textColor: '#ffffff',
    headerColor: '#ff0000',
    headerBgColor: '#000000',
    borderColor: '#3b82f6',
    borderSize: 2,
    showBorders: true,
    rows: [
      {
        id: 'row-1',
        isHeader: true,
        cells: [{ id: 'c1', content: 'Coluna A' }, { id: 'c2', content: 'Coluna B' }]
      },
      {
        id: 'row-2',
        isHeader: false,
        cells: [{ id: 'c3', content: 'Dado A' }, { id: 'c4', content: 'Dado B' }]
      }
    ]
  };

  it('deve renderizar a quantidade correta de textos baseada nas células', () => {
    const wrapper = mount(SvgTable, {
      props: { table: mockTableData }
    });

    const texts = wrapper.findAll('text');
    expect(texts.length).toBe(4);
    
    const headerCell = texts[0];
    const dataCell = texts[2];
    
    if (!headerCell || !dataCell) {
      throw new Error('Falha ao renderizar as células de texto.');
    }

    expect(headerCell.text()).toBe('Coluna A');
    expect(dataCell.text()).toBe('Dado A');
  });

  it('deve aplicar cores diferentes para o Header e o Body', () => {
    const wrapper = mount(SvgTable, {
      props: { table: mockTableData }
    });

    const texts = wrapper.findAll('text');
    
    const headerCell = texts[0];
    const dataCell = texts[2];
    
    if (!headerCell || !dataCell) {
      throw new Error('Falha ao renderizar as células de texto.');
    }

    expect(headerCell.attributes('fill')).toBe('#ff0000');
    expect(headerCell.attributes('font-weight')).toBe('bold');

    expect(dataCell.attributes('fill')).toBe('#ffffff');
    expect(dataCell.attributes('font-weight')).toBe('normal');
  });

  it('deve calcular a largura da coluna dinamicamente (width / maxCols)', () => {
    const wrapper = mount(SvgTable, {
      props: { table: mockTableData }
    });

    const rect = wrapper.find('rect');
    
    expect(rect.exists()).toBe(true);
    expect(rect.attributes('width')).toBe('400');
  });
});