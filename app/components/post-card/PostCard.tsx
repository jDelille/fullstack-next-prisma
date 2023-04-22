'use client'

import Image from 'next/image';
import styles from './PostCard.module.scss';
import { BiDotsVerticalRounded } from 'react-icons/bi'
import { useState } from 'react';
import PostCardMenu from './post-card-menu/PostCardMenu';
import { SafeUser } from '@/app/types';
import { useRouter } from 'next/navigation';

type PostCardProps = {
  post: any;
  currentUser?: SafeUser | null
};

const PostCard: React.FC<PostCardProps> = ({ post, currentUser }) => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const favOrDogBadge = () => {
    if (post.Bet.favorite) {
      return <div className={styles.favBadge}>Favorite</div>;
    } else {
      return <div className={styles.dogBadge}>Underdog</div>;
    }
  };

  const confidenceBadge = () => {
    if (post.Bet.confidence === 'Easy Money') {
      return <div className={styles.ezBadge}>{post.Bet.confidence}</div>;
    } else if (post.Bet.confidence === 'Optimistic') {
      return (
        <div className={styles.optimisticBadge}>{post.Bet.confidence}</div>
      );
    } else {
      return <div className={styles.riskyBadge}>{post.Bet.confidence}</div>;
    }
  };

  const onClose = () => {
    setIsMenuOpen(false)
  }



  return (
    <div className={styles.post} onClick={(e) => { router.push(`post/${post?.id}`) }}>
      <div className={styles.postHeader}>
        <div className={styles.profilePicture} onClick={(e) => { e.stopPropagation(); router.push(`user/${post?.user.id}`) }}>
          <Image
            src={post.user.profilePicture || '/images/placeholder.png'}
            width={59}
            height={59}
            alt='profile-picture'
          />
        </div>
        <div className={styles.userName}>
          <p>{post.user.name}</p>
          <span>{post.user.username}</span>
          <span>Bets {post.user.totalBets}</span>
        </div>
        <div className={styles.postMenu}>
          <BiDotsVerticalRounded onClick={() => setIsMenuOpen(!isMenuOpen)} />
          {isMenuOpen && (
            <PostCardMenu postId={post?.id} onClose={onClose} currentUserId={currentUser?.id} postUserId={post?.user.id} />
          )}
        </div>
      </div>

      <div className={styles.postBody}>
        <p>{post.Bet.thoughts}</p>
      </div>
      <div className={styles.badges}>
        {confidenceBadge()}
        {favOrDogBadge()}
      </div>
      <div className={styles.postBet}>
        <div className={styles.postBetHeader}>
          {post.Bet.location === 'away' ? (
            <p>
              {post.Bet.awayTeam}{' '}
              <span>
                {/* {post.Bet.favorite ? '-' : '+'} */}
                {post.Bet.value}
              </span>
            </p>
          ) : (
            <p>
              {post.Bet.homeTeam} {' '}
              <span>
                {/* {post.Bet.favorite ? '-' : '+'} */}
                {post.Bet.value}
              </span>
            </p>
          )}
          <p className={styles.betOdds}>{post.Bet.odds}</p>
        </div>
        <div className={styles.postBetBody}>
          <p> {post.Bet.type}</p>
          <p>Wager ${post.Bet.wager}</p>
          <p>Payout $5000</p>
        </div>
        <div className={styles.disclaimer}>
          <p>Odds shown are at time of post and are subject to change.</p>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
