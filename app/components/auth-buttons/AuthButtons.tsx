'use client';

import useLoginModal from '@/app/hooks/useLoginModal';
import Button from '../button/Button';
import styles from './AuthButtons.module.scss';
import useRegisterModal from '@/app/hooks/useRegitserModal';

const AuthButtons = () => {
 const loginModal = useLoginModal();
 const registerModal = useRegisterModal();

 return (
  <div className={styles.authButtons}>
   <Button
    label='Create account'
    onClick={registerModal.onOpen}
    ariaLabel='Create an account'
   />
   <Button
    label='Login'
    onClick={loginModal.onOpen}
    ariaLabel='Login to your account'
   />
  </div>
 );
};

export default AuthButtons;
