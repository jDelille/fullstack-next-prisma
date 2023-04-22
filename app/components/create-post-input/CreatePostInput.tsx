'use client'
import Image from 'next/image';
import styles from './CreatePostInput.module.scss';
import Button from '../button/Button';
import useBetModal from '@/app/hooks/useBetModal';
import ImageUpload from '../image-upload/ImageUpload';
import { useState } from 'react';

const CreatePostInput = () => {

 const betModal = useBetModal();
 const [photo, setPhoto] = useState('');

 return (
  <div className={styles.inputContainer}>
   <div className={styles.inputWrapper}>
    <div className={styles.createPostWrapper}>
     <Button label='Post a bet' onClick={betModal.onOpen} />

     {/* TODO - add textarea and image select for normal posts*/}
     {/* <p>Upload image</p> */}
     {/* <ImageUpload
      value={photo}
      onChange={(image) => setPhoto(image)}
     /> */}
    </div>
   </div>
  </div>
 );
}

export default CreatePostInput;