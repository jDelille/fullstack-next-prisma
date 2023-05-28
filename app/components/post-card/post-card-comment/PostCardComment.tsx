'use client'
import CreateCommentForm from '../../comment-form/CommentForm';
import styles from './PostCardComment.module.scss';

type PostCardCommentProps = {
 postId: string;
 userId?: string;
 userPhoto?: string;
 postUser?: string;
 username?: string;
}

const PostCardComment: React.FC<PostCardCommentProps> = ({ postId, userId, userPhoto, postUser, username }) => {
 return (
  <div className={styles.commentContainer} onClick={(e) => e.stopPropagation()}>
   <CreateCommentForm isComment postId={postId} isBordered={false} userId={userId} userPhoto={userPhoto} placeholder={userId ? `Comment as ${username}` : `Sign in to comment`} />
  </div >
 );
}

export default PostCardComment;