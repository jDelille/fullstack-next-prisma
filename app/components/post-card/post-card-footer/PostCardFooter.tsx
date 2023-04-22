'use client'
import { useCallback, useState } from 'react';
import styles from './PostCardFooter.module.scss';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

type PostCardFooterProps = {
 postId: string;
 likeCount: number;
}
const PostCardFooter: React.FC<PostCardFooterProps> = ({ postId, likeCount }) => {
 const [id, setId] = useState('')
 const router = useRouter();

 const onLike = useCallback((id: string) => {
  setId(id);

  axios.post(`/api/like/${id}`)
   .then(() => {
    toast.success('Post liked')
    router.refresh();
   })
   .catch(() => {
    toast.error('Something went wrong')
   })
   .finally(() => {
    setId('')
   })
 }, [router])

 return (
  <div className={styles.postCardFooter}>
   <p onClick={() => onLike(postId)}>Like Post {likeCount}</p>
  </div>
 );
}

export default PostCardFooter;