'use client';
import { useState, useEffect, useCallback } from "react";
import styles from './Popup.module.scss';
import { IconType } from "react-icons";
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';

type PopupProps = {
 isOpen?: boolean;
 onClose: () => void;
 title?: string;
 body?: React.ReactElement;
 footer?: React.ReactElement;
 action: () => void;
 actionLabel?: string;
 secondaryAction?: () => void;
 secondaryActionLabel?: string;
 icon?: IconType;
 showClose?: boolean
}

const Popup: React.FC<PopupProps> = ({ isOpen, onClose, title, body, footer, action, actionLabel, secondaryAction, secondaryActionLabel, icon: Icon, showClose
}) => {

 const [showPopup, setShowPopup] = useState(isOpen);

 useEffect(() => {
  setShowPopup(isOpen);
 }, [isOpen]);

 const handleClose = useCallback(() => {
  setShowPopup(false);
  setTimeout(() => {
   onClose();
  }, 300);
 }, [onClose]);

 if (!isOpen) {
  return null;
 }

 return (
  <>
   <div className={styles.overlay}>
    <SimpleBar className={showPopup ? styles.popup : styles.hidePopup}>
     <div className={styles.popupContent}>
      <div className={styles.popupHeader}>
       {title}
       {showClose && (
        <div>
         {Icon && <Icon size={20} className={styles.modalIcon} onClick={handleClose} />}
        </div>
       )}
      </div>
      <div className={styles.popupBody}>
       {body}
      </div>
     </div>
    </SimpleBar>
   </div>
  </>
 );
}

export default Popup;