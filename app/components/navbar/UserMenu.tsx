'use client'
import useRegisterModal from '@/app/hooks/useRegitserModal';
import { useState } from 'react';
import Button from '../button/Button';
import useLoginModal from '@/app/hooks/useLoginModal';

const UserMenu = () => {
 const registerModal = useRegisterModal();
 const loginModal = useLoginModal();

 const [isOpen, setIsOpen] = useState(false)



 return (
  <div>
   <Button label='Sign up' onClick={registerModal.onOpen} />
   <Button label='Log in' onClick={loginModal.onOpen} />

  </div>
 );
}

export default UserMenu;