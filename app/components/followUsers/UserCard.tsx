'use client'

import { User } from "@prisma/client";
import Image from "next/image";
import styles from './FollowUsers.module.scss';
import VerifiedIcon from "@/app/icons/VerifiedIcon";
import Button from "../button/Button";
import useFollow from "@/app/hooks/useFollow";
type UserCardProps = {
 user: User
 currentUserId?: string;
 followingIds: string[];
}

const UserCard: React.FC<UserCardProps> = ({ user, currentUserId, followingIds }) => {

 const { handleFollow, handleUnfollow, isLoading } = useFollow(user?.id as string, user?.username as string, currentUserId as string)

 let isFollowing = followingIds?.includes(user?.id);


 return (
  <div key={user.id} className={styles.userCard} >
   <Image src={user?.photo as string} alt="profile-picture" width={35} height={35} />
   <div className={styles.userName}>
    <p className={styles.name}>{user?.name} {user?.isVerified && <VerifiedIcon />}</p>
    <p className={styles.username}>{user.username}</p>
   </div>
   <div className={styles.followButton}>
    <Button label={isFollowing ? 'Unfollow' : "Follow"} onClick={isFollowing ? handleUnfollow : handleFollow} />
   </div>

  </div>
 );
}

export default UserCard;