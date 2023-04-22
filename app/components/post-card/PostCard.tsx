'use client'

import Image from 'next/image';
import styles from './PostCard.module.scss';
import { BiDotsVerticalRounded } from 'react-icons/bi'
import { useState } from 'react';
import PostCardMenu from './post-card-menu/PostCardMenu';
import { SafeUser } from '@/app/types';
import { useRouter } from 'next/navigation';
import PostCardHeader from './post-card-header/PostCardHeader';

type PostCardProps = {
  post: any;
  currentUser?: SafeUser | null
};

const PostCard: React.FC<PostCardProps> = ({ post, currentUser }) => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false)

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

  const onClose = () => {
    setIsMenuOpen(false)
  }



  return (
    <div className={styles.post} onClick={(e) => { router.push(`post/${post?.id}`) }}>
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

      {post?.Bet && (
        <div className={styles.postBet}>
          <div className={styles.postBetHeader}>
            {post.Bet?.location === 'away' ? (
              <p>
                {post.Bet?.awayTeam}{' '}
                <span>
                  {/* {post.Bet.favorite ? '-' : '+'} */}
                  {post.Bet?.value}
                </span>
              </p>
            ) : (
              <p>
                {post.Bet?.homeTeam} {' '}
                <span>
                  {/* {post.Bet.favorite ? '-' : '+'} */}
                  {post.Bet?.value}
                </span>
              </p>
            )}
            <p className={styles.betOdds}>{post.Bet?.odds}</p>
          </div>
          <div className={styles.postBetBody}>
            <p> {post.Bet?.type}</p>
            <p>Wager ${post.Bet?.wager}</p>
            <p>Payout $5000</p>
          </div>
          <div className={styles.disclaimer}>
            <p>Odds shown are at time of post and are subject to change.</p>
          </div>
        </div>
      )}

    </div>
  );
};

export default PostCard;
