import getUserById from '@/app/actions/getUserById';
import styles from './Page.module.scss';
import getPostsByUserId from '@/app/actions/getPostsByUserId';
import getFollowersCount from '@/app/actions/getFollowersCount';
import getCurrentUser from '@/app/actions/getCurrentUser';
import getGroupsByUserId from '@/app/actions/getGroupsByUserId';
import dynamic from 'next/dynamic';

interface IParams {
 userId?: string;
}

const ProfilePage = async ({ params }: { params: IParams }) => {
 const user = await getUserById(params);
 const posts = await getPostsByUserId(params);
 const followerCount = await getFollowersCount(params);
 const currentUser = await getCurrentUser();

 const groups = await getGroupsByUserId(params);

 const DynamicPostFeed = dynamic(
  () => import('../../components/post-feed/PostFeed'),
  {
   loading: () => <p>Loading...</p>,
  }
 );

 const DynamicProfileHeader = dynamic(
  () => import('../../components/profile-header/ProfileHeader'),
  {
   loading: () => <p>Loading...</p>,
  }
 );

 return (
  <div className={styles.page}>
   <DynamicProfileHeader
    user={user}
    currentUserId={currentUser?.id as string}
    followerCount={followerCount}
    groups={groups.length}
   />
   <div className={styles.profilePosts}>
    <DynamicPostFeed posts={posts} currentUser={currentUser} />
   </div>
  </div>
 );
};

export default ProfilePage;
