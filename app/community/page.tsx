import Image from 'next/image';
import getCommunities from '../actions/getCommunities';
import styles from './Page.module.scss';
import Button from '../components/button/Button';
import CommunityBox from '../components/community/CommunityBox';

interface IParams {
 communityId?: string;
}


const Communities = async ({ params }: { params: IParams }) => {

 const communities = await getCommunities();


 return (
  <div className={styles.page}>
   <h1>Communities</h1>
   {communities.map((community) => (
    <CommunityBox community={community} key={community.id} />
   ))}
  </div>
 );
}

export default Communities;