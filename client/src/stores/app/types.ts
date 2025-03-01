type Modal = 'results';

export type AppStore = {
  modals: {
    results: boolean;
  };
  toggleModal: (modal: Modal) => void;
};
