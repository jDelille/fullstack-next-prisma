import styles from './ConfidenceBadge.module.scss';

type ConfidenceBadgeProps = {
	value: string;
};

const ConfidenceBadge: React.FC<ConfidenceBadgeProps> = ({ value }) => {
	const confidenceBadge = () => {
		if (value === 'Easy Money') {
			return <div className={styles.ezBadge}>{value}</div>;
		} else if (value === 'Optimistic') {
			return <div className={styles.optimisticBadge}>{value}</div>;
		} else {
			return <div className={styles.riskyBadge}>{value}</div>;
		}
	};

	return <div className={styles.badge}>{confidenceBadge()}</div>;
};

export default ConfidenceBadge;
