'use client'

import Image from "next/image";
import styles from './CommunityBox.module.scss';
import Button from "../button/Button";
import { AiFillLock, AiFillUnlock } from 'react-icons/ai'
import { useCallback } from "react";
import useLoginModal from "@/app/hooks/useLoginModal";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export type CommunityProps = {
 id: string;
 name: string,
 description: string,
 photo: string,
 memberIds: string[];
 isPrivate: boolean;
}

type CommunityBoxProps = {
 community: CommunityProps
 currentUserId: string;
}




const CommunityBox: React.FC<CommunityBoxProps> = ({ community, currentUserId }) => {
 const router = useRouter();

 const loginModal = useLoginModal();

 const onJoin = useCallback((id: string) => {
  if (!currentUserId) {
   return loginModal.onOpen();
  }

  axios
   .post(`/api/community/${id}`)
   .then(() => {
    toast.success('Community joined')
    router.refresh()
   })
   .catch(() => {
    toast.error('Something went wrong');
   })
 }, [currentUserId, loginModal, router])

 const onLeave = useCallback((id: string) => {
  if (!currentUserId) {
   return loginModal.onOpen();
  }

  axios
   .delete(`/api/community/${id}`)
   .then(() => {
    toast.success('You left community')
    router.refresh()
   })
   .catch(() => {
    toast.error('Something went wrong');
   })
 }, [currentUserId, loginModal, router])

 const hasJoined = community.memberIds.includes(currentUserId);

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
    {hasJoined ? (
     <Button label='Leave' onClick={() => onLeave(community?.id)} />
    ) : (
     <Button label={community.isPrivate ? 'Request to join' : 'Join'} onClick={() => onJoin(community?.id)} />
    )}
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