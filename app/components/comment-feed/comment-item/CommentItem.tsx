'use client'

import { useRouter } from 'next/navigation';
import Avatar from '../../avatar/Avatar';
import { useCallback, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { AiOutlineLike, AiFillLike } from 'react-icons/ai';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import VerifiedIcon from '@/app/icons/VerifiedIcon';
import useLoginModal from '@/app/hooks/useLoginModal';
import styles from './CommentItem.module.scss';
import CommentMenu from './comment-menu/CommentMenu';

type CommentItemProps = {
  body?: string;
  userId?: string;
  userPhoto?: string;
  userName?: string;
  commentId?: string;
  likeCount?: number;
  likeArray?: string[];
  isVerified?: boolean;
  currentUserId?: string;
  followingIds?: string[];
};

const CommentItem: React.FC<CommentItemProps> = ({
  body,
  userId,
  userPhoto,
  userName,
  commentId,
  likeCount,
  likeArray,
  isVerified,
  currentUserId,
  followingIds
}) => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const onLike = useCallback(
    (id: string) => {
      if (!currentUserId) {
        return loginModal.onOpen();
      }

      axios
        .post(`/api/likeComment/${id}`)
        .then(() => {
          toast.success('Comment liked');
          router.refresh();
        })
        .catch(() => {
          toast.error('Something went wrong');
        })
        .finally(() => { });
    },
    [currentUserId, loginModal, router]
  );

  const onRemoveLike = useCallback(
    (id: string) => {
      axios
        .delete(`/api/likeComment/${id}`)
        .then(() => {
          toast.success('Comment unliked');
          router.refresh();
        })
        .catch(() => {
          toast.error('Something went wrong');
        })
        .finally(() => { });
    },
    [router]
  );

  const likeSet = new Set(likeArray);
  const hasLiked = () => {
    return likeSet.has(userId as string);
  };

  return (
    <div className={styles.commentItem}>
      <div className={styles.commentMenu}>
        <BiDotsVerticalRounded
          onClick={(e) => {
            e.stopPropagation();
            setIsMenuOpen(!isMenuOpen);
          }}
        />
        {isMenuOpen && (
          <CommentMenu commentId={commentId as string} currentUserId={currentUserId} userId={userId} commentUsername={userName} setIsMenuOpen={setIsMenuOpen} followingIds={followingIds} />
        )}

      </div>
      <div className={styles.commentBody}>
        <div className={styles.name}>
          <Avatar src={userPhoto} userId={userId} />
          <p className={styles.username}>
            {userName} {isVerified && <VerifiedIcon />}
          </p>
        </div>
        <div className={styles.body}>
          <p className={styles.body}>{body}</p>
        </div>
      </div>
      <div className={styles.commentFooter}>
        <div
          className={styles.likeBtn}
          onClick={(e) => {
            e.stopPropagation();
            !hasLiked()
              ? onLike(commentId as string)
              : onRemoveLike(commentId as string);
          }}>
          {hasLiked() ? (
            <AiFillLike color='#20b46a' />
          ) : (
            <AiOutlineLike color='white' />
          )}
          {hasLiked() ? 'Liked' : 'Like'}
          <span>{likeCount}</span>
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
