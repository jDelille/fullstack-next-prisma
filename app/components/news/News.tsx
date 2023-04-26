'use client'
import styles from './News.module.scss';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';


const News = () => {


 return (
  <div className={styles.news}>
   <p>NBA News </p>
   <Carousel>

   </Carousel>
  </div>
 );
}

export default News;