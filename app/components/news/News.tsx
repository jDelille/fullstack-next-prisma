'use client'
import useSWR from 'swr'

import styles from './News.module.scss';
import NewsCard from './news-card/NewsCard';
import { useState } from 'react';
import { BsArrowBarRight } from 'react-icons/bs'

const fetcher = (...args: [RequestInfo, RequestInit?]): Promise<any> =>
 fetch(...args).then((res) => res.json());

const News = () => {


 const { data, error, isLoading } = useSWR(
  `https://site.api.espn.com/apis/site/v2/sports/football/nfl/news?limit=3&page=1`,
  fetcher
 );

 const newsData = data && data.articles

 console.log(newsData)



 return (
  <div className={styles.news}>
   <div className={styles.newsHeader}>
    <p className={styles.newsTitle}>News <span>beta</span></p>
   </div>
   {newsData?.map((news: any) => (
    <NewsCard key={news.id} news={news} />
   ))}

  </div>
 );
}

export default News;