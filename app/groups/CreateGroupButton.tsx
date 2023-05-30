'use client';
import Button from '../components/button/Button';
import useCreateGroupModal from '../hooks/useCreateGroupModal';
import useLoginModal from '../hooks/useLoginModal';
import { GroupsScreenString } from '../utils/app-string/GroupsScreenString';
import styles from './Page.module.scss';

type CreateGroupButtonProps = {
 currentUserId: string;
}

const CreateGroupButton: React.FC<CreateGroupButtonProps> = ({ currentUserId }) => {

 const createGroupModal = useCreateGroupModal();
 const loginModal = useLoginModal();


 return (
  <div className={styles.createGroupButton}>
   <p className={styles.title}>{GroupsScreenString.createGroup}</p>
   <p>{GroupsScreenString.createGroupSubtext}</p>
   <Button
    label={GroupsScreenString.createGroupButtonLabel}
    onClick={currentUserId ? createGroupModal.onOpen : loginModal.onOpen}
    ariaLabel={GroupsScreenString.createGroupAriaLabel}
   />
  </div>
 );
}

export default CreateGroupButton;