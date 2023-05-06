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
 formatPrice?: boolean;
 onChange?: (value: any) => void;
 placeholder?: string
};

const Input: React.FC<InputProps> = ({
 id,
 label,
 disabled,
 type,
 required,
 register,
 errors,
 formatPrice,
 placeholder,
 onChange
}) => {
 return (
  <div className={styles.inputWrapper}>
   <label className={styles.inputLabel}>{label}</label>
   {/* TODO - add money icon if wager */}
   <input
    id={id}
    disabled={disabled}
    {...register(id, { required })}
    placeholder={placeholder ? placeholder : ""}
    type={type}
    className={styles.input}
    onChange={onChange}
   />
  </div>
 );
};

export default Input;
