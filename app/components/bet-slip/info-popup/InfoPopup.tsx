import { InfoPopupString } from '@/app/utils/app-string/InfoPopupString';
import styles from './InfoPopup.module.scss';
import { IoMdClose } from 'react-icons/io';

type InfoPopupProps = {
 setShowInfoPopup: (value: boolean) => void;
}

const InfoPopup: React.FC<InfoPopupProps> = ({ setShowInfoPopup }) => {
 return (
  <div className={styles.overlay}>
   <div className={styles.modal}>
    <p className={styles.title}>
     {InfoPopupString.parlay}
     <IoMdClose size={20} onClick={() => setShowInfoPopup(false)} />
    </p>
    <p className={styles.info}>{InfoPopupString.parlayInfo}</p>

    <p className={styles.info}>{InfoPopupString.parlaySecondaryInfo}</p>
   </div>
  </div>
 );
}

export default InfoPopup;