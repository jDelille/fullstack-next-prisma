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
}
const CommentMenu: React.FC<CommentMenuProps> = ({ commentId, currentUserId, userId, commentUsername, followingIds }) => {
  const router = useRouter();

  const { handleFollow, isLoading } = useFollow(userId as string, commentUsername as string, currentUserId as string)


  let isFollowing = followingIds?.includes(currentUserId as string);


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
        .finally(() => { });
    },
    [router]
  );

  return (
    <div className={styles.commentMenu}>
      {/* {currentUserId === userId ? (
        <p onClick={() => onDeleteComment(commentId as string)}></p>
      ) : (
        <>
          {isFollowing ? (
            <p onClick={handleFollow}>Unfollow</p>
          ) : (
            <p onClick={handleFollow}>Follow</p>
          )}
        </>

      )} */}
      {currentUserId === userId && (
        <p onClick={() => onDeleteComment(commentId as string)}></p>
      )}
    </div >
  );
}

export default CommentMenu;