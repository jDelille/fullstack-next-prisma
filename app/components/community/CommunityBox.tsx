'use client'

import Image from "next/image";
import styles from './CommunityBox.module.scss';
import Button from "../button/Button";
import { AiFillLock, AiFillUnlock } from 'react-icons/ai'

export type CommunityProps = {
 id: string;
 name: string,
 description: string,
 photo: string,
 members?: string[];
 isPrivate: boolean;
}

type CommunityBoxProps = {
 community: CommunityProps
}


const CommunityBox: React.FC<CommunityBoxProps> = ({ community }) => {
 return (
  <div key={community.id} className={styles.communityBox}>
   <div className={styles.communityImage}>
    <Image src={community.photo} alt="communityImage" width={100} height={100} />
   </div>
   <div className={styles.communityName}>
    <p className={styles.name}>{community.name}</p>
    <p className={styles.description}>{community.description}</p>
    <p className={styles.members}>Members 78</p>
    <p className={styles.owner}> J Master Bweem</p>
    <Button label={community.isPrivate ? 'Request to join' : 'Join'} onClick={() => { }} />
   </div>
   <div className={styles.privacy}>
    {community.isPrivate ? (
     <>
      <AiFillLock size={16} />
      <p> Private </p>
     </>
    ) : (
     <>
      <AiFillUnlock size={16} />
      <p>Public </p>
     </>
    )}
   </div>
  </div>
 );
}

export default CommunityBox;