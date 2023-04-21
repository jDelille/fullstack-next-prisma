'use client'
import { SafeUser } from "@/app/types";
import Button from "../button/Button";
import UserMenu from "./UserMenu";
import styles from './Navbar.module.scss';
import Image from "next/image";

type NavbarProps = {
 currentUser?: SafeUser | null
}

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
 return (
  <div className={styles.sidebar}>
   <div className={styles.sidebarHeader}>
    {/* <div className={styles.profileImage}>
     <Image fill src={'/images/placeholder.png'} alt="profile-pic" />
    </div>
    <div className={styles.profileName}>
     <p>{currentUser?.name}</p>
     <span>@{currentUser?.username}</span>
    </div> */}
   </div>
   <UserMenu currentUser={currentUser} />
  </div>
 );
}

export default Navbar;