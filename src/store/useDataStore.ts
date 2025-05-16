import { create } from 'zustand';
import { Point3D, RenderMode } from '../types';

interface DataState {
  points: Point3D[];
  renderMode: RenderMode;
  addPoint: (point: Omit<Point3D, 'id'>) => void;
  updatePoint: (id: string, point: Partial<Omit<Point3D, 'id'>>) => void;
  removePoint: (id: string) => void;
  setRenderMode: (mode: RenderMode) => void;
  clearPoints: () => void;
}

const useDataStore = create<DataState>((set) => ({
  points: [],
  renderMode: 'points',
  
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

  clearPoints: () => set({ points: [] })
}));

export default useDataStore;