'use client'

import { useRouter } from 'next/navigation';
import styles from './MobileNavbar.module.scss'
import { GiHamburgerMenu } from 'react-icons/gi'
import { useState } from 'react';
import MobileMenu from './mobile-menu/MobileMenu';
import { SafeUser } from '@/app/types';
import { Community } from '@prisma/client';
import UserMenu from '../UserMenu';

type MobileNavbarProps = {
 currentUser: SafeUser | null;
 communities: Community[] | null
}

const MobileNavbar: React.FC<MobileNavbarProps> = ({ currentUser, communities }) => {
 const router = useRouter()
 const [isMenuOpen, setIsMenuOpen] = useState(false)

 return (
  <div className={styles.mobileNavbar}>
   <div className={styles.menu}>
    <GiHamburgerMenu size={18} onClick={() => setIsMenuOpen(true)} />
   </div>
   {/* <p onClick={() => router.push('/')}>Home</p> */}
   {isMenuOpen && (
    <div className={styles.userMenu}>
     <UserMenu currentUser={currentUser} communities={communities} setIsMenuOpen={setIsMenuOpen} />
    </div>
   )}
  </div>
 );
}

export default MobileNavbar;