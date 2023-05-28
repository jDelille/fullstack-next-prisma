import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from './Avatar.module.scss';

type AvatarProps = {
 src: string;
 userId: string;
}

const Avatar: React.FC<AvatarProps> = ({ src, userId }) => {
 const router = useRouter();

 const onClick = (e: React.MouseEvent<HTMLImageElement>) => {
  e.stopPropagation();
  if (userId) {
   router.push(`/user/${userId}`);
  }
 };

 return (
  <Image
   src={src || '/images/placeholder.png'}
   width={43}
   height={43}
   className={styles.avatar}
   alt='profile-picture'
   style={{ objectFit: 'cover' }}
   quality={100}
   onClick={onClick}
  />
 );
};

export default Avatar;