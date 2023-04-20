'use client'
import { IconType } from 'react-icons'
import styles from './Button.module.scss';
type ButtonProps = {
 label: string;
 onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
 disabled?: boolean;
 icon?: IconType
}

const Button: React.FC<ButtonProps> = ({ label, onClick, disabled, icon: Icon }) => {
 return (
  <button onClick={onClick} disabled={disabled} className={styles.button}>
   {Icon && <Icon size={18} className={styles.buttonIcon} />}
   {label}
  </button>
 );
}

export default Button;