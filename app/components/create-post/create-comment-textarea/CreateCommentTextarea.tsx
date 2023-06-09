import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import styles from '../create-post-textarea/CreatePostTextarea.module.scss';

const CreateCommentTextarea = () => {
 return (
  <SimpleBar className={styles.createPost}>
   <textarea
    placeholder='Comment'
    className={styles.textarea}
    rows={1}
    
   >

   </textarea>
  </SimpleBar>
 );
}

export default CreateCommentTextarea;