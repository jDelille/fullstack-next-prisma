'use client';
import Button from '../components/button/Button';
import useCreateGroupModal from '../hooks/useCreateGroupModal';
import styles from './Page.module.scss';

const CreateGroupButton = () => {

 const createGroupModal = useCreateGroupModal();

 return (
  <div className={styles.createGroupButton}>
   <p>Want to create your own group?</p>
   <Button label='Create a group' onClick={createGroupModal.onOpen} />
  </div>
 );
}

export default CreateGroupButton;