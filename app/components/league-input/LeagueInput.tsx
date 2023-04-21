import { IconType } from 'react-icons';
import styles from './LeagueInput.module.scss'

type LeagueInputProps = {
 label: string;
 selected?: boolean;
 onClick: (value: string) => void;
 icon?: IconType

}


const LeagueInput: React.FC<LeagueInputProps> = ({ label, selected, onClick, icon: Icon }) => {
 return (
  <div onClick={() => onClick(label)} className={selected ? styles.bordered : styles.noBorder}>
   {Icon && <Icon size={18} className={styles.leagueIcon} />}
   <p>{label}</p>

  </div>

 );
}

export default LeagueInput;