'use client'

import Button from "../components/button/Button";
import useCreateGroupModal from '../hooks/useCreateGroupModal';
import { GroupsScreenString } from "../utils/app-string/GroupsScreenString";
import styles from './Page.module.scss';

const NoGroupMessage = () => {
 const createGroupModal = useCreateGroupModal();


 return (
  <div className={styles.noGroupMessage}>
   <p>{GroupsScreenString.noGroupsMessage}</p>
   <Button
    label={GroupsScreenString.createGroupButtonLabel}
    onClick={createGroupModal.onOpen}
    ariaLabel={GroupsScreenString.createGroupAriaLabel}
   />
  </div>
 );
}

export default NoGroupMessage;