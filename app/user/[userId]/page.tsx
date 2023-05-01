import getUserById from '@/app/actions/getUserById';
import styles from './Page.module.scss';
import PostFeed from '@/app/components/post-feed/PostFeed';
import getPostsByUserId from '@/app/actions/getPostsByUserId';
import ProfileMenu from '@/app/components/menu/ProfileMenu';
import getFollowersCount from '@/app/actions/getFollowersCount';
import Avatar from '@/app/components/avatar/Avatar';
import { formatDistanceToNowStrict } from 'date-fns';
import { BsCalendar2WeekFill } from 'react-icons/bs'
import getCurrentUser from '@/app/actions/getCurrentUser';
import VerifiedIcon from '@/app/icons/VerifiedIcon';
import getGroupsByUserId from '@/app/actions/getGroupsByUserId';
import Image from 'next/image';
interface IParams {
 userId?: string;
}

const ProfilePage = async ({ params }: { params: IParams }) => {
 const user = await getUserById(params);
 const posts = await getPostsByUserId(params);
 const followerCount = await getFollowersCount(params);
 const currentUser = await getCurrentUser()
 let joinedDate = formatDistanceToNowStrict(new Date(user?.createdAt as string))

 const groups = await getGroupsByUserId(params)

 return (
  <div className={styles.page}>
   <div className={styles.profileHeader}>
    <div className={styles.top}>
     <div className={styles.profilePicture}>
      <div className={styles.profilePicture}>
       <Avatar src={user?.photo as string} />
      </div>
     </div>
     <div className={styles.profileName}>
      <h1>{user?.name} {user?.isVerified && <VerifiedIcon />} </h1>
      <p>{user?.username}</p>
     </div>
     <ProfileMenu userId={user?.id} username={user?.name} currentUserId={currentUser?.id} />
    </div>
    <div className={styles.middle}>
     <div className={styles.bio}>
      <p>{user?.bio}</p>
      <div className={styles.points}>
       <Image src={'/images/star.png'} alt='star' width={15} height={15} />
       <span>{user?.points || 0}</span>

      </div>
      <div className={styles.joined}>
       <BsCalendar2WeekFill />
       <p>joined {joinedDate} ago</p>
      </div>
     </div>
    </div>
    <div className={styles.bottom}>
     <div className={styles.userInfo}>
      <p>Followers</p>
      <p>{followerCount || 0}</p>
     </div>
     <div className={styles.userInfo}>
      <p>Following</p>
      <p>{user?.followingIds.length || 0}</p>
     </div>
     <div className={styles.userInfo}>
      <p>Bets</p> <p>{user?.totalBets}</p>
     </div>
     <div className={styles.userInfo}>
      <p>Groups</p> <p>{groups.length || 0}</p>
     </div>
    </div>
   </div>
   <div className={styles.profilePosts}>
    <PostFeed posts={posts} currentUser={currentUser} />
   </div>
  </div>
 );
};

export default ProfilePage;
