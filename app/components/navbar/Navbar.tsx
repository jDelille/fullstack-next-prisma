'use client'
import { SafeUser } from "@/app/types";
import Button from "../button/Button";
import UserMenu from "./UserMenu";
import styles from './Navbar.module.scss';
import Image from "next/image";
import LogoIcon from "@/app/icons/LogoIcon";

type NavbarProps = {
 currentUser?: SafeUser | null
 groups?: any;

}

const Navbar: React.FC<NavbarProps> = ({ currentUser, groups }) => {



 return (
  <div className={styles.sidebar}>
   <div className={styles.sidebarHeader}>
    <h1>Wagerly</h1>
   </div>
   <UserMenu currentUser={currentUser} groups={groups} />
  </div>
 );
}

export default Navbar;