import Image from "next/image";

type AvatarProps = {
 src?: string;
}

const Avatar: React.FC<AvatarProps> = ({ src }) => {
 return (
  <Image
   src={src || '/images/placeholder.png'}
   width={59}
   height={59}
   alt='profile-picture'
   style={{ objectFit: 'cover' }}
  />
 );
}

export default Avatar;