'use client';

import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import styles from './Input.module.scss';

type NumberInputProps = {
 id: string;
 label: string;
 disabled?: boolean;
 type?: string;
 required?: boolean;
 onChange?: (value: any) => void;

};

const Input: React.FC<NumberInputProps> = ({
 id,
 label,
 disabled,
 type,
 required,
 register,
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
