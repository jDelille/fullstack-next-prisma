'use client'

import { usePathname, useRouter } from 'next/navigation';
import styles from './MobileNavbar.module.scss'
import { GiHamburgerMenu } from 'react-icons/gi'
import { useEffect, useState } from 'react';
import { SafeUser } from '@/app/types';
import { Group } from '@prisma/client';
import UserMenu from '../UserMenu';

type MobileNavbarProps = {
 currentUser: SafeUser | null;
 groups: Group[] | null
}

const MobileNavbar: React.FC<MobileNavbarProps> = ({ currentUser, groups }) => {
 const router = useRouter()
 const pathname = usePathname()

 const [isMenuOpen, setIsMenuOpen] = useState(false)

 useEffect(() => {
  setIsMenuOpen(false)
 }, [pathname])

 return (
  <div className={styles.mobileNavbar}>
   <div className={styles.menu}>
    <GiHamburgerMenu size={18} onClick={() => setIsMenuOpen(true)} />
   </div>

   <div className={isMenuOpen ? styles.userMenu : styles.hideUserMenu}>
    <UserMenu currentUser={currentUser} groups={groups} setIsMenuOpen={setIsMenuOpen} />
   </div>

  </div>
 );
}

export default MobileNavbar;