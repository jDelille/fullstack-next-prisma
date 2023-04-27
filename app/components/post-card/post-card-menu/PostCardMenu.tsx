'use client';

import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import styles from './PostCardMenu.module.scss';
import usePinPost from '@/app/hooks/usePinPost';
import useFollow from '@/app/hooks/useFollow';

type PostCardMenuProps = {
  postId: string;
  currentUserId?: string;
  postUserId?: string;
  isFollowing?: boolean
  setIsMenuOpen: (value: boolean) => void;
  isPinned: boolean;
  postUsername?: string
};

const PostCardMenu: React.FC<PostCardMenuProps> = ({
  postId,
  currentUserId,
  postUserId,
  isFollowing,
  setIsMenuOpen,
  isPinned,
  postUsername
}) => {
  const router = useRouter();

  const { handlePinPost, handleUnPinPost } = usePinPost(postId as string, currentUserId as string, setIsMenuOpen);

  const { handleFollow, handleUnfollow, isLoading } = useFollow(postUserId as string, postUsername as string, currentUserId as string, setIsMenuOpen)

  const onDelete = useCallback(
    (id: string) => {
      axios
        .delete(`/api/bet/${id}`)
        .then(() => {
          toast.success('Bet deleted');
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
    <div className={styles.postCardMenu}>
      {postUserId === currentUserId ? (
        <>
          {isPinned ? (
            <p
              onClick={(e) => {
                e.stopPropagation();
                handleUnPinPost();
              }}>
              Unpin Post
            </p>
          ) : (
            <p
              onClick={(e) => {
                e.stopPropagation();
                handlePinPost();
              }}>
              Pin Post
            </p>
          )}
          <p
            onClick={(e) => {
              e.stopPropagation();
              onDelete(postId);
            }}>
            Delete
          </p>
        </>
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
      )
      }
    </div >
  );
};

export default PostCardMenu;
