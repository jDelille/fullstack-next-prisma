'use client';

import axios from 'axios';
import { toast } from 'react-hot-toast';
import { use, useCallback, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './PostCardMenu.module.scss';
import usePinPost from '@/app/hooks/usePinPost';

type PostCardMenuProps = {
  postId: string;
  currentUserId?: string;
  postUserId?: string;
  onFollow: (value: string) => void;
  isFollowing?: boolean
  setIsMenuOpen: (value: boolean) => void;
  isPinned: boolean;
};

const PostCardMenu: React.FC<PostCardMenuProps> = ({
  postId,
  currentUserId,
  postUserId,
  onFollow,
  isFollowing,
  setIsMenuOpen,
  isPinned
}) => {
  const router = useRouter();

  const { handlePinPost, handleUnPinPost, isLoading } = usePinPost(postId as string, currentUserId as string, setIsMenuOpen);

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

  const onUnFollow = useCallback(
    (id: string) => {
      axios
        .delete(`/api/follow/${id}`)
        .then(() => {
          toast.success(`You unfollowed ${postUserId}`);
          router.refresh();
        })
        .catch(() => {
          toast.error('Something went wrong');
        })
        .finally(() => { });
    },
    [postUserId, router]
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
                onUnFollow(postUserId as string);
              }}>
              Unfollow
            </p>
          ) : (
            <p
              onClick={(e) => {
                e.stopPropagation();
                onFollow(postUserId as string);
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
