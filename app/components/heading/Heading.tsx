'use client'
import styles from './Heading.module.scss';

type HeadingProps = {
 title: string;
 subTitle?: string;
}

const Heading: React.FC<HeadingProps> = ({ title, subTitle }) => {
 return (
  <div className={styles.heading}>
   <div className={styles.headingTitle}>{title}</div>
   <div className={styles.headingSubTitle}>{subTitle}</div>
  </div>
 );
}

export default Heading;