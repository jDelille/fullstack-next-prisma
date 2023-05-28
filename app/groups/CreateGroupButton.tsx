'use client';
import Button from '../components/button/Button';
import useCreateGroupModal from '../hooks/useCreateGroupModal';
import useLoginModal from '../hooks/useLoginModal';
import styles from './Page.module.scss';

type CreateGroupButtonProps = {
 currentUserId: string;
}

const CreateGroupButton: React.FC<CreateGroupButtonProps> = ({ currentUserId }) => {

 const createGroupModal = useCreateGroupModal();
 const loginModal = useLoginModal();


 return (
  <div className={styles.createGroupButton}>
   <p>Want to create your own group?</p>
   <Button
    label='Create a group'
    onClick={currentUserId ? createGroupModal.onOpen : loginModal.onOpen}
    ariaLabel='Create a group'
   />
  </div>
 );
}

export default CreateGroupButton;