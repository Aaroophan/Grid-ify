export interface Point3D {
  id: string;
  x: number;
  y: number;
  z: number;
}

export type RenderMode = 'points' | 'lines' | 'vectors';