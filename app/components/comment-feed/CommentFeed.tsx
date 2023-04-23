import Avatar from "../avatar/Avatar"

type CommentFeedProps = {
 comments?: Record<string, any>
}


const CommentFeed: React.FC<CommentFeedProps> = ({ comments }) => {
 return (
  <div>
   {comments?.comments?.map((comment: any) => (
    <>
     <Avatar src={comments.user.photo} userId={comment?.userId} />
     <p>{comment?.body}</p>
    </>
   ))}
  </div>
 );
}

export default CommentFeed;