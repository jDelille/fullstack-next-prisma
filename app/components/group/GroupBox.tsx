'use client';

import styles from './GroupBox.module.scss';
import { AiFillLock, AiFillUnlock } from 'react-icons/ai';
import { useCallback } from 'react';
import useLoginModal from '@/app/hooks/useLoginModal';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { FaUsers } from 'react-icons/fa';
import Button from '../button/Button';
import Link from 'next/link';
export type GroupProps = {
  id: string;
  name: string;
  description: string;
  photo: string;
  memberIds: string[];
  isPrivate: boolean;
};

type GroupBoxProps = {
  group: GroupProps;
  currentUserId: string;
};

const GroupBox: React.FC<GroupBoxProps> = ({ group, currentUserId }) => {
  const router = useRouter();

  const loginModal = useLoginModal();

  const onJoin = useCallback(
    (id: string) => {
      if (!currentUserId) {
        return loginModal.onOpen();
      }

      axios
        .post(`/api/group/${id}`)
        .then(() => {
          toast.success('Group joined');
          router.refresh();
        })
        .catch(() => {
          toast.error('Something went wrong');
        });
    },
    [currentUserId, loginModal, router]
  );

  const onLeave = useCallback(
    (id: string) => {
      if (!currentUserId) {
        return loginModal.onOpen();
      }

      axios
        .delete(`/api/group/${id}`)
        .then(() => {
          toast.success('You left group');
          router.refresh();
        })
        .catch(() => {
          toast.error('Something went wrong');
        });
    },
    [currentUserId, loginModal, router]
  );

  const hasJoined = group.memberIds.includes(currentUserId);

  return (
    <div key={group.id} className={styles.groupBox}>
      <div className={styles.groupImage}>
        <p>{group.photo}</p>
      </div>
      <div className={styles.groupName}>
        <p className={styles.name}>
          {group.name}{' '}
          <span className={styles.members}>
            <FaUsers color='#20b46a' />
            {group.memberIds.length}
          </span>
        </p>
        <p className={styles.description}>{group.description}</p>
        <div className={styles.groupInfo}>
          {hasJoined ? (
            <div className={styles.buttons}>
              <Link href={`/groups/${group.id}`}>Open</Link>
              <Button
                label='Leave'
                onClick={() => onLeave(group?.id)}
                ariaLabel={`Leave ${group?.name}`}
              />
            </div>
          ) : (
            <Button
              label={group.isPrivate ? 'Request to join' : 'Join'}
              onClick={() => onJoin(group?.id)}
              ariaLabel={`Join ${group?.name}`}
            />
          )}
          {/* <div className={styles.privacy}>
            {group.isPrivate ? (
              <>
                <AiFillLock size={16} />
                <p> Private </p>
              </>
            ) : (
              <>
                <AiFillUnlock size={16} />
                <p>Public </p>
              </>
            )}
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default GroupBox;
