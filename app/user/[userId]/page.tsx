import getUserById from '@/app/actions/getUserById';
import styles from './Page.module.scss';
import getPostsByUserId from '@/app/actions/getPostsByUserId';
import getFollowersCount from '@/app/actions/getFollowersCount';
import getCurrentUser from '@/app/actions/getCurrentUser';
import getGroupsByUserId from '@/app/actions/getGroupsByUserId';
import dynamic from 'next/dynamic';
import FeedHeader from '@/app/components/feed-header/FeedHeader';
import { IoArrowBack } from 'react-icons/io5';
import getUsers from '@/app/actions/getUsers';
import { SafeUser } from '@/app/types';
import PostCardSkeleton from '@/app/components/skeletons/post-card-skeleton/PostCardSkeleton';
interface IParams {
 userId?: string;
}

const ProfilePage = async ({ params }: { params: IParams }) => {

 const [user, posts, followerCount, currentUser, groups, users] = await Promise.all([
  getUserById(params),
  getPostsByUserId(params),
  getFollowersCount(params),
  getCurrentUser(),
  getGroupsByUserId(params),
  getUsers(),
 ]);

 const DynamicPostFeed = dynamic(
  () => import('../../components/post-feed/PostFeed'),
  {
   loading: () => (
    <div>
     <PostCardSkeleton />
     <PostCardSkeleton />
     <PostCardSkeleton />
     <PostCardSkeleton />
    </div>
   ),
  }
 );

 const DynamicProfileHeader = dynamic(
  () => import('../../components/profile-header/ProfileHeader'),
  {
   loading: () => (
    <div>
     <PostCardSkeleton />
     <PostCardSkeleton />
     <PostCardSkeleton />
     <PostCardSkeleton />
    </div>
   )
  }
 );

 return (
  <div className={styles.page}>
   <FeedHeader label='Back' icon={IoArrowBack} isBack />
   <DynamicProfileHeader
    user={user}
    currentUserId={currentUser?.id as string}
    followerCount={followerCount}
    groups={groups.length}
    bio={currentUser?.bio as string}
   />
   <div className={styles.profilePosts}>
    <DynamicPostFeed posts={posts} currentUser={currentUser} users={users} isProfilePage user={user as SafeUser} />
   </div>
  </div >
 );
};

export default ProfilePage;
