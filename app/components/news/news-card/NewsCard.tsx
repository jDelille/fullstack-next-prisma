import Image from 'next/image';
import styles from './NewsCard.module.scss';

type NewsCardProps = {
 news: any
}

const NewsCard: React.FC<NewsCardProps> = ({ news }) => {

 console.log(news)


 return (
  <div className={styles.newsCard}>
   <div className={styles.newsCardHeader}>
    <Image src={news.images[0].url} fill style={{ objectFit: 'cover' }} alt='image' />
   </div>
   <p>{news.headline}</p>
  </div>
 );
}

export default NewsCard;