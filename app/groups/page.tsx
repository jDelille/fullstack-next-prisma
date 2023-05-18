import getGroups from '../actions/getGroups';
import styles from './Page.module.scss';
import GroupBox from '../components/group/GroupBox';
import getCurrentUser from '../actions/getCurrentUser';
import NoGroupMessage from './NoGroupMessage';
import dynamic from 'next/dynamic';

interface IParams {
 groupId?: string;
}


const Groups = async ({ params }: { params: IParams }) => {

 const groups = await getGroups();
 const currentUser = await getCurrentUser();

 const DynamicGroupBox = dynamic(() => import('../components/group/GroupBox'), {
  loading: () => <p>Loading...</p>
 })



 return (
  <div className={styles.page}>
   <h1>Groups</h1>
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