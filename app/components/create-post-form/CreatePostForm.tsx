'use client'
import Image from 'next/image';
import styles from './CreatePostForm.module.scss';
import Button from '../button/Button';
import useBetModal from '@/app/hooks/useBetModal';
import ImageUpload from '../image-upload/ImageUpload';
import { useState } from 'react';
import CreatePostInput from '../create-post-input/CreatePostInput';

const CreatePostForm = () => {

 const betModal = useBetModal();
 const [photo, setPhoto] = useState('');

 return (
  <div className={styles.inputContainer}>
   <div className={styles.inputWrapper}>
    <div className={styles.createPostWrapper}>
     <CreatePostInput />
     {/* <Button label='Post a bet' onClick={betModal.onOpen} /> */}

     {/* TODO - add textarea and image select for normal posts*/}
     {/* <p>Upload image</p> */}
     {/* <ImageUpload
      value={photo}
      onChange={(image) => setPhoto(image)}
     /> */}
    </div>
    <div className={styles.inputButtons}>
     <Button onClick={betModal.onOpen} label='Post a bet' />
     <Button onClick={betModal.onOpen} label='Post a picture' />
     <Button onClick={betModal.onOpen} label='Post a poll' />


     <Button onClick={() => { }} label='Post' />
    </div>

   </div>
  </div>
 );
}

export default CreatePostForm;