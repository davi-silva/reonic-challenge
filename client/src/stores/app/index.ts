import { AppStore } from './types';
import { create } from 'zustand';

export const useAppStore = create<AppStore>((set) => ({
  modals: {
    results: false,
  },
  toggleModal: (modal) =>
    set(({ modals: modalsState }) => {
      const newModals = modalsState;
      newModals[modal] = !newModals[modal];
      return { modals: newModals };
    }),
}));
