import ContentLoader from 'react-content-loader';
import styles from './CreatePostFormSkeleton.module.scss';

const CreatePostFormSkeleton = () => {
 return (
  <div className={styles.inputContainer}>
   <div className={styles.inputWrapper}>
    <div className={styles.createPostWrapper}>
     <div className={styles.profilePicture}></div>
     <div className={styles.textarea}></div>
    </div>
    <div className={styles.postButton}></div>
   </div>
  </div>
 );
}

export default CreatePostFormSkeleton;