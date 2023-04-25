'use client'
import { useState } from "react";
import useSWR from 'swr'
import NewsCard from "./news-card/NewsCard";
import styles from './News.module.scss';

const fetcher = (...args: [RequestInfo, RequestInit?]): Promise<any> =>
 fetch(...args).then((res) => res.json());

const News = () => {

 const [news, setNews] = useState(null)
 const { data, error, isLoading } = useSWR(
  `https://site.api.espn.com/apis/site/v2/sports/basketball/nba/news`,
  fetcher
 );


 return (
  <div className={styles.news}>
   {data?.articles.map((news: any, index: number) => {
    if (index < 2) {
     return (
      <NewsCard key={index} news={news} />
     )
    }
   }


   )}
  </div>
 );
}

export default News;