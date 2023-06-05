import getCurrentUser from '../actions/getCurrentUser';
import getUsers from '../actions/getUsers';
import Avatar from '../components/avatar/Avatar';
import CreatePostTextarea from '../components/create-post/create-post-textarea/CreatePostTextarea';
import PostCardHeader from '../components/post-card/post-card-header/PostCardHeader';
import VerifiedIcon from '../icons/VerifiedIcon';
import styles from './Page.module.scss';



const CreatePostPage = async () => {

 const [currentUser, users] = await Promise.all([getCurrentUser(), getUsers()]);
 return (
  <div className={styles.page}>
   <div className={styles.textareaWrapper}>
    <div className={styles.user}>
     <Avatar src={currentUser?.photo as string} />
     <div className={styles.userName}>
      <p className={styles.name}>{currentUser?.name} {currentUser?.isVerified && <VerifiedIcon />}</p>
      <p className={styles.username}>{currentUser?.username}</p>
     </div>
    </div>
    <CreatePostTextarea userId={currentUser?.id} users={users} />
   </div>
  </div>
 )
}

export default CreatePostPage