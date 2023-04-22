import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useMemo } from 'react';
import { BiDotsVerticalRounded } from "react-icons/bi";
import PostCardMenu from "../post-card-menu/PostCardMenu";
import { SafeUser } from "@/app/types";
import styles from './PostCardHeader.module.scss';
import { formatDistanceToNowStrict } from 'date-fns';
type PostCardHeaderProps = {
 post: any;
 currentUserId?: string;
}


const PostCardHeader: React.FC<PostCardHeaderProps> = ({ post, currentUserId }) => {

 const router = useRouter();
 const [isMenuOpen, setIsMenuOpen] = useState(false)

 const createdAt = useMemo(() => {
  if (!post?.createdAt) {
   return null;
  }

  return formatDistanceToNowStrict(new Date(post?.createdAt));
 }, [post?.createdAt]);



 return (
  <div className={styles.postHeader}>
   <div className={styles.profilePicture} onClick={(e) => { e.stopPropagation(); router.push(`user/${post?.user.id}`) }}>
    <Image
     src={post?.user.profilePicture || '/images/placeholder.png'}
     width={59}
     height={59}
     alt='profile-picture'
    />
   </div>
   <div className={styles.userName}>
    <p>{post?.user.name}</p>
    <span>{post?.user.username}</span>
    <span>Bets {post?.user.totalBets}</span>
   </div>
   <div className={styles.postMenu}>
    <p>{createdAt}</p>
    <BiDotsVerticalRounded onClick={(e) => { e.stopPropagation(); setIsMenuOpen(!isMenuOpen) }} />
    {isMenuOpen && (
     <PostCardMenu postId={post?.id} currentUserId={currentUserId} postUserId={post?.user.id} />
    )}
   </div>
  </div>

 );
}

export default PostCardHeader;