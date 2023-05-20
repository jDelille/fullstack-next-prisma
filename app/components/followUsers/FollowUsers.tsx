import { User } from '@prisma/client';
import UserCard from './UserCard';
import styles from './FollowUsers.module.scss';

type FollowUsersProps = {
 users: User[] | null;
 currentUserId?: string;
 followingIds?: string[];
};

const FollowUsers: React.FC<FollowUsersProps> = ({
 users,
 currentUserId,
 followingIds,
}) => {
 return (
  <div className={styles.followUsers}>
   <p className={styles.title}>Who to follow</p>
   {users?.map((user, index) => {
    if (
     currentUserId &&
     user.id !== currentUserId &&
     !followingIds?.includes(user?.id) &&
     index < 4
    ) {
     return (
      <UserCard
       key={user.id}
       user={user}
       currentUserId={currentUserId}
       followingIds={followingIds as string[]}
      />
     );
    }
   })}
  </div>
 );
};

export default FollowUsers;
