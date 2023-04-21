'use client'
import Image from 'next/image';
import styles from './CreatePostInput.module.scss';
import Button from '../button/Button';
import useBetModal from '@/app/hooks/useBetModal';

const CreatePostInput = () => {

 const betModal = useBetModal();

 return (
  <div className={styles.inputContainer}>
   <div className={styles.inputWrapper}>
    <div className={styles.createPostWrapper}>
     {/* TODO - add textarea and image select for normal posts*/}
     <Button label='Post a bet' onClick={betModal.onOpen} />
    </div>
   </div>
  </div>
 );
}

export default CreatePostInput;