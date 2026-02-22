export type VisualEffectType = 'waving' | 'particles' | 'matrix' | 'nexus' | 'circuit' | 'cybergrid' | 'activity' | 'pulse' | 'quantum' | 'none';

export interface DynamicElement {
  id: string;
  content: string;
  fontSize: number;
  yPosition: number;
  colorHex: string;
  fontWeight: 'normal' | 'bold';
}

export interface TableCell {
  id: string;
  content: string;
}

export interface TableRow {
  id: string;
  cells: TableCell[];
  isHeader?: boolean;
}

export interface TableElement {
  id: string;
  xPosition: number;
  yPosition: number;
  width: number;
  fontSize: number;
  textColor: string;
  headerColor: string;
  headerBgColor: string;
  borderColor: string;
  borderSize: number;
  showBorders: boolean;
  rows: TableRow[];
}

export interface EngineConfiguration {
  canvas: { width: number; height: number; backgroundColor: string; };
  effect: { type: VisualEffectType; speed: number; density: number; primaryColor: string; };
  elements: DynamicElement[];
  tables: TableElement[];
}