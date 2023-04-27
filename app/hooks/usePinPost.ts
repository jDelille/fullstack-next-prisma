import { useCallback, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import useLoginModal from './useLoginModal';

const usePinPost = (
	postId: string,
	currentUserId: string,
	setIsMenuOpen: (value: boolean) => void
) => {
	const [isLoading, setIsLoading] = useState(false);
	const loginModal = useLoginModal();
	const router = useRouter();

	const handlePinPost = useCallback(() => {
		setIsLoading(true);

		if (!currentUserId) {
			return loginModal.onOpen();
		}

		try {
			axios
				.post(`/api/pin/${postId}`)
				.then(() => {
					toast.success('Pinned post');
					router.refresh();
				})
				.catch(() => {
					toast.error('Something went wrong');
				})
				.finally(() => {
					setIsMenuOpen(false);
				});
		} catch (error) {
			toast.error('Something went wrong');
			setIsLoading(false);
			router.refresh();
		}
	}, [currentUserId, loginModal, postId, router, setIsMenuOpen]);

	const handleUnPinPost = useCallback(() => {
		setIsLoading(true);

		if (!currentUserId) {
			return loginModal.onOpen();
		}

		try {
			axios
				.delete(`/api/pin/${postId}`)
				.then(() => {
					toast.success('Unpinned post');
					router.refresh();
				})
				.catch(() => {
					toast.error('Something went wrong');
				})
				.finally(() => {
					setIsMenuOpen(false);
				});
		} catch (error) {
			toast.error('Something went wrong');
			setIsLoading(false);
			router.refresh();
		}
	}, [currentUserId, loginModal, postId, router, setIsMenuOpen]);

	return { handlePinPost, handleUnPinPost, isLoading };
};

export default usePinPost;
