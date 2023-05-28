'use client'
import { IconType } from 'react-icons'
import styles from './Button.module.scss';

type ButtonProps = {
 label?: string;
 isButtonDisabled?: boolean
 icon?: IconType;
 onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
 ariaLabel?: string;
 tabIndex?: number
}

const Button: React.FC<ButtonProps> = ({ label, onClick, icon: Icon, isButtonDisabled, ariaLabel, tabIndex }) => {
 return (
  <button
   onClick={onClick}
   disabled={isButtonDisabled}
   className={styles.button}
   aria-label={ariaLabel}
   tabIndex={tabIndex}

  >
   {Icon && <Icon size={18} className={styles.buttonIcon} />}
   {label}
  </button>
 );
}

export default Button;