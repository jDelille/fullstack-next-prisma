'use client';

import postPreviewStore from '@/app/store/postPreviewStore';
import { observer } from 'mobx-react';

import styles from './PostPreview.module.scss';
import Image from 'next/image';
import { IoCloseSharp } from 'react-icons/io5';


const PostPreview: React.FC = observer(() => {

 const isOpen = postPreviewStore.isOpen
 const post = postPreviewStore.post;

 const closePostPreview = () => {
  postPreviewStore.setOpen(false)
 }

 if (!isOpen) {
  return null;
 }

 return (
  <div className={styles.postPreview}>
   <div onClick={closePostPreview} className={styles.close}>
    <IoCloseSharp size={20} color='white' />
   </div>
   <div className={styles.postUser}>
    <Image
     src={post?.user.photo || '/images/placeholder.png'}
     alt='profile picture'
     width={25}
     height={25}
    />
    <div className={styles.userName}>
     <p>{post?.user.name} <span>@{post?.user.username}</span></p>
    </div>
   </div>
   <p className={styles.body}>{post?.body}</p>

   {post?.photo.url && (
    <div className={styles.media}>
     <Image src={post?.photo.url} alt='photo' height={200} width={267} />
    </div>
   )}

  </div>
 );
});

export default PostPreview;
