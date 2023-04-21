'use client'
import { SafeUser } from '@/app/types';
import useRegisterModal from '@/app/hooks/useRegitserModal';
import { useState } from 'react';
import Button from '../button/Button';
import useLoginModal from '@/app/hooks/useLoginModal';
import { signOut } from 'next-auth/react'
import styles from './Navbar.module.scss';

type UserMenu = {
 currentUser?: SafeUser | null
}

const UserMenu: React.FC<UserMenu> = ({ currentUser }) => {
 const registerModal = useRegisterModal();
 const loginModal = useLoginModal();

 const [isOpen, setIsOpen] = useState(false)



 return (
  <div className={styles.userMenu}>
   {currentUser ? (
    <>
     <Button label='My Profile' onClick={loginModal.onOpen} />
     <Button label='My Bets' onClick={loginModal.onOpen} />
     <Button label='Subscriptions' onClick={loginModal.onOpen} />
     <Button label='Notifications' onClick={loginModal.onOpen} />

   
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