'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState, useMemo, useCallback } from 'react';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import PostCardMenu from '../post-card-menu/PostCardMenu';
import styles from './PostCardHeader.module.scss';
import { formatDistanceToNowStrict } from 'date-fns';
import axios from 'axios';
import { toast } from 'react-hot-toast';

type PostCardHeaderProps = {
 post: any;
 currentUserId?: string;
};

const PostCardHeader: React.FC<PostCardHeaderProps> = ({
 post,
 currentUserId,
}) => {
 const router = useRouter();
 const [isMenuOpen, setIsMenuOpen] = useState(false);
 const [id, setId] = useState('');

 const createdAt = useMemo(() => {
  if (!post?.createdAt) {
   return null;
  }

  return formatDistanceToNowStrict(new Date(post?.createdAt));
 }, [post?.createdAt]);

 const onFollow = useCallback(
  (id: string) => {
   setId(id);

   axios
    .post(`api/follow/${post.user.id}`)
    .then(() => {
     toast.success(`You followed ${post.user.name}`);
     router.refresh();
    })
    .catch(() => {
     toast.error('Something went wrong');
    })
    .finally(() => {
     setId('');
    });
  },
  [post.user.id, post.user.name, router]
 );

 const isFollowing = () => {
  if (
   !post.user.followingIds.includes(currentUserId) &&
   post.user.id !== currentUserId
  ) {
   return (
    false
   );
  }

  return true;
 };

 return (
  <div className={styles.postHeader}>
   <div
    className={styles.profilePicture}
    onClick={(e) => {
     e.stopPropagation();
     router.push(`user/${post?.user.id}`);
    }}>
    <Image
     src={post?.user.profilePicture || '/images/placeholder.png'}
     width={59}
     height={59}
     alt='profile-picture'
    />
   </div>
   <div className={styles.userName}>
    <div className={styles.name}>
     <p>{post?.user.name}</p>
     {!isFollowing() && (
      <div
       onClick={(e) => { e.stopPropagation(); onFollow(post.user.id) }}
       className={styles.followBtn}>
       <p>+ Follow</p>
      </div>
     )}
    </div>
    <span>{post?.user.username}</span>
    <span>Bets {post?.user.totalBets}</span>
   </div>
   <div className={styles.postMenu}>
    <p>{createdAt}</p>
    <BiDotsVerticalRounded
     onClick={(e) => {
      e.stopPropagation();
      setIsMenuOpen(!isMenuOpen);
     }}
    />
    {isMenuOpen && (
     <PostCardMenu
      postId={post?.id}
      currentUserId={currentUserId}
      postUserId={post?.user.id}
      onFollow={onFollow}
      isFollowing={isFollowing}
     />
    )}
   </div>
  </div>
 );
};

export default PostCardHeader;
