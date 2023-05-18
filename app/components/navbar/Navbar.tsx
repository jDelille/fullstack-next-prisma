'use client'

import { SafeUser } from "@/app/types";
import Button from "../button/Button";
import UserMenu from "./UserMenu";
import styles from './Navbar.module.scss';
import Image from "next/image";
import LogoIcon from "@/app/icons/LogoIcon";
import UserBox from "./UserBox";

type NavbarProps = {
 currentUser?: SafeUser | null
 groups?: any;
 notifications?: Notification[] | undefined

}

const Navbar: React.FC<NavbarProps> = ({ currentUser, groups, notifications }) => {



 return (
  <div className={styles.sidebar}>
   <div className={styles.sidebarHeader}>
    <h1>Wagerly</h1>
   </div>
   <UserMenu currentUser={currentUser} groups={groups} />
   <UserBox currentUser={currentUser} notifications={notifications} />
  </div>
 );
}

export default Navbar;