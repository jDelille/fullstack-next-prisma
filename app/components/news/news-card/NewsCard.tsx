import Image from 'next/image';
import styles from './NewsCard.module.scss';
import { BsPencilSquare } from 'react-icons/bs';

type NewsCardProps = {
 news: any
}

const NewsCard: React.FC<NewsCardProps> = ({ news }) => {
 return (
  <a className={styles.newsCard} href={news.links?.web.href} target
   ="_blank" >

   <div className={styles.newsCardBody}>
    <div className={styles.newsCardText}>
     <p className={styles.headline}>{news.headline}</p>
     <p className={styles.description}>{news.description}</p>
     <p className={styles.byline}><BsPencilSquare />{news.byline || 'ESPN'}</p>
    </div>
    <div className={styles.newsCardImage}>
     <Image src={news?.images?.[0].url} alt='image' width={135} height={105} style={{ objectFit: 'cover' }} />
    </div>
   </div>
  </a>
 );
}

export default NewsCard;