'use client'
import { useState } from 'react';
import { BiDotsVerticalRounded } from "react-icons/bi";
import styles from './ProfileMenu.module.scss';
import useEditProfileModal from '@/app/hooks/useEditProfileModal';
import useFollow from '@/app/hooks/useFollow';

type ProfileMenuProps = {
 userId?: string;
 username?: string;
 currentUserId?: string
}

const ProfileMenu: React.FC<ProfileMenuProps> = ({ userId, username, currentUserId }) => {

 const [isMenuOpen, setIsMenuOpen] = useState(false);

 const editProfileModal = useEditProfileModal();

 const { handleFollow, handleUnfollow, isLoading } = useFollow(userId as string, username as string, currentUserId as string, setIsMenuOpen)


 return (
  <div className={styles.profileMenuContainer}>
   {currentUserId === userId && (
    <>
     <BiDotsVerticalRounded size={24} onClick={() => setIsMenuOpen(!isMenuOpen)} />
     {isMenuOpen && (
      <>
       <div className={styles.profileMenu}>
        <p onClick={() => editProfileModal.onOpen()}>Edit Profile</p>
       </div>
      </>
     )}
    </>
   )}
  </div>

 );
}

export default ProfileMenu;