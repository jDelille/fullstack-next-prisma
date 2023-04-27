import { useCallback, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import useLoginModal from './useLoginModal';

const useFollow = (userId: string, username: string, currentUserId: string) => {
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
				});
		} catch (error) {
			toast.error('Something went wrong');
			setIsLoading(false);
			router.refresh();
		}
	}, [currentUserId, loginModal, router, userId, username]);

	return { handleFollow, isLoading };
};

export default useFollow;
