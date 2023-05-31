import { create } from 'zustand';

type PlacedBetPopupStore = {
	isOpen: boolean;
	onOpen: () => void;
	onClose: () => void;
};

const usePlacedBetPopup = create<PlacedBetPopupStore>((set) => ({
	isOpen: false,
	onOpen: () => set({ isOpen: true }),
	onClose: () => set({ isOpen: false }),
}));

export default usePlacedBetPopup;
