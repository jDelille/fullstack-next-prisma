import Avatar from "../../avatar/Avatar";
import styles from './CommentItem.module.scss';

type CommentItemProps = {
 body?: string;
 userId?: string;
 userPhoto?: string
 userName?: string;
}

const CommentItem: React.FC<CommentItemProps> = ({ body, userId, userPhoto, userName }) => {
 return (
  <div className={styles.commentItem}>
   <div className={styles.commentBody}>
    <Avatar src={userPhoto} userId={userId} />
    <div className={styles.name}>
     <p className={styles.username}>{userName}:
      <span className={styles.body}>{body}</span></p>
    </div>

   </div >
  </div >
 );
}

export default CommentItem;