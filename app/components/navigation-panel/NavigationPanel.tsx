'use client'

import styles from './NavigationPanel.module.scss';
import { BiHash } from 'react-icons/bi';
import { FaBell, FaUserCircle } from 'react-icons/fa';
import { SafeUser } from '@/app/types';
import NavLink from './Link';
import { MdLogout } from 'react-icons/md';
import { signOut } from 'next-auth/react';
import { IoCreate } from 'react-icons/io5';
import Link from 'next/link';

type NavigationPanelProps = {
 currentUser: SafeUser | null
}

const NavigationPanel: React.FC<NavigationPanelProps> = ({ currentUser }) => {

 const navlinks = [
  {
   id: 0,
   icon: BiHash,
   label: 'Explore',
   href: '/'
  },
  // {
  //  id: 1,
  //  icon: FaUsers,
  //  label: 'Groups',
  //  href: `/groups`
  // },
  {
   id: 1,
   icon: FaUserCircle,
   label: 'Profile',
   href: `/user/${currentUser?.id}`
  },
  {
   id: 2,
   icon: FaBell,
   label: 'Notifications',
   href: `/notifications/${currentUser?.id}`
  },
 ]

 return (
  <div className={styles.navigationPanel}>

   <div className={styles.links}>
    {currentUser && (
     navlinks.map((link) => (
      <NavLink key={link.id} icon={link.icon} label={link.label} href={link.href} />
     ))
    )}

    {!currentUser && (
     navlinks.map((link) => {
      if (link.label !== 'Profile' && link.label !== "Notifications") {
       return (
        <NavLink key={link.id} icon={link.icon} label={link.label} href={link.href} />
       )
      }
     })
    )}

    {currentUser && (
     <div className={styles.createPost}>
      <Link href={'/create-post'}>
       <IoCreate size={20} color="#abadb1" />

      </Link>
     </div>
    )}

   </div>



   {currentUser && (
    <div className={styles.logout}>
     <MdLogout color="#abadb1" size={20} onClick={() => signOut()} />
    </div>
   )}


  </div>
 );
}

export default NavigationPanel;