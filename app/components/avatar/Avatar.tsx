'use client'

import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from './Avatar.module.scss';

type AvatarProps = {
 src?: string;
 userId?: string;
}

const Avatar: React.FC<AvatarProps> = ({ src, userId }) => {

 const router = useRouter()


 return (
  <Image
   src={src || '/images/placeholder.png'}
   width={40}
   height={40}
   className={styles.avatar}
   alt='profile-picture'
   style={{ objectFit: 'cover' }}
   onClick={(e) => { e.stopPropagation(); router.push(`user/${userId}`) }}
  />
 );
}

export default Avatar;