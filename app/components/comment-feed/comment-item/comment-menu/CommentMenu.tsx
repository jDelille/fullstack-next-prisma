import { useCallback } from 'react';
import styles from './CommentMenu.module.scss';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import useFollow from '@/app/hooks/useFollow';

type CommentMenuProps = {
	commentId: string;
	currentUserId?: string;
	userId?: string;
	commentUsername?: string;
	followingIds?: string[];
	setIsMenuOpen: (value: boolean) => void;
};
const CommentMenu: React.FC<CommentMenuProps> = ({
	commentId,
	currentUserId,
	userId,
	commentUsername,
	followingIds,
	setIsMenuOpen,
}) => {
	const router = useRouter();

	const { handleFollow, handleUnfollow, isLoading } = useFollow(
		userId as string,
		commentUsername as string,
		currentUserId as string,
		setIsMenuOpen
	);

	let isFollowing = followingIds?.includes(userId as string);

	const onDeleteComment = useCallback(
		(id: string) => {
			axios
				.delete(`/api/deleteComment/${id}`)
				.then(() => {
					toast.success('Comment deleted');
					router.refresh();
				})
				.catch(() => {
					toast.error('Something went wrong');
				})
				.finally(() => {});
		},
		[router]
	);

	return (
		<div className={styles.commentMenu}>
			{currentUserId === userId ? (
				<p onClick={() => onDeleteComment(commentId as string)}>Delete</p>
			) : (
				<>
					{isFollowing ? (
						<p
							onClick={(e) => {
								e.stopPropagation();
								handleUnfollow();
							}}>
							Unfollow
						</p>
					) : (
						<p
							onClick={(e) => {
								e.stopPropagation();
								handleFollow();
							}}>
							Follow
						</p>
					)}
				</>
			)}
		</div>
	);
};

export default CommentMenu;
