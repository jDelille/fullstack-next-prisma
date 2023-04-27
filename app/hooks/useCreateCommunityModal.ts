import { create } from 'zustand';

type CreateCommunityModalStore = {
	isOpen: boolean;
	onOpen: () => void;
	onClose: () => void;
};

const useCreateCommunityModal = create<CreateCommunityModalStore>((set) => ({
	isOpen: false,
	onOpen: () => set({ isOpen: true }),
	onClose: () => set({ isOpen: false }),
}));

export default useCreateCommunityModal;
