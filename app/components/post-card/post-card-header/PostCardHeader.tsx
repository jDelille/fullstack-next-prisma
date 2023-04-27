'use client';
import { useState, useMemo } from 'react';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import PostCardMenu from '../post-card-menu/PostCardMenu';
import styles from './PostCardHeader.module.scss';
import { formatDistanceToNowStrict } from 'date-fns';
import Avatar from '../../avatar/Avatar';
import { AiFillPushpin } from 'react-icons/ai';
import VerifiedIcon from '@/app/icons/VerifiedIcon';
import useFollow from '@/app/hooks/useFollow';

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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { handleFollow, isLoading } = useFollow(post?.user.id, post?.user.name, currentUserId as string)

  const createdAt = useMemo(() => {
    if (!post?.createdAt) {
      return null;
    }

    return formatDistanceToNowStrict(new Date(post?.createdAt), {})
      .replace(' seconds', 's')
      .replace(' second', 's')
      .replace(' minutes', 'm')
      .replace(' minute', 'm')
      .replace(' hours', 'h')
      .replace(' hour', 'h');
  }, [post?.createdAt]);

  let isFollowing = followingIds?.includes(post?.user.id);

  return (
    <div className={styles.postHeader}>
      <div className={styles.profilePicture}>
        <Avatar src={post?.user.photo} userId={post?.user.id} />
      </div>
      <div className={styles.userName}>
        <div className={styles.name}>
          <p className={styles.fullName}>
            {post?.user.name} {post?.user.isVerified && <VerifiedIcon />}
          </p>
          {!isFollowing && post.user.id !== currentUserId ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleFollow;
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
        {post?.isPinned && <AiFillPushpin size={14} />}
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
            onFollow={handleFollow}
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
