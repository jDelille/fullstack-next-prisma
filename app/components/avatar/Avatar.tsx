'use client'

import Image from "next/image";
import { useRouter } from "next/navigation";

type AvatarProps = {
 src?: string;
 userId?: string;
}

const Avatar: React.FC<AvatarProps> = ({ src, userId }) => {

 const router = useRouter()


 return (
  <Image
   src={src || '/images/placeholder.png'}
   width={59}
   height={59}
   alt='profile-picture'
   style={{ objectFit: 'cover' }}
   onClick={(e) => { e.stopPropagation(); router.push(`user/${userId}`) }}
  />
 );
}

export default Avatar;