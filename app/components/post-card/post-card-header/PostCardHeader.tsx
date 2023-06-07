'use client';
import { useState, useMemo, Dispatch, SetStateAction } from 'react';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import PostCardMenu from '../post-card-menu/PostCardMenu';
import styles from './PostCardHeader.module.scss';
import { formatDistanceToNowStrict } from 'date-fns';
import Avatar from '../../avatar/Avatar';
import { AiFillPushpin } from 'react-icons/ai';
import VerifiedIcon from '@/app/icons/VerifiedIcon';
import useFollow from '@/app/hooks/useFollow';
import { Post } from '@prisma/client';



type PostCardHeaderProps = {
  post: any;
  currentUserId?: string;
  followingIds?: string[];
  setLocalPosts: Dispatch<SetStateAction<Post[]>> | undefined
  posts: Post[] | undefined;
};

const PostCardHeader: React.FC<PostCardHeaderProps> = ({
  post,
  currentUserId,
  followingIds,
  setLocalPosts,
  posts
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { handleFollow, isLoading } = useFollow(post?.user.id, post?.user.name, currentUserId as string, setIsMenuOpen)

  const [showModal, setShowModal] = useState(false);

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
      .replace(' days', 'd')
      .replace(" day", 'd')
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
          {/* {!isFollowing && post.user.id !== currentUserId ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleFollow();
              }}
              className={styles.followBtn}
              disabled={isLoading}
              aria-label={`Follow ${post?.user?.name}`}
            >

              <p>+ Follow</p>
            </button>
          ) : null} */}
        </div>
        <div className={styles.username}>
          {post?.user.username}
          <div className={styles.dot}></div>
          <div className={styles.points} onClick={(e) => { e.stopPropagation(); setShowModal(true) }}>
            {/* <Image src={'/images/star.png'} alt='star' width={10} height={10} /> */}
            <p>{post?.user.points} pts.</p>
            {/* {showModal && (
              <div className={styles.infoModal}>
                <p>Points</p>
                <IoMdClose className={styles.closeIcon} onClick={closeModal} />
                <div className={styles.infoDescription}>
                  <Image src={'/images/star.png'} alt='star' width={15} height={15} />
                  <p>Points are earned from winning bets. The higher the odds of a won bet, the more points you earn.</p>
                </div>
              </div>
            )} */}
          </div>

        </div>
      </div>
      <div className={styles.postMenu}>
        {post?.Bet?.isPrivate && (<>
          <span>Followers only</span>

        </>)}
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
            isFollowing={isFollowing}
            setIsMenuOpen={setIsMenuOpen}
            isPinned={post?.isPinned}
            postUsername={post?.user.username}
            setLocalPosts={setLocalPosts}
            posts={posts}
          />
        )}
      </div>
    </div>
  );
};

export default PostCardHeader;
