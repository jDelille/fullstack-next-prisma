'use client'

import getPosts from "@/app/actions/getPosts";
import PostCard from "../post-card/PostCard";
import styles from './PostFeed.module.scss';


type PostFeedProps = {
 posts: any
}

const PostFeed: React.FC<PostFeedProps> = ({ posts }) => {

 return (
  <div className={styles.postFeed}>
   {posts.map((post: any) => (
    <PostCard post={post} key={post.id} />
   ))}
  </div>
 );
}

export default PostFeed;