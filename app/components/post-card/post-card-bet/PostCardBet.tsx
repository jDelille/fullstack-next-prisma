'use client'
import styles from './PostCardBet.module.scss';

type PostCardBetProps = {
	post: any;
};

const PostCardBet: React.FC<PostCardBetProps> = ({ post: bet }) => {
	return (
		<div className={styles.postBet}>
			<div className={styles.postBetHeader}>
				{bet.location === 'away' ? (
					<p>
						{bet.awayTeam}{' '}
						<span>
							{/* {post.Bet.favorite ? '-' : '+'} */}
							{bet.value}
						</span>
					</p>
				) : (
					<p>
						{bet.homeTeam}{' '}
						<span>
							{/* {post.Bet.favorite ? '-' : '+'} */}
							{bet.value}
						</span>
					</p>
				)}
				<p className={styles.betOdds}>{bet.odds}</p>
			</div>
			<div className={styles.postBetBody}>
				<p> {bet.type}</p>
				<p>Wager ${bet.wager}</p>
				<p>Payout $5000</p>
			</div>
			<div className={styles.disclaimer}>
				<p>Odds shown are at time of post and are subject to change.</p>
			</div>
		</div>
	);
};

export default PostCardBet;
