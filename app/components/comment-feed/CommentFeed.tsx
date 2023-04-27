import CommentItem from "./comment-item/CommentItem";

type CommentFeedProps = {
 comments?: Record<string, any>
 currentUserId?: string;
 followingIds?: string[]
}


const CommentFeed: React.FC<CommentFeedProps> = ({ comments, currentUserId, followingIds }) => {

 return (
  <div>
   {comments?.comments?.map((comment: any) => (
    <CommentItem key={comment.id} body={comment?.body} userId={comment.userId} userPhoto={comment.photo} userName={comment.userName} commentId={comment.id} likeCount={comment.likedIds.length || 0} likeArray={comment.likedIds} isVerified={comment.isVerified} currentUserId={currentUserId} followingIds={followingIds} />
   ))}
  </div>
 );
}

export default CommentFeed;