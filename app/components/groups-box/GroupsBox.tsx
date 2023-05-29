'use client';

import { Group } from '@prisma/client';
import { SafeUser } from '@/app/types';
import { useRouter } from 'next/navigation';
import styles from './GroupsBox.module.scss';

type GroupsBoxProps = {
 groups: Group[];
 currentUser: SafeUser | null;
};

const GroupsBox: React.FC<GroupsBoxProps> = ({ groups }) => {
 const router = useRouter();

 return (
  <div className={styles.groups}>
   <p className={styles.label}>
    Groups<span>{groups?.length}</span>
   </p>
   {groups?.map((group: any) => (
    <div
     key={group.id}
     className={styles.group}
     onClick={() => {
      router.push(`/groups/${group.id}`);
     }}>
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
};

export default GroupsBox;
