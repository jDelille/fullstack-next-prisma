import Image from 'next/image';
import styles from './PostCard.module.scss';
import { SafeUser } from '@/app/types';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';


type PostCardProps = {
 post: Record<string, any>;
 currentUser: SafeUser | null

};

const PostCard: React.FC<PostCardProps> = ({ post, currentUser }) => {
 const router = useRouter();
 const [deletingId, setDeletingId] = useState('');

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

 const onDelete = useCallback((id: string) => {
  setDeletingId(id)

  axios.delete(`/api/bet/${id}`)
   .then(() => {
    toast.success('Bet deleted')
    router.refresh();
   })
   .catch(() => {
    toast.error("Something went wrong")
   })
   .finally(() => {
    setDeletingId('')
   })

 }, [router])

 return (
  <div className={styles.post}>
   <div className={styles.postHeader}>
    <div className={styles.profilePicture}>
     <Image
      src={post.user.profilePicture || '/images/placeholder.png'}
      width={40}
      height={40}
      alt='profile-picture'
     />
    </div>
    <div className={styles.userName}>
     <p>{post.user.name}</p>
     <span>@{post.user.username}</span>
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
   <div onClick={() => onDelete(post?.id)}>DELETE</div>
  </div>
 );
};

export default PostCard;
