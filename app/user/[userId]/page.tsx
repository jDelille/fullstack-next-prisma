
import getUserById from "@/app/actions/getUserById";
import styles from './Page.module.scss';
import Image from "next/image";
import { BiDotsVerticalRounded } from 'react-icons/bi';
import PostFeed from "@/app/components/post-feed/PostFeed";
import getPostsByUserId from "@/app/actions/getPostsByUserId";
import ProfileMenu from "@/app/components/menu/ProfileMenu";
import getFollowersCount from "@/app/actions/getFollowersCount";
import Avatar from "@/app/components/avatar/Avatar";

interface IParams {
 userId?: string;
}

const ProfilePage = async ({ params }: { params: IParams }) => {

 const user = await getUserById(params);
 const posts = await getPostsByUserId(params)
 const followerCount = await getFollowersCount(params)

 return (
  <div className={styles.page}>
   <div className={styles.profileHeader}>
    <div className={styles.top}>
     <div className={styles.profilePicture}>
      <div
       className={styles.profilePicture}
      >
       <Avatar src={user?.photo as string} />
      </div>
     </div>
     <div className={styles.profileName}>
      <h1>{user?.name}</h1>
      <p>{user?.username}</p>
     </div>

     <ProfileMenu />

    </div>
    <div className={styles.middle}>
     <div className={styles.bio}></div>
     <p>{user?.bio}</p>
    </div>
    <div className={styles.bottom}>
     <div>Followers<p>{followerCount || 0}</p></div>
     <div>Following<p>{user?.followingIds.length || 0}</p></div>
     <div>Bets <p>{user?.totalBets}</p></div>
    </div>
   </div>
   <div className={styles.profilePosts}>
    <PostFeed posts={posts} currentUser={user} />
   </div>
  </div >
 )
}

export default ProfilePage;