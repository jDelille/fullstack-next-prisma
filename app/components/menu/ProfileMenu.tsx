'use client'
import { useCallback, useState } from 'react';
import { BiDotsVerticalRounded } from "react-icons/bi";
import styles from './ProfileMenu.module.scss';
import useEditProfileModal from '@/app/hooks/useEditProfileModal';
import useFollow from '@/app/hooks/useFollow';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

type ProfileMenuProps = {
 userId?: string;
 username?: string;
 currentUserId?: string
 isCommunityPage?: boolean;
}

const ProfileMenu: React.FC<ProfileMenuProps> = ({ userId, username, currentUserId, isCommunityPage }) => {
 const router = useRouter();

 const [isMenuOpen, setIsMenuOpen] = useState(false);

 const editProfileModal = useEditProfileModal();

 const { handleFollow, handleUnfollow, isLoading } = useFollow(userId as string, username as string, currentUserId as string, setIsMenuOpen)


 const onDeleteCommunity = useCallback(
  (id: string) => {
   axios
    .delete(`/api/community/${id}`)
    .then(() => {
     toast.success('Community deleted');
     router.refresh();
    })
    .catch(() => {
     toast.error('Something went wrong');
    })
    .finally(() => { });
  },
  [router]
 );



 return (
  <div className={styles.profileMenuContainer}>
   {currentUserId === userId && (
    <>
     <BiDotsVerticalRounded size={24} onClick={() => setIsMenuOpen(!isMenuOpen)} />
     {isMenuOpen && (
      <>
       {isCommunityPage ? (
        <>
         <div className={styles.profileMenu}>
          <p onClick={() => editProfileModal.onOpen()}>Edit</p>
          <p onClick={() => editProfileModal.onOpen()}>Delete </p>
         </div>
        </>
       ) : (
        <>
         <div className={styles.profileMenu}>
          <p onClick={() => editProfileModal.onOpen()}>Edit Profile</p>
         </div>
        </>
       )}

      </>
     )
     }
    </>
   )}
  </div >

 );
}

export default ProfileMenu;