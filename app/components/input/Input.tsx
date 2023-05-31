'use client';

import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import styles from './Input.module.scss';
import { MdAttachMoney } from 'react-icons/md';

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
 placeholder?: string;
 inputMode?: 'search' | 'text' | 'email' | 'tel' | 'url' | 'numeric' | 'decimal' | 'none';
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
 onChange,
 inputMode
}) => {

 return (
  <div className={formatPrice ? styles.numberInputWrapper : styles.inputWrapper}>
   {!formatPrice && (
    <label className={styles.inputLabel}>{label}</label>
   )}
   {/* TODO - add money icon if wager */}
   {formatPrice && (
    <p className={styles.moneySymbol}>$</p>
   )}
   <input
    id={id}
    disabled={disabled}
    {...register(id, { required })}
    placeholder={placeholder ? placeholder : ''}
    type={type}
    className={styles.input}
    onChange={onChange}
    inputMode={inputMode || 'text'}
   />
  </div>
 );
};

export default Input;
