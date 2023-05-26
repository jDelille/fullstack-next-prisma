import PostCard from "../post-card/PostCard";
import styles from './PostFeed.module.scss';
import { SafeUser } from "@/app/types";


type PostFeedProps = {
 posts: any;
 currentUser: SafeUser | null
 totalBets?: number
}

const PostFeed: React.FC<PostFeedProps> = ({ posts, currentUser }) => {

 return (
  <div className={styles.postFeed}>
   {posts.map((post: any) => (
    <PostCard post={post} key={post.id} currentUser={currentUser} />
   ))}
  </div>
 );
}

export default PostFeed;