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
   <p className={styles.title}>Create new group</p>
   <p>Make a group • Invite friends • View bets in real-time</p>
   <Button
    label='Create Group'
    onClick={currentUserId ? createGroupModal.onOpen : loginModal.onOpen}
    ariaLabel='Create a group'
   />
  </div>
 );
}

export default CreateGroupButton;