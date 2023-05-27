

import BackButton from './BackButton';
import styles from './FeedHeader.module.scss';
import { IconType } from 'react-icons';


type FeedHeaderProps = {
 label: string;
 icon: IconType;
 isBack?: boolean;
 hasBottomMargin?: boolean;
}

const FeedHeader: React.FC<FeedHeaderProps> = ({ label, icon: Icon, isBack, hasBottomMargin }) => {


 return (
  <div className={hasBottomMargin ? styles.feedHeaderMarginBottom : styles.feedHeader}>
   <div className={styles.header}>
    <Icon size={20} />
    {isBack ? (
     <BackButton label={label} />
    ) : (
     <p>{label}</p>
    )}
   </div>
  </div>

 );
}

export default FeedHeader;