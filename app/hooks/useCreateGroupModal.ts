import { create } from 'zustand';

type CreateGroupModalStore = {
	isOpen: boolean;
	onOpen: () => void;
	onClose: () => void;
};

const useCreateGroupModal = create<CreateGroupModalStore>((set) => ({
	isOpen: false,
	onOpen: () => set({ isOpen: true }),
	onClose: () => set({ isOpen: false }),
}));

export default useCreateGroupModal;
