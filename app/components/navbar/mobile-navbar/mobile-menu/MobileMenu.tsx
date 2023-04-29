'use client'

import { AiFillHome } from 'react-icons/ai';
import styles from './MobileMenu.module.scss';
import { FaUserAlt, FaUsers } from 'react-icons/fa';
import { BiMoneyWithdraw } from 'react-icons/bi';
import { SafeUser } from '@/app/types';
import { Community } from '@prisma/client';
import { usePathname } from 'next/navigation';
import MenuItem from '../../MenuItem';


type MobileMenuProps = {
 currentUser: SafeUser | null;
 communities: Community[] | null

}

const MobileMenu: React.FC<MobileMenuProps> = ({ currentUser, communities }) => {

 const pathname = usePathname()
 const linkStyle = pathname === '/notifications' ? styles.activeLink : styles.Link

 const navlinks = [
  {
   id: 0,
   icon: AiFillHome,
   label: 'Home',
   href: '/'
  },
  {
   id: 1,
   icon: FaUserAlt,
   label: 'Profile',
   href: `/user/${currentUser?.id}`
  },
  {
   id: 2,
   icon: BiMoneyWithdraw,
   label: 'My Bets',
   href: `/myBets/${currentUser?.id}`
  },
  {
   id: 3,
   icon: FaUsers,
   label: 'Communities',
   href: `/community`
  },
 ]

 return (
  <div className={styles.mobileMenu}>
   {navlinks.map((link) => (
    <MenuItem key={link.id} icon={link.icon} label={link.label} href={link.href} />
   ))}
  </div>
 );
}

export default MobileMenu;