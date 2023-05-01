
import { SafeUser } from '@/app/types';
import Button from '../button/Button';
import useLoginModal from '@/app/hooks/useLoginModal';
import { signOut } from 'next-auth/react'
import styles from './Navbar.module.scss';
import { usePathname, useRouter } from 'next/navigation';
import { AiFillHome, AiOutlineClose } from 'react-icons/ai'
import { FaUserAlt, FaUsers } from 'react-icons/fa'
import { BiMoneyWithdraw } from 'react-icons/bi'
import { MdAddCircle, MdNotifications } from 'react-icons/md'
import MenuItem from './MenuItem';
import useCreateGroupModal from '@/app/hooks/useCreateGroupModal';
import { Group } from '@prisma/client';


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
   label: 'Groups',
   href: `/groups`
  },
 ]
 const pathname = usePathname()
 const linkStyle = pathname === '/notifications' ? styles.activeLink : styles.Link

 console.log(groups)
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

      <div onClick={() => router.push(`/notifications/${currentUser?.id}`)} className={linkStyle} >
       {/* <MdNotifications /> */}
       <p>Notifications</p>
       {currentUser?.hasNotification && <div className={styles.notificationDot}></div>}
      </div >
      <div className={styles.logoutWrapper}>
       <Button label='Logout' onClick={() => signOut()} />
      </div>
     </>
    ) : (
     <>
      <div onClick={() => { router.push('/') }} className={styles.Link}>
       <AiFillHome size={20} />
       <p>Home</p>
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
   {/* <div className={styles.events}>
    <p className={styles.label}>Events <span>0</span></p>
    <div className={styles.Link}>
     <MdAddCircle size={20} />
     <p>Comming soon...</p>
    </div>
   </div> */}
  </div>
 );
}

export default UserMenu;