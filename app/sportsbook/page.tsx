import FeedHeader from '../components/feed-header/FeedHeader';
import styles from './Page.module.scss';
import { HiBanknotes } from 'react-icons/hi2';
import SportsbookTable from '../components/sportsbook-table/SportsbookTable';


const Sportsbook = () => {
 return (
  <div className={styles.page}>
   <FeedHeader label='Sportsbook' icon={HiBanknotes} />
   <div className={styles.sportsbookTableContainer}>
    <SportsbookTable />
   </div>
  </div>
 );
}

export default Sportsbook;