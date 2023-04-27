'use client';
import { useRouter } from 'next/navigation';
import { useState, useMemo, useCallback } from 'react';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import PostCardMenu from '../post-card-menu/PostCardMenu';
import styles from './PostCardHeader.module.scss';
import { formatDistanceToNowStrict } from 'date-fns';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import Avatar from '../../avatar/Avatar';
import { AiFillPushpin } from "react-icons/ai";
import VerifiedIcon from '@/app/icons/VerifiedIcon';
type PostCardHeaderProps = {
  post: any;
  currentUserId?: string;
  followingIds?: string[];
};

const PostCardHeader: React.FC<PostCardHeaderProps> = ({
  post,
  currentUserId,
  followingIds,
}) => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const createdAt = useMemo(() => {
    if (!post?.createdAt) {
      return null;
    }

    return formatDistanceToNowStrict(new Date(post?.createdAt));
  }, [post?.createdAt]);

  const onFollow = useCallback(
    (id: string) => {
      setIsLoading(true);

      try {
        axios
          .post(`api/follow/${id}`)
          .then(() => {
            toast.success(`You followed ${post.user.name}`);
            router.refresh();
          })
          .catch(() => {
            toast.error('Something went wrong');
          })
          .finally(() => {
            setIsLoading(false);
          });
      } catch (error) {
        toast.error('Something went wrong');
        setIsLoading(false);
        router.refresh();
      }
    },
    [post.user.name, router]
  );

  let isFollowing = followingIds?.includes(post?.user.id);

  return (
    <div className={styles.postHeader}>
      <div className={styles.profilePicture}>
        <Avatar src={post?.user.photo} userId={post?.user.id} />
      </div>
      <div className={styles.userName}>
        <div className={styles.name}>
          <p className={styles.fullName}>{post?.user.name} {post?.user.isVerified && <VerifiedIcon />}</p>
          {!isFollowing && post.user.id !== currentUserId ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onFollow(post.user.id);
              }}
              className={styles.followBtn}
              disabled={isLoading}>
              <p>+ Follow</p>
            </button>
          ) : null}
        </div>
        <div className={styles.username}>
          {post?.user.username}
          <div className={styles.dot}></div>
          <span>Bets {post?.user.totalBets}</span>
        </div>
      </div>
      <div className={styles.postMenu}>
        {post?.isPinned && (
          <AiFillPushpin size={14} />
        )}
        <p>{createdAt}</p>
        <BiDotsVerticalRounded
          onClick={(e) => {
            e.stopPropagation();
            setIsMenuOpen(!isMenuOpen);
          }}
        />
        {isMenuOpen && (
          <PostCardMenu
            postId={post?.id}
            currentUserId={currentUserId}
            postUserId={post?.user.id}
            onFollow={onFollow}
            isFollowing={isFollowing}
            setIsMenuOpen={setIsMenuOpen}
            isPinned={post?.isPinned}
          />
        )}
      </div>
    </div>
  );
};

export default PostCardHeader;
