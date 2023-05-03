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
 step?: number;
 setStep?: (value: number) => void;
 noMatches?: boolean;
 setIsEmpty?: (value: boolean) => void;

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
 isDemoLogin,
 step,
 setStep,
 noMatches,
 setIsEmpty
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

 const backToSettings = () => {
  if (setStep) {
   setStep(0)
  }
 }

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

  if (noMatches) {
   setIsEmpty && setIsEmpty(false)
  }

  secondaryAction();
 }, [disabled, secondaryAction, noMatches, setIsEmpty]);

 if (!isOpen) {
  return null;
 }

 return (
  <>
   <div className={styles.overlay}>
    <div className={showModal ? styles.modal : styles.hideModal}>
     {/* content */}
     <div className={styles.modalContent}>
      {step !== 3 ? (
       <div className={styles.modalHeader}>
        {Icon && <Icon size={30} className={styles.modalIcon} onClick={handleClose} />}
        {title}
       </div>
      ) : (
       <div className={styles.modalHeader}>
        {Icon && <Icon size={30} className={styles.modalIcon} onClick={backToSettings} />}
        Edit Filters
       </div>
      )}

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
       {noMatches ? (
        null
       ) : (
        step !== 3 && (
         <Button
          label={actionLabel}
          onClick={handleSubmit}
          disabled={disabled}
         />
        )
       )}

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
