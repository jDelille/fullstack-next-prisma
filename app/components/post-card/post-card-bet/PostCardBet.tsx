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
			return <div className={styles.winBadge}>Win</div>;
		} else if (bet.status === 'loss') {
			return <div className={styles.lossBadge}>Loss</div>;
		} else if (bet.status === 'open') {
			return <div className={styles.openBadge}>Open</div>;
		}
	};

	return (
		<div className={styles.postBet}>
			<div className={styles.postBetStatus}>
				{winOrLossBadge()}
			</div>

			<div className={styles.postBetBody}>
				{bet.location === 'away' ? (
					<div className={styles.team}>
						{bet.awayTeam}
						{favOrDogBadge()}
						<p className={styles.betOdds}>{bet.odds}</p>
					</div>
				) : (
					<div className={styles.team}>
						{bet.homeTeam} {favOrDogBadge()}
						<p className={styles.betOdds}>{bet.odds}</p>
					</div>

				)}

				<p className={styles.betName}>{bet.name}</p>

				<div className={styles.betType}>
					{bet.type} <span>{bet.value}</span>
				</div>

				<div className={styles.wagerAndPayout}>
					<div className={styles.wager}>
						<p>Wagered: <span>${bet.wager}</span></p>
					</div>
					<div className={styles.payout}>
						Net Profit: ${bet.payout}
					</div>
				</div>
			</div>

			<div className={styles.disclaimer}>
				<p>Odds shown are at time of post and are subject to change.</p>
			</div>
		</div>
	);
};

export default PostCardBet;
