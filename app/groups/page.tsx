import getGroups from '../actions/getGroups';
import styles from './Page.module.scss';
import getCurrentUser from '../actions/getCurrentUser';
import NoGroupMessage from './NoGroupMessage';
import dynamic from 'next/dynamic';
import FeedHeader from '../components/feed-header/FeedHeader';
import { IoArrowBack } from 'react-icons/io5';
import { FaUsers } from 'react-icons/fa';


interface IParams {
 groupId?: string;
}


const Groups = async ({ params }: { params: IParams }) => {

 const [groups, currentUser] = await Promise.all([getGroups(), getCurrentUser()])

 const DynamicGroupBox = dynamic(() => import('../components/group/GroupBox'), {
  loading: () => <p>Loading...</p>
 })

 return (
  <div className={styles.page}>
   <FeedHeader label='Groups' icon={FaUsers} />
   {groups.map((group) => (
    <DynamicGroupBox group={group} key={group.id} currentUserId={currentUser?.id as string} />
   ))}
   {groups.length === 0 && (
    <NoGroupMessage />
   )}
  </div>
 );
}

export default Groups;