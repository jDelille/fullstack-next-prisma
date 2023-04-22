'use client';

import Image from 'next/image';
import styles from './PostCard.module.scss';
import { SafeUser } from '@/app/types';
import { useRouter } from 'next/navigation';
import PostCardHeader from './post-card-header/PostCardHeader';
import PostCardBet from './post-card-bet/PostCardBet';
import PostCardFooter from './post-card-footer/PostCardFooter';

type PostCardProps = {
  post: any;
  currentUser?: SafeUser | null;
};

const PostCard: React.FC<PostCardProps> = ({ post, currentUser }) => {
  const router = useRouter();

  const favOrDogBadge = () => {
    if (post.Bet?.favorite) {
      return <div className={styles.favBadge}>Favorite</div>;
    } else {
      return <div className={styles.dogBadge}>Underdog</div>;
    }
  };

  const confidenceBadge = () => {
    if (post.Bet?.confidence === 'Easy Money') {
      return <div className={styles.ezBadge}>{post.Bet?.confidence}</div>;
    } else if (post.Bet?.confidence === 'Optimistic') {
      return (
        <div className={styles.optimisticBadge}>{post.Bet?.confidence}</div>
      );
    } else {
      return <div className={styles.riskyBadge}>{post.Bet?.confidence}</div>;
    }
  };

  return (
    <div
      className={styles.post}
      onClick={(e) => {
        router.push(`post/${post?.id}`);
      }}>
      <PostCardHeader currentUserId={currentUser?.id} post={post} />
      <div className={styles.postBody}>
        <p>{post?.Bet?.thoughts || post?.body}</p>
      </div>
      {post?.photo && (
        <div className={styles.postPhoto}>
          <Image
            src={post?.photo}
            fill
            alt='Uploaded Image'
            className={styles.imagePreview}
            style={{ objectFit: 'cover' }}
          />
        </div>
      )}
      {post?.Bet && (
        <div className={styles.badges}>
          {confidenceBadge()}
          {favOrDogBadge()}
        </div>
      )}
      {post?.Bet && <PostCardBet post={post.Bet} />}
      <PostCardFooter />
    </div>
  );
};

export default PostCard;
