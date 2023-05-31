'use client';

import Popup from "./Popup";
import { IoMdClose } from "react-icons/io";
import styles from './Popup.module.scss';
import useInfoPopup from "@/app/hooks/useInfoPopup";
import { InfoPopupString } from "@/app/utils/app-string/InfoPopupString";

const BetInfoPopup: React.FC = () => {

 const infoPopup = useInfoPopup();

 const bodyContent = (
  <div className={styles.modal}>
   <p className={styles.info}>{InfoPopupString.parlayInfo}</p>
   <br />
   <p className={styles.info}>{InfoPopupString.parlaySecondaryInfo}</p>
  </div>
 )

 return (
  <Popup
   isOpen={infoPopup.isOpen}
   onClose={infoPopup.onClose}
   title='Parlay'
   action={() => { }}
   body={bodyContent}
   icon={IoMdClose}
   showClose
  />

 )
}

export default BetInfoPopup