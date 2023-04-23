import { create } from 'zustand';

type EditProfileModalStore = {
	isOpen: boolean;
	onOpen: () => void;
	onClose: () => void;
};

const useEditProfileModal = create<EditProfileModalStore>((set) => ({
	isOpen: false,
	onOpen: () => set({ isOpen: true }),
	onClose: () => set({ isOpen: false }),
}));

export default useEditProfileModal;
