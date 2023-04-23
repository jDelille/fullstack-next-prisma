import CreatePostForm from '../../create-post-form/CreatePostForm';
import CreatePostInput from '../../create-post-input/CreatePostInput';
import styles from './PostCardComment.module.scss';

type PostCardCommentProps = {
 postId: string;
}

const PostCardComment: React.FC<PostCardCommentProps> = ({ postId }) => {
 return (
  <div className={styles.commentContainer} onClick={(e) => e.stopPropagation()}>
   <CreatePostForm isComment postId={postId} />
  </div >
 );
}

export default PostCardComment;