import getPostById from "@/app/actions/getPostById";
import PostCard from "@/app/components/post-card/PostCard";
import styles from './Page.module.scss';
import getCurrentUser from "@/app/actions/getCurrentUser";

interface IParams {
 postId?: string;
}

const PostPage = async ({ params }: { params: IParams }) => {

 const post = await getPostById(params);

 return (
  <div className={styles.page} >
   <PostCard post={post} />
  </div>
 )
}

export default PostPage;