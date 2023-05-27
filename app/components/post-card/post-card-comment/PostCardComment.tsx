'use client'
import CreateCommentForm from '../../comment-form/CommentForm';
import styles from './PostCardComment.module.scss';

type PostCardCommentProps = {
 postId: string;
 userId?: string;
 userPhoto?: string;
 postUser?: string;
}

const PostCardComment: React.FC<PostCardCommentProps> = ({ postId, userId, userPhoto, postUser }) => {
 return (
  <div className={styles.commentContainer} onClick={(e) => e.stopPropagation()}>
   <CreateCommentForm isComment postId={postId} isBordered={false} userId={userId} userPhoto={userPhoto} placeholder={`Comment on ${postUser}'s post`} />
  </div >
 );
}

export default PostCardComment;