'use client';

import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './PostCardMenu.module.scss';

type PostCardMenuProps = {
  postId: string;
  currentUserId?: string;
  postUserId?: string;
};

const PostCardMenu: React.FC<PostCardMenuProps> = ({
  postId,
  currentUserId,
  postUserId,
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState('');

  const onDelete = useCallback(
    (id: string) => {
      setDeletingId(id);

      axios
        .delete(`/api/bet/${id}`)
        .then(() => {
          toast.success('Bet deleted');
          router.refresh();
        })
        .catch(() => {
          toast.error('Something went wrong');
        })
        .finally(() => {
          setDeletingId('');
        });
    },
    [router]
  );

  return (
    <div className={styles.postCardMenu}>
      {postUserId === currentUserId && (
        <p
          onClick={(e) => {
            e.stopPropagation();
            onDelete(postId);
          }}>
          Delete
        </p>
      )}
    </div>
  );
};

export default PostCardMenu;
