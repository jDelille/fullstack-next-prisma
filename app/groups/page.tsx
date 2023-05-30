import getGroups from '../actions/getGroups';
import styles from './Page.module.scss';
import getCurrentUser from '../actions/getCurrentUser';
import NoGroupMessage from './NoGroupMessage';
import dynamic from 'next/dynamic';
import FeedHeader from '../components/feed-header/FeedHeader';
import { FaUsers } from 'react-icons/fa';
import CreateGroupButton from './CreateGroupButton';



const Groups = async () => {

 const [groups, currentUser] = await Promise.all([getGroups(), getCurrentUser()])

 const DynamicGroupBox = dynamic(() => import('../components/group/GroupBox'), {
  loading: () => <p>Loading...</p>
 })

 return (
  <div className={styles.page}>
   <FeedHeader label='Groups' icon={FaUsers} />
   <div className={styles.groupFeed}>
    <CreateGroupButton currentUserId={currentUser?.id as string} />
    {groups.map((group) => (
     <DynamicGroupBox group={group} key={group.id} currentUserId={currentUser?.id as string} />
    ))}
    {groups.length === 0 && (
     <NoGroupMessage />
    )}
   </div>

  </div>
 );
}

export default Groups;