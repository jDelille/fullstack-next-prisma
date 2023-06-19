'use client';
import { useCallback, useState } from 'react';
import styles from './PostCardFooter.module.scss';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { AiOutlineLike, AiFillLike } from 'react-icons/ai';
import { FaRegCommentDots, FaComment } from 'react-icons/fa'
import useLoginModal from '@/app/hooks/useLoginModal';
import postPreviewStore from '@/app/store/postPreviewStore';
import { Post } from '@prisma/client';

type PostCardFooterProps = {
  postId: string;
  likeCount: number;
  likeArray: string[];
  currentUserId?: string;
  onComment: () => void;
  commentCount: number
  commentArray: string[]
  hideComment?: boolean;
  post: any
};
const PostCardFooter: React.FC<PostCardFooterProps> = ({
  postId,
  likeCount,
  likeArray,
  currentUserId,
  onComment,
  commentCount,
  commentArray,
  hideComment,
  post
}) => {
  const [id, setId] = useState('');
  const router = useRouter();
  const loginModal = useLoginModal();
  const [localLikeCount, setLocalLikeCount] = useState(likeCount);

  const likeSet = new Set(likeArray);
  const hasLiked = () => {
    return likeSet.has(currentUserId as string);
  }

  const [localHasLiked, setLocalHasLiked] = useState(hasLiked())

  const onLike = useCallback(
    (id: string) => {
      setId(id);

      if (!currentUserId) {
        return loginModal.onOpen()
      }

      setLocalLikeCount((prevLikeCount) => prevLikeCount + 1);
      setLocalHasLiked(true);

      axios
        .post(`/api/like/${id}`)
        .then(() => {
          router.refresh();
        })
        .catch(() => {
          toast.error('Something went wrong');
          setLocalLikeCount((prevLikeCount) => prevLikeCount - 1);
          setLocalHasLiked(false);
        })
        .finally(() => {
          setId('');
        });
    },
    [router, currentUserId, loginModal]
  );

  const onRemoveLike = useCallback(
    (id: string) => {
      setId(id);

      setLocalLikeCount((prevLikeCount) => prevLikeCount - 1);
      setLocalHasLiked(false);

      axios
        .delete(`/api/like/${id}`)
        .then(() => {
          router.refresh();
        })
        .catch(() => {
          toast.error('Something went wrong');
          setLocalLikeCount((prevLikeCount) => prevLikeCount + 1);
          setLocalHasLiked(true);
        })
        .finally(() => {
          setId('');
        });
    },
    [router]
  );

  const openPostPreview = (post: Post) => {
    postPreviewStore.clearPost(); // Clear the previous post (if any)
    postPreviewStore.setOpen(true);
    postPreviewStore.setPost(post);
  };

  const hasComments = () => {
    return commentCount > 0;
  }

  return (
    <div className={styles.postCardFooter}>
      <div className={styles.likePost} onClick={(e) => { e.stopPropagation(); !localHasLiked ? onLike(postId) : onRemoveLike(postId) }}>
        {localHasLiked ? (
          <AiFillLike color='#20b46a' />
        ) : (
          <AiOutlineLike color='white' />
        )}
        {localHasLiked ? 'Liked' : 'Like'}
        <span>{localLikeCount}</span>{' '}
      </div>
      {!hideComment && (
        <div className={styles.comment} onClick={(e) => { e.stopPropagation(); onComment() }}>
          {hasComments() ? (
            <FaComment color='#20b46a' />
          ) : (
            <FaRegCommentDots color='white' />
          )}
          <p>Comment</p>
          <span>{commentCount}</span>{' '}
        </div>
      )}


    </div >
  );
};

export default PostCardFooter;
