import CommentItem from './comment-item/CommentItem';
import styles from './CommentFeed.module.scss';

type CommentFeedProps = {
 comments?: Record<string, any>;
 currentUserId?: string;
 followingIds?: string[];
 isPostPage?: boolean;
};

const CommentFeed: React.FC<CommentFeedProps> = ({
 comments,
 currentUserId,
 followingIds,
 isPostPage,
}) => {
 return (
  <div
   className={isPostPage ? styles.postPageCommentFeed : styles.commentFeed}>
   {comments?.comments?.map((comment: any) => (
    <CommentItem
     key={comment.id}
     body={comment?.body}
     userId={comment.userId}
     userPhoto={comment.photo}
     name={comment.name}
     username={comment.username}
     commentId={comment.id}
     likeCount={comment.likedIds.length || 0}
     likeArray={comment.likedIds}
     isVerified={comment.isVerified}
     currentUserId={currentUserId}
     followingIds={followingIds}
     isPostPage
    />
   ))}
  </div>
 );
};

export default CommentFeed;
