'use client'
import { User } from '@prisma/client';
import CreateCommentForm from '../../comment-form/CommentForm';
import styles from './PostCardComment.module.scss';

type PostCardCommentProps = {
 postId: string;
 userId?: string;
 userPhoto?: string;
 postUser?: string;
 username?: string;
 users: User[]
}

const PostCardComment: React.FC<PostCardCommentProps> = ({ postId, userId, userPhoto, postUser, username, users }) => {
 return (
  <div className={styles.commentContainer} onClick={(e) => e.stopPropagation()}>
   <CreateCommentForm isComment postId={postId} isBordered={false} userId={userId} userPhoto={userPhoto} placeholder={userId ? `Comment as ${username}` : `Sign in to comment`} users={users} />
  </div >
 );
}

export default PostCardComment;