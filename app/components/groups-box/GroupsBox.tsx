'use client'

import { MdAddCircle } from "react-icons/md";
import styles from './GroupsBox.module.scss';
import { Group } from "@prisma/client";
import { SafeUser } from "@/app/types";
import useLoginModal from "@/app/hooks/useLoginModal";
import useCreateGroupModal from "@/app/hooks/useCreateGroupModal";
import { useRouter } from "next/navigation";


type GroupsBoxProps = {
 groups: Group[];
 currentUser: SafeUser | null;
}

const GroupsBox: React.FC<GroupsBoxProps> = ({ groups, currentUser }) => {

 const router = useRouter();
 const loginModal = useLoginModal();
 const createGroupModal = useCreateGroupModal();

 return (
  <div className={styles.groups}>
   <p className={styles.label}>Groups<span>{groups?.length}</span></p>
   {/* <div className={styles.createButton} onClick={currentUser ? createGroupModal.onOpen : loginModal.onOpen}>
    <MdAddCircle size={20} color='#20b46a' />
    <p >Create a group</p>
   </div> */}
   {groups?.map((group: any) => (
    <div key={group.id} className={styles.group} onClick={() => { router.push(`/groups/${group.id}`) }}>
     <div className={styles.image}>
      <p>{group.photo}</p>
     </div>
     <div className={styles.name}>
      <p>{group.name}</p>
      <p className={styles.members}>{group.memberIds.length} members</p>
     </div>
    </div>
   ))}
  </div>
 );
}

export default GroupsBox;