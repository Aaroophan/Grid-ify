import { create } from 'zustand';
import { Point3D, RenderMode, AxisLabels } from '../types';

interface DataState {
  points: Point3D[];
  renderMode: RenderMode;
  axisLabels: AxisLabels;
  addPoint: (point: Omit<Point3D, 'id'>) => void;
  updatePoint: (id: string, point: Partial<Omit<Point3D, 'id'>>) => void;
  removePoint: (id: string) => void;
  setRenderMode: (mode: RenderMode) => void;
  setAxisLabels: (labels: Partial<AxisLabels>) => void;
  clearPoints: () => void;
  setPointsFromText: (text: string) => void;
}

const useDataStore = create<DataState>((set) => ({
  points: [],
  renderMode: 'points',
  axisLabels: {
    x: 'X',
    y: 'Y',
    z: 'Z'
  },

  addPoint: (point) => set((state) => ({
    points: [...state.points, { ...point, id: crypto.randomUUID() }]
  })),

  updatePoint: (id, point) => set((state) => ({
    points: state.points.map((p) =>
      p.id === id ? { ...p, ...point } : p
    )
  })),

  removePoint: (id) => set((state) => ({
    points: state.points.filter((p) => p.id !== id)
  })),

  setRenderMode: (mode) => set({ renderMode: mode }),

  setAxisLabels: (labels) => set((state) => ({
    axisLabels: { ...state.axisLabels, ...labels }
  })),

  clearPoints: () => set({ points: [] }),

  setPointsFromText: (text) => {
    try {
      // Remove whitespace and split by ],[
      const pointsText = text.replace(/\s/g, '').split('],[');

      // Clean up brackets at the start and end
      const cleanPoints = pointsText.map(p =>
        p.replace(/^\[|\]$/g, '').split(',').map(Number)
      );

      // Validate and create points
      const validPoints = cleanPoints
        .filter(coords => coords.length === 3 && coords.every(n => !isNaN(n)))
        .map(([x, y, z]) => ({
          id: crypto.randomUUID(),
          x, y, z
        }));

      set({ points: validPoints });
    } catch (error) {
      console.error('Failed to parse coordinates:', error);
    }
  }
}));

export default useDataStore;