'use client '
import { SafeUser } from '@/app/types';
import useLoginModal from '@/app/hooks/useLoginModal';
import styles from './Navbar.module.scss';
import { usePathname, useRouter } from 'next/navigation';
import { AiFillHome, AiOutlineClose } from 'react-icons/ai'
import { FaBell, FaUser, FaUserCircle, FaUsers } from 'react-icons/fa'
import { TbHash } from 'react-icons/tb'
import { MdAddCircle, MdLogout } from 'react-icons/md'
import MenuItem from './MenuItem';
import useCreateGroupModal from '@/app/hooks/useCreateGroupModal';
import { Group } from '@prisma/client';
import { BiHash } from 'react-icons/bi';
import { signOut } from 'next-auth/react';
import { HiBanknotes } from 'react-icons/hi2';
import { IoCreate } from 'react-icons/io5';

type UserMenu = {
 currentUser?: SafeUser | null
 groups?: Group[] | null
 setIsMenuOpen?: (value: boolean) => void;
}



const UserMenu: React.FC<UserMenu> = ({ currentUser, groups, setIsMenuOpen }) => {
 const loginModal = useLoginModal();
 const router = useRouter();
 const createGroupModal = useCreateGroupModal();

 const navlinks = [
  {
   id: 0,
   icon: BiHash,
   label: 'Explore',
   href: '/'
  },
  {
   id: 1,
   icon: HiBanknotes,
   label: 'Sportsbook',
   href: '/sportsbook'
  },
  {
   id: 2,
   icon: FaUsers,
   label: 'Groups',
   href: `/groups`
  },
  {
   id: 3,
   icon: FaUserCircle,
   label: 'Profile',
   href: `/user/${currentUser?.id}`
  },
  {
   id: 4,
   icon: FaBell,
   label: 'Notifications',
   href: `/notifications/${currentUser?.id}`
  },
  {
   id: 5,
   icon: IoCreate,
   label: 'Create Post',
   href: '/create-post'
  }
 ]
 const pathname = usePathname()


 return (
  <div className={styles.userMenu}>
   <div className={styles.closeMenu} onClick={() => setIsMenuOpen && setIsMenuOpen(false)}>
    <AiOutlineClose color='#20b46a' size={18} />
   </div>
   <div className={styles.pages}>
    <p className={styles.label}>Menu </p>
    {currentUser ? (
     <>
      {navlinks.map((link) => (
       <MenuItem href={link.href} label={link.label} icon={link.icon} key={link.id} />
      ))}
      <div className={styles.Link}>
       <MdLogout size={20} />
       <p onClick={() => signOut()}>Logout</p>
      </div>
     </>
    ) : (
     <>
      <div onClick={() => { router.push('/') }} className={styles.activeLink}>
       <BiHash size={20} />
       <p>Explore</p>
      </div>
     </>
    )}
   </div>
   <div className={styles.groups}>
    <p className={styles.label}>Groups<span>{groups?.length}</span></p>
    <div className={styles.createButton} onClick={currentUser ? createGroupModal.onOpen : loginModal.onOpen}>
     <MdAddCircle size={20} color='#20b46a' />
     <p >Create a group</p>
    </div>
    {groups?.map((group: any) => (
     <div key={group.id} className={styles.group} onClick={() => { router.push(`/groups/${group.id}`) }}>
      <div className={styles.image}>
       <p>{group.photo}</p>
      </div>
      <div className={styles.name}>
       <p>{group.name}</p>
       <p className={styles.members}>{group.memberIds.length} members</p>
      </div>
     </div>
    ))}
   </div>
  </div>
 );
}

export default UserMenu;