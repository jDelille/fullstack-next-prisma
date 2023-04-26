import getBetsByUserId from "@/app/actions/getBetsByUserId";
import styles from './Page.module.scss';
import PostCardBet from "@/app/components/post-card/post-card-bet/PostCardBet";


interface IParams {
 userId?: string;
}

const MyBets = async ({ params }: { params: IParams }) => {
 const bets = await getBetsByUserId(params);


 return (
  <div className={styles.page}>
   {bets.length === 0 && (
    <div className={styles.noBets}>
     <h1>You have made no bets yet.</h1>
    </div>
   )}
   <div className={styles.bets}>
    <h1> Your bets </h1>
    {bets.length > 0 && bets.map((bet) => (
     <PostCardBet post={bet.Bet} key={bet.id} />
    ))}
   </div>
  </div>
 );
}

export default MyBets;