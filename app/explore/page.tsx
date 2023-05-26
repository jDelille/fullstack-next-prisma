import dynamic from 'next/dynamic';
import getPosts from '../actions/getPosts';
import getCurrentUser from '../actions/getCurrentUser';
import styles from './page.module.scss';
import getUsers from '../actions/getUsers';

const Explore = async () => {
 const posts = await getPosts();
 const currentUser = await getCurrentUser();
 const users = await getUsers();

 const DynamicPostFeed = dynamic(
  () => import('../components/post-feed/PostFeed'),
  {
   loading: () => <p>Loading...</p>,
  }
 );

 return (
  <div className={styles.page}>
   <div className={styles.exploreHeader}>
    Explore
   </div>
   <DynamicPostFeed posts={posts} currentUser={currentUser} users={users} />
  </div>
 );
}

export default Explore;