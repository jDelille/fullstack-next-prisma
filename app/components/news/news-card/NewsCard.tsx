import Image from 'next/image';
import styles from './NewsCard.module.scss';

type NewsCardProps = {
 news: any
}

const NewsCard: React.FC<NewsCardProps> = ({ news }) => {


 return (
  <div className={styles.newsCard}>
   <div className={styles.newsCardHeader}>
    <Image src={news.images[0].url} fill style={{ objectFit: 'cover' }} alt='image' />
   </div>
   <div className={styles.newsCardBody}>
    <p>{news.headline}</p>
    <p>{news.description}</p>
   </div>
   <div className={styles.newsCardFooter}>
    <p>{news.categories[1].description}</p>
   </div>
  </div>
 );
}

export default NewsCard;