import getPostById from "@/app/actions/getPostById";
import PostCard from "@/app/components/post-card/PostCard";
import styles from './Page.module.scss';
import getCurrentUser from "@/app/actions/getCurrentUser";
import FeedHeader from "@/app/components/feed-header/FeedHeader";
import { IoArrowBack } from "react-icons/io5";
import CommentFeed from "@/app/components/comment-feed/CommentFeed";


interface IParams {
 postId?: string;
}

const PostPage = async ({ params }: { params: IParams }) => {

 const post = await getPostById(params);
 const currentUser = await getCurrentUser()

 return (
  <div className={styles.page} >
   <FeedHeader label='Back' icon={IoArrowBack} isBack />
   <PostCard post={post} currentUser={currentUser} />
   <CommentFeed
    comments={post as Record<string, any>}
    currentUserId={currentUser?.id}
    followingIds={currentUser?.followingIds}
    isPostPage
   />
  </div>
 )
}

export default PostPage;