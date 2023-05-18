import VerifiedIcon from "@/app/icons/VerifiedIcon";
import Avatar from "../avatar/Avatar";
import ProfileMenu from "../menu/ProfileMenu";
import CoinIcon from "@/app/icons/CoinIcon";
import { BsCalendar2WeekFill } from "react-icons/bs";
import { SafeUser } from "@/app/types";
import { formatDistanceToNowStrict } from "date-fns";
import styles from './ProfileHeader.module.scss';

type ProfileHeaderProps = {
 user: SafeUser | null;
 currentUserId: string;
 followerCount: number | null;
 groups: number;

}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user, currentUserId, followerCount, groups }) => {

 let joinedDate = formatDistanceToNowStrict(new Date(user?.createdAt as string))

 return (
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
    <ProfileMenu userId={user?.id} username={user?.name} currentUserId={currentUserId} />
   </div>
   <div className={styles.middle}>
    <div className={styles.bio}>
     <p>{user?.bio}</p>
     {/* <div className={styles.record}>
       W / L {" "}
       <span>({record.winCount} - {record.lossCount})</span>
      </div> */}
     <div className={styles.points}>
      {/* <Image src={'/images/star.png'} alt='star' width={15} height={15} /> */}
      <CoinIcon />
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
     <p>Groups</p> <p>{groups || 0}</p>
    </div>
   </div>
  </div>
 );
}

export default ProfileHeader;