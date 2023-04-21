import { create } from 'zustand';

type BetModalStore = {
	isOpen: boolean;
	onOpen: () => void;
	onClose: () => void;
};

const useBetModal = create<BetModalStore>((set) => ({
	isOpen: false,
	onOpen: () => set({ isOpen: true }),
	onClose: () => set({ isOpen: false }),
}));

export default useBetModal;
