import { SimulationStore } from './types';
import { create } from 'zustand';

export const useSimulationStore = create<SimulationStore>()((set) => ({
  created: undefined,
  results: undefined,
  setCreated: (data) => set(() => ({ created: data })),
  setResults: (data) => set(() => ({ results: data })),
  resetResults: () => set(() => ({ results: undefined })),
}));
