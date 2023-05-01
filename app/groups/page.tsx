import getGroups from '../actions/getGroups';
import styles from './Page.module.scss';
import GroupBox from '../components/group/GroupBox';
import getCurrentUser from '../actions/getCurrentUser';

interface IParams {
 groupId?: string;
}


const Groups = async ({ params }: { params: IParams }) => {

 const groups = await getGroups();
 const currentUser = await getCurrentUser();

 return (
  <div className={styles.page}>
   <h1>Groups</h1>
   {groups.map((group) => (
    <GroupBox group={group} key={group.id} currentUserId={currentUser?.id as string} />
   ))}
  </div>
 );
}

export default Groups;