'use client';

import VerifiedIcon from '@/app/icons/VerifiedIcon';
import Avatar from '../avatar/Avatar';
import ProfileMenu from '../menu/ProfileMenu';
import CoinIcon from '@/app/icons/CoinIcon';
import { SafeUser } from '@/app/types';
import { format } from 'date-fns';
import styles from './ProfileHeader.module.scss';
import useEditProfileModal from '@/app/hooks/useEditProfileModal';
import { ProfileScreenString } from '@/app/utils/app-string/ProfileScreenString';

type ProfileHeaderProps = {
  user: SafeUser | null;
  currentUserId: string;
  followerCount: number | null;
  groups: number;
  bio: string;
};

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  user,
  currentUserId,
  followerCount,
  groups,
  bio,
}) => {
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
          <h1>
            {user?.name} {user?.isVerified && <VerifiedIcon />}{' '}
          </h1>
          <p>{user?.username}</p>
        </div>
        <ProfileMenu
          userId={user?.id}
          username={user?.name}
          currentUserId={currentUserId}
        />
      </div>
      <div className={styles.middle}>
        <div className={styles.bio}>
          {bio && <p>{user?.bio} </p>}

          {!bio && currentUserId === user?.id && (
            <p className={styles.noBioMessage}>
              {ProfileScreenString.noBioMessage}
              <span onClick={editProfileModal.onOpen}>
                {ProfileScreenString.editProfile}
              </span>
            </p>
          )}
          <div className={styles.points}>
            <CoinIcon />
            <span>{user?.points || 0}</span>
          </div>
          <div className={styles.joined}>
            <p>{ProfileScreenString.joined}</p>
            <span>{joinedDate}</span>
          </div>
        </div>
      </div>
      <div className={styles.userInfo}>
        <p>
          {followerCount || 0} <span>{ProfileScreenString.followers}</span>
        </p>
        <p>
          {user?.followingIds.length || 0}{' '}
          <span>{ProfileScreenString.following}</span>
        </p>
        <p>
          {user?.totalBets} <span>{ProfileScreenString.bets}</span>
        </p>
        <p>
          {groups || 0} <span>{ProfileScreenString.groups}</span>
        </p>
      </div>
    </div>
  );
};

export default ProfileHeader;
