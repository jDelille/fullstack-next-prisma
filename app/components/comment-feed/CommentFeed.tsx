import CommentItem from "./comment-item/CommentItem";

type CommentFeedProps = {
 comments?: Record<string, any>
}


const CommentFeed: React.FC<CommentFeedProps> = ({ comments }) => {

 return (
  <div>
   {comments?.comments?.map((comment: any) => (
    <CommentItem key={comment.id} body={comment?.body} userId={comment.userId} userPhoto={comment.photo} userName={comment.userName} commentId={comment.id} likeCount={comment.likedIds.length || 0} likeArray={comment.likedIds} isVerified={comment.isVerified} />
   ))}
  </div>
 );
}

export default CommentFeed;