'use client'

import Button from "../components/button/Button";
import styles from './Page.module.scss';
import useCreateGroupModal from '../hooks/useCreateGroupModal';

const NoGroupMessage = () => {
 const createGroupModal = useCreateGroupModal();


 return (
  <div className={styles.noGroupMessage}>
   <p>There are no groups</p>
   <Button label='Create group' onClick={createGroupModal.onOpen} />
  </div>
 );
}

export default NoGroupMessage;