import getCommunityById from '@/app/actions/getCommunityById';
import styles from './Page.module.scss';
import getUserById from '@/app/actions/getUserById';
import { SafeUser } from '@/app/types';
import ProfileMenu from '@/app/components/menu/ProfileMenu';
import CreatePostForm from '@/app/components/create-post/create-post-form/CreatePostForm';
import getCurrentUser from '@/app/actions/getCurrentUser';
import PostFeed from '@/app/components/post-feed/PostFeed';
import getPostsByCommunityId from '@/app/actions/getPostsByCommunityId';

interface IParams {
 communityId?: string;
}


const Community = async ({ params }: { params: IParams }) => {

 const community = await getCommunityById(params)
 const currentUser = await getCurrentUser();

 let admin: SafeUser | null = null;
 let posts: any | null = null
 if (community) {
  admin = await getUserById({ userId: community.adminId });
  posts = await getPostsByCommunityId({ communityId: community.id })
 }

 return (
  <div className={styles.page}>
   <div className={styles.header}>
    <div className={styles.name}>
     <h1>{community?.name}</h1>
    </div>
    <p className={styles.description}>{community?.description}</p>
    <p className={styles.admin}>Created by {admin?.name}</p>
    <p className={styles.members}> Members {community?.memberIds.length}</p>
    <div className={styles.menu}>
     <ProfileMenu isCommunityPage />
    </div>
   </div>
   <div className={styles.body}>
    <CreatePostForm isComment={false} isBordered userId={currentUser?.id as string} isCommunity userPhoto={currentUser?.photo as string} communityId={community?.id as string} />
    <PostFeed currentUser={currentUser} posts={posts} />
   </div>
  </div>
 );
}

export default Community;