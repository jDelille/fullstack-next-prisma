'use client';
import { Bet } from '@/app/types/Bet';
import styles from './PostCardParlay.module.scss';
import { useState } from 'react';
import { AiOutlineDown, AiOutlineUp } from 'react-icons/ai';

type PostCardParlayProps = {
 post: any;
 odds: string;
 wager: number;
 payout: number;
};

const PostCardParlay: React.FC<PostCardParlayProps> = ({ post, odds, wager, payout }) => {

 const [showPicks, setShowPicks] = useState(false)


 return (
  <div className={styles.postBet} onClick={(e) => e.stopPropagation()}>
   <div className={styles.postBetBody}>
    {/* parlay header */}
    <div className={styles.header}>
     <div className={styles.title}>
      <p>Parlay ({post.length} Pick)</p>
      <div className={styles.odds}>{odds}</div>
     </div>
     <div className={styles.picks}>
      {post.map((bet: Bet) => (
       <p key={bet.id}>{bet.team}</p>
      ))}
     </div>
     <div className={styles.pay}>
      <p>Amount Wagered: <span>${wager}</span></p>
      <p>Net Payout: <span>${payout}</span></p>
     </div>
     <div className={styles.viewPicks} onClick={(e) => { setShowPicks(!showPicks); e.stopPropagation() }}>
      <p>{!showPicks ? (
       <>
        View Picks <AiOutlineDown size={12} />
       </>
      ) : (
       <>
        View Picks <AiOutlineUp />
       </>
      )}</p>
     </div>
    </div>

    {/* show parlay picks */}
    {showPicks && (
     post.map((bet: Bet) => (
      <div className={styles.bet} key={bet.id}>
       <div className={styles.dot}></div>
       <div className={styles.line}></div>
       <div className={styles.team}>
        <p>{bet.abbreviation} {bet.team}</p>
        <p className={styles.odds}>{bet.odds}</p>
       </div>
       <div className={styles.type}>
        {bet.type} {bet.value}
       </div>
       <div className={styles.name}>
        {bet.name}
       </div>
      </div>
     ))

    )}



   </div>
   <div className={styles.disclaimer}>
    <p>Odds shown are at time of post and are subject to change.</p>
   </div>
  </div>
 );
}

export default PostCardParlay;