import Router from 'next/router';
import styles from './ConfidenceBadge.module.scss';
import { useRouter } from 'next/navigation';


type ConfidenceBadgeProps = {
 value: string;
}

const ConfidenceBadge: React.FC<ConfidenceBadgeProps> = ({ value }) => {

 const router = useRouter()

 const confidenceBadge = () => {
  if (value === 'Easy Money') {
   return <div className={styles.ezBadge}>{value}</div>;
  } else if (value === 'Optimistic') {
   return (
    <div className={styles.optimisticBadge}>{value}</div>
   );
  } else {
   return <div className={styles.riskyBadge}>{value}</div>;
  }
 };

 // onClick = {(e) => { e.stopPropagation(); value && router.push(`explore/${value}`) }}

 return (
  <div className={styles.badge} >
   {confidenceBadge()}
  </div>
 );
}

export default ConfidenceBadge;