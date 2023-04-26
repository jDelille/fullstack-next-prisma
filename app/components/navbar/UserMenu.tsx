
import { SafeUser } from '@/app/types';
import useRegisterModal from '@/app/hooks/useRegitserModal';
import Button from '../button/Button';
import useLoginModal from '@/app/hooks/useLoginModal';
import { signOut } from 'next-auth/react'
import styles from './Navbar.module.scss';
import { useRouter } from 'next/navigation';
import { AiFillHome } from 'react-icons/ai'
import { FaUserAlt } from 'react-icons/fa'
import { BiMoneyWithdraw } from 'react-icons/bi'
type UserMenu = {
 currentUser?: SafeUser | null
}

const UserMenu: React.FC<UserMenu> = ({ currentUser }) => {
 const registerModal = useRegisterModal();
 const loginModal = useLoginModal();
 const router = useRouter();

 return (
  <div className={styles.userMenu}>
   {currentUser ? (
    <>
     <div onClick={() => { router.push('/') }} className={styles.Link}>
      <AiFillHome size={20} />
      <p>Home</p>
     </div>
     <div onClick={() => router.push(`/user/${currentUser?.id}`)} className={styles.Link}>
      <FaUserAlt size={20} />
      <p>My Profile</p>
     </div>
     <div onClick={() => router.push(`/myBets/${currentUser?.id}`)} className={styles.Link}>
      <BiMoneyWithdraw size={20} />
      <p>My Bets</p>
     </div>
     {/* <Button label='Subscriptions' onClick={loginModal.onOpen} />
     <Button label='Notifications' onClick={loginModal.onOpen} /> */}
     <div className={styles.logoutWrapper}>
      <Button label='Logout' onClick={() => signOut()} />
     </div>
    </>
   ) : (
    <>
     <Button label='Sign up' onClick={registerModal.onOpen} />
     <Button label='Log in' onClick={loginModal.onOpen} />
    </>
   )}
  </div>
 );
}

export default UserMenu;