'use client';
import { useCallback, useState } from 'react';
import styles from './PostCardFooter.module.scss';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { AiOutlineLike, AiFillLike } from 'react-icons/ai';
import { FaRegCommentDots } from 'react-icons/fa'
import PostCardComment from '../post-card-comment/PostCardComment';
type PostCardFooterProps = {
  postId: string;
  likeCount: number;
  likeArray: string[];
  currentUserId?: string;
  onComment: () => void;
};
const PostCardFooter: React.FC<PostCardFooterProps> = ({
  postId,
  likeCount,
  likeArray,
  currentUserId,
  onComment
}) => {
  const [id, setId] = useState('');
  const router = useRouter();

  const onLike = useCallback(
    (id: string) => {
      setId(id);

      axios
        .post(`/api/like/${id}`)
        .then(() => {
          toast.success('Post liked');
          router.refresh();
        })
        .catch(() => {
          toast.error('Something went wrong');
        })
        .finally(() => {
          setId('');
        });
    },
    [router]
  );

  const onRemoveLike = useCallback(
    (id: string) => {
      setId(id);

      axios
        .delete(`/api/like/${id}`)
        .then(() => {
          toast.success('Post unliked');
          router.refresh();
        })
        .catch(() => {
          toast.error('Something went wrong');
        })
        .finally(() => {
          setId('');
        });
    },
    [router]
  );



  const likeSet = new Set(likeArray);

  const hasLiked = () => {
    return likeSet.has(currentUserId as string);
  }

  return (
    <div className={styles.postCardFooter}>
      <div className={styles.likePost} onClick={(e) => { e.stopPropagation(); !hasLiked() ? onLike(postId) : onRemoveLike(postId) }}>
        {hasLiked() ? (
          <AiFillLike color='dodgerblue' />
        ) : (
          <AiOutlineLike color='white' />
        )}
        {hasLiked() ? 'Liked' : 'Like'}
        <span>{likeCount}</span>{' '}
      </div>
      <div className={styles.comment} onClick={(e) => { e.stopPropagation(); onComment() }}>
        <FaRegCommentDots />
        <p>Comment</p>
        <span>{likeCount}</span>{' '}
      </div>

    </div >
  );
};

export default PostCardFooter;
