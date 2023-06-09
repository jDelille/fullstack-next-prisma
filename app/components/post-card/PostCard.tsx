'use client';

import Image from 'next/image';
import styles from './PostCard.module.scss';
import { SafeUser } from '@/app/types';
import { useRouter } from 'next/navigation';
import PostCardHeader from './post-card-header/PostCardHeader';
import PostCardBet from './post-card-bet/PostCardBet';
import PostCardFooter from './post-card-footer/PostCardFooter';
import PostCardComment from './post-card-comment/PostCardComment';
import { useState, useCallback, useEffect, Dispatch, SetStateAction } from 'react';
import CommentFeed from '../comment-feed/CommentFeed';
import axios from 'axios';
import ImageView from '../image-view/ImageView';
import ConfidenceBadge from '../confidence-badge/ConfidenceBadge';
import PostCardPoll from './post-card-poll/PostCardPoll';
import PostCardParlay from './post-card-parlay/PostCardParlay';
import { Post } from '@prisma/client';

type PostCardProps = {
  post: any;
  currentUser?: SafeUser | null;
  hideComment?: boolean;
  setLocalPosts?: Dispatch<SetStateAction<Post[]>>
  posts?: Post[]
};

const PostCard: React.FC<PostCardProps> = ({ post, currentUser, hideComment, setLocalPosts, posts }) => {
  const router = useRouter();
  const [isComment, setIsComment] = useState(false);
  const [imageView, setImageView] = useState('');

  const onComment = useCallback(() => {
    setIsComment(!isComment);
  }, [isComment]);

  const onCheck = useCallback(
    (id: string) => {
      if (post?.Bet?.status !== 'open') {
        return;
      }
      axios
        .post(`/api/checkBet/${id}`)
        .then(() => {
          router.refresh();
        })
        .catch(() => {
          console.log('something went wrong');
        });
    },
    [post?.Bet?.status, router]
  );

  useEffect(() => {
    if (post.Bet?.status === 'open') {
      onCheck(post.betId);
    }
  }, [onCheck, post?.Bet?.status, post?.betId, post?.user?.id]);

  return (
    <div
      className={post.Parlay ? styles.parlayPost : styles.post}
      onClick={(e) => {
        router.push(`post/${post?.id}`);
      }}>
      <PostCardHeader
        currentUserId={currentUser?.id}
        post={post}
        followingIds={currentUser?.followingIds}
        setLocalPosts={setLocalPosts}
        posts={posts}
      />
      <div className={styles.postBody}>
        <p>{post?.Bet?.thoughts || post?.Parlay?.bets[0].thoughts || post?.body}</p>
      </div>
      {post?.photo && (
        <div className={post?.photo.url ? styles.postGif : styles.postPhoto}>
          <Image
            src={post?.photo.url || post?.photo}
            fill
            alt='Uploaded Image'
            className={styles.imagePreview}
            style={{ objectFit: 'cover' }}
            onClick={(e) => {
              e.stopPropagation();
              setImageView(post?.photo.url || post?.photo);
            }}
          />
        </div>
      )}
      {imageView && <ImageView url={imageView} setImageView={setImageView} />}
      {post?.Bet && <ConfidenceBadge value={post?.Bet?.confidence} />}

      {post?.Bet && (
        <div className={styles.postBet}>
          <PostCardBet post={post.Bet} />
        </div>
      )}

      {post?.Parlay && (
        <div className={styles.postParlay}>
          <PostCardParlay post={post.Parlay.bets} odds={post.Parlay.odds}
            wager={post.Parlay.wager} payout={post.Parlay.payout} />
        </div>
      )}

      {post?.Poll && (
        <div className={styles.postPoll}>
          <PostCardPoll
            post={post.Poll}
            currentUserId={currentUser?.id}
            option1Count={post?.Poll?.option1Votes}
            option2Count={post?.Poll?.option2Votes}

          />
        </div>

      )}

      <PostCardFooter
        postId={post.id}
        likeCount={post.likedIds.length || 0}
        likeArray={post.likedIds}
        currentUserId={currentUser?.id}
        onComment={onComment}
        commentCount={post.comments.length || 0}
        commentArray={post.commentedIds}
        hideComment={hideComment}
        post={post}
      />
      {isComment && !hideComment && (
        <PostCardComment
          postId={post?.id}
          userId={currentUser?.id}
          userPhoto={currentUser?.photo as string}
          postUser={post?.user.name}
          username={currentUser?.username}
        />
      )}
      {post?.comments && isComment && !hideComment && (
        <CommentFeed
          comments={post}
          currentUserId={currentUser?.id}
          followingIds={currentUser?.followingIds}
        />
      )}
    </div>
  );
};

export default PostCard;
