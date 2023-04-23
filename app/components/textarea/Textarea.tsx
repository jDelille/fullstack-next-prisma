'use client';

import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import styles from './Textarea.module.scss';

type TextareaProps = {
 id: string;
 label: string;
 disabled?: boolean;
 required?: boolean;
 register: UseFormRegister<FieldValues>;
 errors: FieldErrors;
 onChange?: (value: any) => void;
};

const Textarea: React.FC<TextareaProps> = ({
 id,
 label,
 disabled,
 required,
 register,
 errors,
 onChange
}) => {
 return (
  <div className={styles.textareaWrapper}>
   <label className={styles.textareaLabel}>{label}</label>
   {/* TODO - add money icon if wager */}
   <textarea
    id={id}
    disabled={disabled}
    {...register(id, { required })}
    placeholder=' '
    className={styles.textarea}
    onChange={onChange}

   />
  </div>
 );
};

export default Textarea;
