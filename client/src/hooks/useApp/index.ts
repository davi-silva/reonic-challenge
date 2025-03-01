import { useAppStore } from '@/stores';

const useApp = () => {
  const { modals, toggleModal } = useAppStore();

  return { modals, toggleModal };
};

export default useApp;
