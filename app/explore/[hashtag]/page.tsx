import dynamic from 'next/dynamic';
import getPosts from '../../actions/getPosts';
import getCurrentUser from '../../actions/getCurrentUser';
import styles from '../page.module.scss';

interface IParams {
 hashtag?: string;
}


const ExploreHashtag = async ({ params }: { params: IParams }) => {

 const cleanText = params.hashtag && params.hashtag.replace(/[^A-Za-z\s]/g, "");


 const posts = await getPosts();
 const currentUser = await getCurrentUser();

 const DynamicPostFeed = dynamic(
  () => import('../../components/post-feed/PostFeed'),
  {
   loading: () => <p>Loading...</p>,
  }
 );


 return (
  <div className={styles.page}>
   <div className={styles.exploreHeader}>
    Explore
   </div>
   <DynamicPostFeed posts={posts} currentUser={currentUser} />
  </div>
 );
}

export default ExploreHashtag;