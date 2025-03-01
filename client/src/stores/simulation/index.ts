import { SimulationStore } from './types';
import { create } from 'zustand';

export const useSimulationStore = create<SimulationStore>()((set) => ({
  results: undefined,
  simulations: undefined,
  setResults: (data) => set(() => ({ results: data })),
  resetResults: () => set(() => ({ results: undefined })),
  setSimulations: (data) => set(() => ({ simulations: data })),
  removeSimulation: ({ id }) =>
    set(({ simulations }) => {
      const filteredSimulations = simulations?.filter(
        (sim) => Number(sim.id) !== Number(id)
      );
      return { simulations: filteredSimulations };
    }),
}));
