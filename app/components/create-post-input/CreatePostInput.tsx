'use client'

import { useState, useCallback, useRef, useEffect } from 'react';
import styles from './CreatePostInput.module.scss';
import Image from 'next/image';

const CreatePostInput = () => {
 const textAreaRef = useRef<HTMLTextAreaElement>(null);

 const autosize = () => {
  if (textAreaRef.current) {
   var el = textAreaRef.current;
   setTimeout(function () {
    el.style.cssText = 'height:auto; padding:0';
    el.style.cssText = 'height:' + el.scrollHeight + 'px';
   }, 0);
  }
 };

 useEffect(() => {
  if (textAreaRef.current) {
   const textarea = textAreaRef.current;
   textarea.addEventListener('keydown', autosize);

   return () => {
    textarea.removeEventListener('keydown', autosize);
   };
  }
 }, []);

 return (
  <div className={styles.createPostInput}>
   <div className={styles.profilePicture} >
    <Image
     src={'/images/placeholder.png'}
     width={59}
     height={59}
     alt='profile-picture'
    />
   </div>
   <div className={styles.textareaWrapper}>
    <textarea
     // onChange={(event) => {
     //  setBody(event.target.value);
     // }}
     // value={body}
     className={styles.textarea}
     placeholder="What's happening?"
     ref={textAreaRef}
     rows={1}></textarea>
   </div>
  </div>
 );
}

export default CreatePostInput;