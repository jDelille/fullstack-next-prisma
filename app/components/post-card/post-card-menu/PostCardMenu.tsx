'use client';

import axios from 'axios';
import { toast } from 'react-hot-toast';
import { use, useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './PostCardMenu.module.scss';

type PostCardMenuProps = {
  postId: string;
  currentUserId?: string;
  postUserId?: string;
  onFollow: (value: string) => void;
  isFollowing?: boolean
};

const PostCardMenu: React.FC<PostCardMenuProps> = ({
  postId,
  currentUserId,
  postUserId,
  onFollow,
  isFollowing
}) => {
  const router = useRouter();

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

  const onPinPost = useCallback((id: string) => {
    axios.post(`/api/pin/${id}`)
      .then(() => {
        toast.success('Pinned post');
        router.refresh()
      })
      .catch(() => {
        toast.error('Something went wrong')
      })
  }, [router])

  const onUnPinPost = useCallback((id: string) => {
    axios.delete(`/api/pin/${id}`)
      .then(() => {
        toast.success('Pinned post');
        router.refresh()
      })
      .catch(() => {
        toast.error('Something went wrong')
      })
  }, [router])

  return (
    <div className={styles.postCardMenu}>
      {postUserId === currentUserId ? (
        <>

          <p
            onClick={(e) => {
              e.stopPropagation();
              onPinPost(postId);
            }}>
            Pin Post
          </p>
          <p
            onClick={(e) => {
              e.stopPropagation();
              onUnPinPost(postId);
            }}>
            Unpin Post
          </p>
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
      )}
    </div>
  );
};

export default PostCardMenu;
