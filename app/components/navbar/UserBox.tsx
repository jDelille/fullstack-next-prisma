'use client'

import { SafeUser } from "@/app/types";
import Avatar from "../avatar/Avatar";
import styles from './Navbar.module.scss';
import { MdLogout, MdNotifications } from "react-icons/md";
import { useState } from "react";
import NotificationsPopup from "./NotificationsPopup";
import { signOut } from "next-auth/react";
import { VerifiedBadge } from "@giphy/react-components";
import VerifiedIcon from "@/app/icons/VerifiedIcon";
import LogoIcon from "@/app/icons/LogoIcon";

type UserBoxProps = {
 currentUser?: SafeUser | null;
 notifications?: Notification[] | undefined
}

const UserBox: React.FC<UserBoxProps> = ({ currentUser, notifications }) => {

 const [openMenu, setOpenMenu] = useState(false)
 return (
  <div className={styles.userBoxNav}>
   <div className={styles.userBoxHeader}>
    <Avatar src={currentUser?.photo as string} />
    <div className={styles.userName}>
     <p className={styles.name}>{currentUser?.name} {currentUser?.isVerified && <VerifiedIcon />} </p>
     <p>{currentUser?.username}</p>
    </div>
    {/* <div className={styles.notifications} onClick={() => setOpenMenu(!openMenu)}>
     {currentUser?.hasNotification && (
      <div className={styles.hasNotification}>
       <p>{notifications?.length}</p>
      </div>
     )}
     <MdNotifications color="lightGray" size={20} />
    </div> */}

   </div>
   <div className={styles.userBoxFooter}>
    <p className={styles.points}>{currentUser?.points} pts.</p>
    <div className={styles.icons}>

     <MdLogout color="lightGray" size={18} onClick={() => signOut()} />
    </div>

   </div>

  </div>
 );
}

export default UserBox;