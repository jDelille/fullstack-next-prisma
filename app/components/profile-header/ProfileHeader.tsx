'use client'

import VerifiedIcon from "@/app/icons/VerifiedIcon";
import Avatar from "../avatar/Avatar";
import ProfileMenu from "../menu/ProfileMenu";
import CoinIcon from "@/app/icons/CoinIcon";
import { BsCalendar2WeekFill } from "react-icons/bs";
import { SafeUser } from "@/app/types";
import { format } from 'date-fns';
import styles from './ProfileHeader.module.scss';
import LogoIcon from "@/app/icons/LogoIcon";
import useEditProfileModal from "@/app/hooks/useEditProfileModal";

type ProfileHeaderProps = {
  user: SafeUser | null;
  currentUserId: string;
  followerCount: number | null;
  groups: number;
  bio: string;

}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user, currentUserId, followerCount, groups, bio }) => {

  const editProfileModal = useEditProfileModal();

  let joinedDate = format(new Date(user?.createdAt as string), 'MMMM dd, yyyy');


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

          {bio && (
            <p>{user?.bio} </p>
          )}

          {!bio && currentUserId === user?.id && (

            <p className={styles.noBioMessage}>Let others know more about you by adding a bio to your profile! <span onClick={editProfileModal.onOpen}>Edit profile</span></p>

          )}
          <div className={styles.points}>
            {/* <Image src={'/images/star.png'} alt='star' width={15} height={15} /> */}
            <CoinIcon />
            <span>{user?.points || 0}</span>
          </div>
          <div className={styles.joined}>
            <p>joined</p>
            <span>{joinedDate}</span>
          </div>
        </div>
      </div>
      {/* <div className={styles.bottom}>
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
      </div> */}
      <div className={styles.userInfo}>
        <p>{followerCount || 0} <span>Followers</span></p>
        <p>{user?.followingIds.length || 0} <span>Following</span></p>
        <p>{user?.totalBets} <span>Bets</span></p>
        <p>{groups || 0} <span>Groups</span></p>
      </div>
    </div>
  );
}

export default ProfileHeader;