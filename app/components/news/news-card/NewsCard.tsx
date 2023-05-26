import Image from 'next/image';
import styles from './NewsCard.module.scss';

type NewsCardProps = {
 news: any
}

const NewsCard: React.FC<NewsCardProps> = ({ news }) => {


 return (
  <div className={styles.newsCard}>
   {/* <div className={styles.newsCardHeader}>
    <Image src={news.images[0].url} fill style={{ objectFit: 'cover' }} alt='image' />
   </div> */}
   <div className={styles.newsCardBody}>
    <p>{news.headline}</p>


   </div>
   <div className={styles.newsCardFooter}>
    <p className={styles.byline}>{news.byline}</p>
    <a href={news.links.web.href} target='_blank'>Read article</a>
   </div>
   {/* <div className={styles.newsCardFooter}>
    <p>{news.categories[1].description}</p>
   </div> */}
  </div>
 );
}

export default NewsCard;