import styles from './PostCard.module.scss';

type PostCardProps = {
 post: any
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {

 return (
  <div className={styles.post}>
   <div className={styles.postHeader}>
    <div className={styles.profilePicture}>

    </div>
    <div className={styles.userName}>
     <p>{post.user.name}</p>
     <span>@{post.user.username}</span>
    </div>
   </div>
   <div className={styles.postBody}>
    <p>{post.Bet.thoughts}</p>
   </div>
   <div className={styles.postBet}>
    <div className={styles.postBetHeader}>
     <p className={styles.betLeague}>{post.Bet.league}</p>
     <p className={styles.betOdds}>{post.Bet.odds}</p>
    </div>
    <div className={styles.postBetBody}>
     <p>{post.Bet.type}</p>
     <p>Wager ${post.Bet.wager}</p>
     <p>Payout $5000</p>
    </div>
   </div>
  </div>
 );
}

export default PostCard;