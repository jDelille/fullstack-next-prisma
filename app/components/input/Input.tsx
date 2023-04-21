'use client';

import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import styles from './Input.module.scss';

type InputProps = {
 id: string;
 label: string;
 disabled?: boolean;
 type?: string;
 required?: boolean;
 register: UseFormRegister<FieldValues>;
 errors: FieldErrors;
};

const Input: React.FC<InputProps> = ({
 id,
 label,
 disabled,
 type,
 required,
 register,
 errors,
}) => {
 return (
  <div className={styles.inputWrapper}>
   <label className={styles.inputLabel}>{label}</label>

   <input
    id={id}
    disabled={disabled}
    {...register(id, { required })}
    placeholder=' '
    type={type}
    className={styles.input}
   />
  </div>
 );
};

export default Input;
