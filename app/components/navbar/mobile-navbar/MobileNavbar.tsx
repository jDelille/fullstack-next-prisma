'use client'

import { usePathname, useRouter } from 'next/navigation';
import styles from './MobileNavbar.module.scss'
import { GiHamburgerMenu } from 'react-icons/gi'
import { useEffect, useState } from 'react';
import { SafeUser } from '@/app/types';
import { Group } from '@prisma/client';
import UserMenu from '../UserMenu';
import UserBox from '../UserBox';

type MobileNavbarProps = {
 currentUser: SafeUser | null;
 groups: Group[] | null
}

const MobileNavbar: React.FC<MobileNavbarProps> = ({ currentUser, groups }) => {
 const router = useRouter()
 const pathname = usePathname()
 const [isMenuOpen, setIsMenuOpen] = useState(false)

 const [show, setShow] = useState(true);
 const controlNavbar = () => {
  if (window.scrollY > 100) {
   setShow(window.scrollY < prevScrollY ? true : false);
  } else {
   setShow(true);
  }
  prevScrollY = window.scrollY;
 };

 let prevScrollY = 0;

 useEffect(() => {
  window.addEventListener('scroll', controlNavbar)
  return () => {
   window.removeEventListener("scroll", controlNavbar)
  }
 }, [])



 useEffect(() => {
  setIsMenuOpen(false)
 }, [pathname])

 return (
  <div className={show ? styles.mobileNavbar : styles.hideMobileNavbar}>
   <div className={styles.menu}>
    <GiHamburgerMenu size={18} onClick={() => setIsMenuOpen(true)} />
   </div>

   <div className={isMenuOpen ? styles.userMenu : styles.hideUserMenu}>
    <UserMenu currentUser={currentUser} groups={groups} setIsMenuOpen={setIsMenuOpen} />
    <UserBox currentUser={currentUser} />
   </div>

  </div>
 );
}

export default MobileNavbar;