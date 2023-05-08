'use client';

import Image from 'next/image';
import styles from './PostCard.module.scss';
import { SafeUser } from '@/app/types';
import { useRouter } from 'next/navigation';
import PostCardHeader from './post-card-header/PostCardHeader';
import PostCardBet from './post-card-bet/PostCardBet';
import PostCardFooter from './post-card-footer/PostCardFooter';
import PostCardComment from './post-card-comment/PostCardComment';
import { useState, useCallback, useEffect } from 'react';
import CommentFeed from '../comment-feed/CommentFeed';
import axios from 'axios';
import ImageView from '../image-view/ImageView';

type PostCardProps = {
  post: any;
  currentUser?: SafeUser | null;
};

const PostCard: React.FC<PostCardProps> = ({ post, currentUser }) => {
  const router = useRouter();
  const [isComment, setIsComment] = useState(false)
  const [imageView, setImageView] = useState('')

  const onComment = useCallback(() => {
    setIsComment(!isComment)
  }, [isComment])

  const onCheck = useCallback((id: string) => {
    if (post.Bet?.status !== 'open') {
      return;
    }
    axios.post(`/api/checkBet/${id}`)
      .then(() => {
        router.refresh()
      })
      .catch(() => {
        console.log('something went wrong')
      })
  }, [post.Bet?.status, router])

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

  useEffect(() => {
    if (post.Bet?.status === 'open') {
      onCheck(post.betId)
    }

  }, [onCheck, post?.Bet?.status, post?.betId])

  return (
    <div
      className={styles.post}
      onClick={(e) => {
        router.push(`post/${post?.id}`);
      }}>
      <PostCardHeader currentUserId={currentUser?.id} post={post} followingIds={currentUser?.followingIds} />
      <div className={styles.postBody}>
        <p>{post?.Bet?.thoughts || post?.body}</p>
      </div>
      {post?.photo && (
        <div className={styles.postPhoto}>
          <Image
            src={post?.photo.url || post?.photo}
            fill
            alt='Uploaded Image'
            className={styles.imagePreview}
            style={{ objectFit: 'cover' }}
            onClick={(e) => { e.stopPropagation(); setImageView(post?.photo.url || post?.photo) }}
          />
        </div>
      )}
      {imageView && (
        <ImageView url={imageView} setImageView={setImageView} />
      )}
      {post?.Bet && (
        <div className={styles.badges}>
          {confidenceBadge()}
        </div>
      )}
      {post?.Bet && <PostCardBet post={post.Bet} />}
      <PostCardFooter postId={post.id} likeCount={post.likedIds.length || 0} likeArray={post.likedIds} currentUserId={currentUser?.id} onComment={onComment} commentCount={post.comments.length || 0} commentArray={post.commentedIds} />
      {isComment && (
        <PostCardComment postId={post?.id} userId={currentUser?.id} userPhoto={currentUser?.photo as string} postUser={post?.user.name} />
      )}
      {post?.comments && isComment && (
        <CommentFeed comments={post} currentUserId={currentUser?.id} followingIds={currentUser?.followingIds} />
      )}
    </div>
  );
};

export default PostCard;
