
import getUserById from "@/app/actions/getUserById";
import styles from './Page.module.scss';
import Image from "next/image";
import { BiDotsVerticalRounded } from 'react-icons/bi';
import PostFeed from "@/app/components/post-feed/PostFeed";
import getPostsByUserId from "@/app/actions/getPostsByUserId";
import ProfileMenu from "@/app/components/menu/ProfileMenu";

interface IParams {
 userId?: string;
}

const ProfilePage = async ({ params }: { params: IParams }) => {

 const user = await getUserById(params);
 const posts = await getPostsByUserId(params)

 return (
  <div className={styles.page}>
   <div className={styles.profileHeader}>
    <div className={styles.top}>
     <div className={styles.profilePicture}>
      <div
       className={styles.profilePicture}
      >
       <Image
        src={'/images/placeholder.png'}
        width={59}
        height={59}
        alt='profile-picture'
       />
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
     <div>Followers</div>
     <div>Following</div>
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