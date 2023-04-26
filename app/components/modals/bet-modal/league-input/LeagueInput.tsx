import { IconType } from 'react-icons';
import styles from './LeagueInput.module.scss';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';

type LeagueInputProps = {
 label: string;
 selected?: boolean;
 onClick: (value: string) => void;
 icon?: IconType;
 shortLabel: string;
 id: string;
 required?: boolean;
 register: UseFormRegister<FieldValues>;
 errors: FieldErrors;

};

const LeagueInput: React.FC<LeagueInputProps> = ({
 label,
 selected,
 onClick,
 icon: Icon,
 shortLabel,
 register,
 required,
 id,
 errors
}) => {

 console.log(errors)

 return (
  <div
   id={id}
   onClick={() => onClick(shortLabel)}
   {...register(id, { required })}
   className={selected ? styles.bordered : styles.noBorder}>
   {Icon && <Icon size={18} className={styles.leagueIcon} />}
   <p className={styles.longLabel}>{label}</p>
   <p className={styles.shortLabel}>{shortLabel}</p>
  </div>
 );
};

export default LeagueInput;
