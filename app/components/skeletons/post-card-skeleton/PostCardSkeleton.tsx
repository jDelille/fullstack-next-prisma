import ContentLoader from 'react-content-loader';
import styles from './PostCardSkeleton.module.scss';

const PostCardSkeleton = () => {
 return (
  <div className={styles.post}>

   <div className={styles.postHeader}>
    <div className={styles.profilePicture}></div>
    <div className={styles.userName}>
     <div className={styles.line}></div>
     <div className={styles.line}></div>
    </div>

   </div>
   <div className={styles.postBody}>
    <div className={styles.longLine}></div>
    <div className={styles.longLine}></div>
    <div className={styles.longLine}></div>
    <div className={styles.longLine}></div>

   </div>

   <div className={styles.postFooter}>
    <div className={styles.line}></div>
    <div className={styles.line}></div>
   </div>
  </div>
 );
};

export default PostCardSkeleton;
