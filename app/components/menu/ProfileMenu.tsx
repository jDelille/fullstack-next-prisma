'use client'
import { useState } from 'react';
import { BiDotsVerticalRounded } from "react-icons/bi";
import styles from './ProfileMenu.module.scss';
import useEditProfileModal from '@/app/hooks/useEditProfileModal';

const ProfileMenu = () => {

 const editProfileModal = useEditProfileModal();

 return (
  <div className={styles.profileMenu} onClick={() => editProfileModal.onOpen()}>
   <BiDotsVerticalRounded size={24} />
  </div>
 );
}

export default ProfileMenu;