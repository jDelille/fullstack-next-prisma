import { useCallback } from 'react';
import styles from './CommentMenu.module.scss';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

type CommentMenuProps = {
 commentId: string;
 currentUserId?: string;
 userId?: string;
}
const CommentMenu: React.FC<CommentMenuProps> = ({ commentId, currentUserId, userId }) => {
 const router = useRouter();


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
   {currentUserId === userId && (
    <p onClick={() => onDeleteComment(commentId as string)}></p>
   )}
  </div >
 );
}

export default CommentMenu;