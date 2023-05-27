'use client';
import styles from './PostCardBet.module.scss';

type PostCardBetProps = {
	post: any;
};

const PostCardBet: React.FC<PostCardBetProps> = ({ post: bet }) => {

	const favOrDogBadge = () => {
		if (bet.favorite) {
			return <div className={styles.favBadge}>Fav</div>;
		} else {
			return <div className={styles.dogBadge}>Dog</div>;
		}
	};

	const winOrLossBadge = () => {
		if (bet.status === 'win') {
			return <div className={styles.winBadge}>Win</div>
		} else if (bet.status === "loss") {
			return <div className={styles.lossBadge}>Loss</div>
		} else if (bet.status === 'open') {
			return <div className={styles.openBadge}>Open</div>

		}
	}

	return (
		<div className={styles.postBet}>

			<div className={styles.postBetStatus}>
				{winOrLossBadge()}
				<p className={styles.betOdds}>{bet.odds}</p>

			</div>
			<div className={styles.postBetHeader}>
				<p>{bet.name}</p>
			</div>
			<div className={styles.postBetBody}>
				{bet.location === 'away' ? (
					<div className={styles.team}>{bet.awayTeam} {favOrDogBadge()}</div>
				) : (
					<div className={styles.team}>{bet.homeTeam} {favOrDogBadge()}</div>
				)}
				<p>
					{bet.type} <span>{bet.value}</span>
				</p>
				<p className={styles.wager}>Wager ${bet.wager}</p>
				<p className={styles.payout}>Payout ${bet.payout}</p>
			</div>
			<div className={styles.disclaimer}>
				<p>Odds shown are at time of post and are subject to change.</p>
			</div>
		</div>
	);
};

export default PostCardBet;
