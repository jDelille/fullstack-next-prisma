
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
import useCreateCommunityModal from '@/app/hooks/useCreateCommunityModal';
import Image from 'next/image';
import MenuItem from './MenuItem';


type UserMenu = {
 currentUser?: SafeUser | null
 communities?: any
 setIsMenuOpen?: (value: boolean) => void;
}



const UserMenu: React.FC<UserMenu> = ({ currentUser, communities, setIsMenuOpen }) => {
 const loginModal = useLoginModal();
 const router = useRouter();
 const createCommunityModal = useCreateCommunityModal();

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
   href: `/community`
  },
 ]
 const pathname = usePathname()
 const linkStyle = pathname === '/notifications' ? styles.activeLink : styles.Link


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
   <div className={styles.communities}>
    <p className={styles.label}>Groups<span>{communities.length}</span></p>
    <div className={styles.createButton} onClick={currentUser ? createCommunityModal.onOpen : loginModal.onOpen}>
     <MdAddCircle size={20} color='#20b46a' />
     <p >Create a group</p>
    </div>
    {communities.map((community: any) => (
     <div key={community.id} className={styles.community} onClick={() => { router.push(`/community/${community.id}`) }}>
      <div className={styles.image}>
       <p>{community.photo}</p>
      </div>
      <div className={styles.name}>
       <p>{community.name}</p>
       <p className={styles.members}>{community.memberIds.length} members</p>
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