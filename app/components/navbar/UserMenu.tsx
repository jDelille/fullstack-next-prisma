'use client'
import useRegisterModal from '@/app/hooks/useRegitserModal';
import { useState } from 'react';
import Button from '../button/Button';

const UserMenu = () => {
 const registerModal = useRegisterModal();
 const [isOpen, setIsOpen] = useState(false)



 return (
  <div>
   <Button label='Sign up' onClick={registerModal.onOpen} />
  </div>
 );
}

export default UserMenu;