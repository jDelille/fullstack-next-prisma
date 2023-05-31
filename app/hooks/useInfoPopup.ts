import { create } from 'zustand';

type InfoPopupStore = {
	isOpen: boolean;
	onOpen: () => void;
	onClose: () => void;
};

const useInfoPopup = create<InfoPopupStore>((set) => ({
	isOpen: false,
	onOpen: () => set({ isOpen: true }),
	onClose: () => set({ isOpen: false }),
}));

export default useInfoPopup;
