// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { executeSvgDownload } from './DownloadSvgFile';

describe('DownloadSvgFile Use Case', () => {
  let mockCreateObjectURL: ReturnType<typeof vi.fn>;
  let mockRevokeObjectURL: ReturnType<typeof vi.fn>;
  let mockClick: ReturnType<typeof vi.fn>;
  let originalCreateElement: typeof document.createElement;

  beforeEach(() => {
    mockCreateObjectURL = vi.fn().mockReturnValue('blob:http://localhost/mock-uuid');
    mockRevokeObjectURL = vi.fn();

    vi.stubGlobal('URL', {
      createObjectURL: mockCreateObjectURL,
      revokeObjectURL: mockRevokeObjectURL
    });

    vi.stubGlobal('XMLSerializer', class {
      serializeToString(node: Node): string {
        return `<svg id="${(node as Element).id}"></svg>`;
      }
    });

    mockClick = vi.fn();
    originalCreateElement = document.createElement.bind(document);

    vi.spyOn(document, 'createElement').mockImplementation((tagName: string) => {
      // 1. Cria o elemento real do DOM para satisfazer o JSDOM (Node type)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const element = originalCreateElement(tagName as any);
      
      // 2. Intercepta apenas o método click se for uma tag de âncora
      if (tagName === 'a') {
        element.click = mockClick;
      }
      
      return element;
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it('não deve fazer nada se o svgElement for null', () => {
    expect(() => executeSvgDownload(null)).not.toThrow();
    expect(mockCreateObjectURL).not.toHaveBeenCalled();
  });

  it('deve serializar, criar blob e disparar click para download seguro', () => {
    const mockSvg = originalCreateElement('svg') as unknown as SVGSVGElement;
    mockSvg.setAttribute('id', 'test-svg');

    executeSvgDownload(mockSvg, 'test-file.svg');

    expect(mockCreateObjectURL).toHaveBeenCalledOnce();
    expect(mockClick).toHaveBeenCalledOnce();
    expect(mockRevokeObjectURL).toHaveBeenCalledOnce();
  });
});