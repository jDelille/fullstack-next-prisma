import getgroupById from '@/app/actions/getGroupById';
import styles from './Page.module.scss';
import getUserById from '@/app/actions/getUserById';
import { SafeUser } from '@/app/types';
import ProfileMenu from '@/app/components/menu/ProfileMenu';
import CreatePostForm from '@/app/components/create-post/create-post-form/CreatePostForm';
import getCurrentUser from '@/app/actions/getCurrentUser';
import PostFeed from '@/app/components/post-feed/PostFeed';
import getGroupById from '@/app/actions/getGroupById';
import getPostsByGroupId from '@/app/actions/getPostsByGroupId';

interface IParams {
 groupId?: string;
}


const Group = async ({ params }: { params: IParams }) => {

 const group = await getGroupById(params)
 const currentUser = await getCurrentUser();


 let admin: SafeUser | null = null;
 let posts: any | null = null
 if (group) {
  admin = await getUserById({ userId: group.adminId });
  posts = await getPostsByGroupId({ groupId: group.id })
 }

 return (
  <div className={styles.page}>
   <div className={styles.header}>
    <div className={styles.name}>
     <h1>{group?.name}</h1>
    </div>
    <p className={styles.description}>{group?.description}</p>
    <p className={styles.admin}>Created by {admin?.name}</p>
    <p className={styles.members}> Members {group?.memberIds.length}</p>
    {currentUser?.id === admin?.id && (
     <div className={styles.menu}>
      <ProfileMenu isGroupPage />
     </div>
    )}

   </div>
   <div className={styles.body}>
    <CreatePostForm isComment={false} isBordered userId={currentUser?.id as string} isGroup={true} userPhoto={currentUser?.photo as string} groupId={group?.id as string} />
    <PostFeed currentUser={currentUser} posts={posts} />
   </div>
  </div>
 );
}

export default Group;