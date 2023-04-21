'use client'

import getPosts from "@/app/actions/getPosts";
import PostCard from "../post-card/PostCard";


type PostFeedProps = {
 posts: any
}

const PostFeed: React.FC<PostFeedProps> = ({ posts }) => {

 return (
  <div>
   {posts.map((post: any) => (
    <PostCard post={post} key={post.id} />
   ))}
  </div>
 );
}

export default PostFeed;