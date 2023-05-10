'use client'
import { IconType } from 'react-icons'
import styles from './Button.module.scss';
type ButtonProps = {
 label?: string;
 onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
 disabled?: boolean;
 icon?: IconType;
 isButtonDisabled?: boolean
}

const Button: React.FC<ButtonProps> = ({ label, onClick, disabled, icon: Icon, isButtonDisabled }) => {
 return (
  <button onClick={onClick} disabled={isButtonDisabled} className={styles.button}>
   {Icon && <Icon size={18} className={styles.buttonIcon} />}
   {label}
  </button>
 );
}

export default Button;