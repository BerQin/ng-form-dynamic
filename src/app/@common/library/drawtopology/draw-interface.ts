
export interface DrawTheme {
  type?: 'rect' | 'rhombus' | 'rLinkPoints' | 'linkPoints';
  wiDth?: number;
  height?: number;
  strokeStyle?: string;
  lineWidth?: number;
  fillStyle?: string;
  fillArcStyle?: string;
  hoverFillArcStyle?: string;
  strokeArcStyle?: string;
  hoverStrokeArcStyle?: string;
  textColor?: string;
  x?: number;
  y?: number;
  arcWidth?: number;
  arclineWidth?: number;
  hoverArcWidth?: number;
  hoverArclineWidth?: number;
  centerText?: string;
  centerTextColor?: string;
  lineStrokeStyle?: string;
  lineLineWidth?: number;
  hoverLineStrokeStyle?: string;
  hoverLineLineWidth?: number;
}

export interface DrawIsInGraph {
  type?: any;
  obj?: any;
  Path?: any;
  ispass?: boolean;
}

export interface DrawLinkPoints {
  frompath?: any;
  topath?: any;
  totype?: any;
}

export interface DrawScale {
  x?: number;
  y?: number;
}
