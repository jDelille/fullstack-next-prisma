'use client';
import { useCallback, useEffect, useState } from 'react';
import styles from './Modal.module.scss';
import Button from '../button/Button';
import { IoMdClose } from 'react-icons/io';
import { IconType } from 'react-icons';

type ModalProps = {
 isOpen?: boolean;
 onClose: () => void;
 onSubmit: () => void;
 secondaryAction?: () => void;
 title?: string;
 body?: React.ReactElement;
 footer?: React.ReactElement;
 actionLabel?: string;
 disabled?: boolean;
 icon?: IconType

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
 }, [disabled, secondaryAction]);

 if (!isOpen) {
  return null;
 }

 return (
  <>
   <div className={styles.overlay}>
    <div className={styles.modal}>
     {/* content */}
     <div className={styles.modalContent}>
      <div className={styles.modalHeader}>
       {Icon && <Icon size={18} className={styles.modalIcon} onClick={handleClose} />}
       {title}
      </div>
      <div className={styles.modalBody}>
       {body}
      </div>
      <Button
       label={actionLabel}
       onClick={handleSubmit}
       disabled={disabled}
      />
      {footer}
     </div>
    </div>
   </div>
  </>
 );
};

export default Modal;
