import { IconType } from 'react-icons';
import styles from './LeagueInput.module.scss'

type LeagueInputProps = {
 label: string;
 selected?: boolean;
 onClick: (value: string) => void;
 icon?: IconType
 shortLabel: string;

}


const LeagueInput: React.FC<LeagueInputProps> = ({ label, selected, onClick, icon: Icon, shortLabel }) => {
 return (
  <div onClick={() => onClick(shortLabel)} className={selected ? styles.bordered : styles.noBorder}>
   {Icon && <Icon size={18} className={styles.leagueIcon} />}
   <p className={styles.longLabel}>{label}</p>
   <p className={styles.shortLabel}>{shortLabel}</p>
  </div>

 );
}

export default LeagueInput;