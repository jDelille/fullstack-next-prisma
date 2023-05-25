import { create } from 'zustand';

type PollModalStore = {
	isOpen: boolean;
	onOpen: () => void;
	onClose: () => void;
};

const usePollModal = create<PollModalStore>((set) => ({
	isOpen: false,
	onOpen: () => set({ isOpen: true }),
	onClose: () => set({ isOpen: false }),
}));

export default usePollModal;
