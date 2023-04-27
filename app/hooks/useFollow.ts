import { useCallback, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import useLoginModal from './useLoginModal';

const useFollow = (
	userId: string,
	username: string,
	currentUserId: string,
	setIsMenuOpen?: (value: boolean) => void
) => {
	const [isLoading, setIsLoading] = useState(false);
	const loginModal = useLoginModal();
	const router = useRouter();

	const handleFollow = useCallback(() => {
		setIsLoading(true);

		if (!currentUserId) {
			return loginModal.onOpen();
		}

		try {
			axios
				.post(`api/follow/${userId}`)
				.then(() => {
					toast.success(`You followed ${username}`);
					router.refresh();
				})
				.catch(() => {
					toast.error('Something went wrong');
				})
				.finally(() => {
					setIsLoading(false);
					if (setIsMenuOpen) {
						setIsMenuOpen(false);
					}
				});
		} catch (error) {
			toast.error('Something went wrong');
			setIsLoading(false);
			router.refresh();
		}
	}, [currentUserId, loginModal, router, setIsMenuOpen, userId, username]);

	const handleUnfollow = useCallback(() => {
		setIsLoading(true);

		if (!currentUserId) {
			return loginModal.onOpen();
		}

		try {
			axios
				.delete(`/api/follow/${userId}`)
				.then(() => {
					toast.success(`You unfollowed ${username}`);
					router.refresh();
				})
				.catch(() => {
					toast.error('Something went wrong');
				})
				.finally(() => {
					if (setIsMenuOpen) {
						setIsMenuOpen(false);
					}
				});
		} catch (error) {
			toast.error('Something went wrong');
			setIsLoading(false);
			router.refresh();
		}
	}, [currentUserId, loginModal, router, setIsMenuOpen, userId, username]);

	return { handleFollow, handleUnfollow, isLoading };
};

export default useFollow;
