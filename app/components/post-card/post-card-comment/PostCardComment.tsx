import CreatePostForm from '../../create-post/create-post-form/CreatePostForm';
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
   <CreatePostForm isComment postId={postId} isBordered={false} userId={userId} userPhoto={userPhoto} placeholder={`Comment on ${postUser}'s post`} />
  </div >
 );
}

export default PostCardComment;