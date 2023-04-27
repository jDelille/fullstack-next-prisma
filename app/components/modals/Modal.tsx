'use client';
import { useCallback, useEffect, useState } from 'react';
import styles from './Modal.module.scss';
import Button from '../button/Button';
import { IconType } from 'react-icons';


type ModalProps = {
 isOpen?: boolean;
 onClose: () => void;
 onSubmit: () => void;
 title?: string;
 body?: React.ReactElement;
 footer?: React.ReactElement;
 actionLabel?: string;
 secondaryAction?: () => void;
 secondaryActionLabel?: string;
 disabled?: boolean;
 icon?: IconType;
 onDemoSubmit?: () => void | undefined;
 isDemoLogin?: boolean;

};

const Modal: React.FC<ModalProps> = ({
 isOpen,
 onClose,
 onSubmit,
 title,
 body,
 footer,
 actionLabel,
 disabled,
 icon: Icon,
 secondaryAction,
 secondaryActionLabel,
 onDemoSubmit,
 isDemoLogin
}) => {
 const [showModal, setShowModal] = useState(isOpen);

 useEffect(() => {
  setShowModal(isOpen);
 }, [isOpen]);

 const handleClose = useCallback(() => {
  if (disabled) {
   return;
  }

  setShowModal(false);
  setTimeout(() => {
   onClose();
  }, 300);
 }, [disabled, onClose]);

 const handleSubmit = useCallback(() => {
  if (disabled) {
   return;
  }
  onSubmit();
 }, [disabled, onSubmit]);

 const handleSecondaryAction = useCallback(() => {
  if (disabled || !secondaryAction) {
   return;
  }

  secondaryAction();
 }, [secondaryAction, disabled]);

 if (!isOpen) {
  return null;
 }

 return (
  <>
   <div className={styles.overlay}>
    <div className={showModal ? styles.modal : styles.hideModal}>
     {/* content */}
     <div className={styles.modalContent}>
      <div className={styles.modalHeader}>
       {Icon && <Icon size={18} className={styles.modalIcon} onClick={handleClose} />}
       {title}
      </div>
      <div className={styles.modalBody}>
       {body}
      </div>
      <div className={styles.buttonsContainer}>
       {secondaryAction && secondaryActionLabel && (
        <Button
         disabled={disabled}
         label={secondaryActionLabel}
         onClick={handleSecondaryAction}
        />
       )}
       <Button
        label={actionLabel}
        onClick={handleSubmit}
        disabled={disabled}
       />
      </div>
      {isDemoLogin && onDemoSubmit && (
       <div className={styles.demoLogin}>
        <p className={styles.demoLabel}>Or sign in with a demo account</p>
        <Button label='Sign into demo account' onClick={onDemoSubmit} />
       </div>
      )}
      {footer}
     </div>
    </div>
   </div>
  </>
 );
};

export default Modal;
