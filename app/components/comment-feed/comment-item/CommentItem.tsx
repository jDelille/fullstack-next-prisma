import { useRouter } from "next/navigation";
import Avatar from "../../avatar/Avatar";
import styles from './CommentItem.module.scss';
import { useCallback } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { AiOutlineLike, AiFillLike } from 'react-icons/ai';
import { BiDotsVerticalRounded } from "react-icons/bi";
import VerifiedIcon from "@/app/icons/VerifiedIcon";

type CommentItemProps = {
  body?: string;
  userId?: string;
  userPhoto?: string
  userName?: string;
  commentId?: string;
  likeCount?: number;
  likeArray?: string[];
  isVerified?: boolean;
}

const CommentItem: React.FC<CommentItemProps> = ({ body, userId, userPhoto, userName, commentId, likeCount, likeArray, isVerified }) => {

  const router = useRouter();

  const onLike = useCallback(
    (id: string) => {

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
    [router]
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

  const likeSet = new Set(likeArray);
  const hasLiked = () => {
    return likeSet.has(userId as string);
  }


  return (
    <div className={styles.commentItem}>
      <div className={styles.commentMenu}>
        <BiDotsVerticalRounded onClick={(e) => { e.stopPropagation(); onDeleteComment(commentId as string) }} />
      </div>
      <div className={styles.commentBody}>
        <Avatar src={userPhoto} userId={userId} />
        <div className={styles.name}>
          <p className={styles.username}>{userName} {isVerified && <VerifiedIcon />}:</p>
          <span className={styles.body}>{body}</span>
        </div>
      </div >
      <div className={styles.commentFooter}>
        <div className={styles.likeBtn} onClick={(e) => { e.stopPropagation(); !hasLiked() ? onLike(commentId as string) : onRemoveLike(commentId as string) }}>
          {hasLiked() ? (
            <AiFillLike color='#20b46a' />
          ) : (
            <AiOutlineLike color='white' />
          )}
          {hasLiked() ? 'Liked' : 'Like'}
          <span>{likeCount}</span>
        </div>

      </div>
    </div >
  );
}

export default CommentItem;