import Image from 'next/image';
import getCommunities from '../actions/getCommunities';
import styles from './Page.module.scss';
import Button from '../components/button/Button';
import CommunityBox from '../components/community/CommunityBox';
import getCurrentUser from '../actions/getCurrentUser';

interface IParams {
 communityId?: string;
}


const Communities = async ({ params }: { params: IParams }) => {

 const communities = await getCommunities();
 const currentUser = await getCurrentUser();

 return (
  <div className={styles.page}>
   <h1>Communities</h1>
   {communities.map((community) => (
    <CommunityBox community={community} key={community.id} currentUserId={currentUser?.id as string} />
   ))}
  </div>
 );
}

export default Communities;