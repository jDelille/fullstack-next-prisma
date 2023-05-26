'use client';
import useSWR from 'swr';
import { useState, useEffect } from 'react';
import { BsArrowBarRight } from 'react-icons/bs';

import styles from './News.module.scss';
import NewsCard from './news-card/NewsCard';

const fetcher = (...args: [RequestInfo, RequestInit?]): Promise<any> =>
 fetch(...args).then((res) => res.json());

const News = () => {
 const [newsData, setNewsData] = useState<any[]>([]);

 useEffect(() => {
  const fetchData = async () => {
   const urls = [
    'https://site.api.espn.com/apis/site/v2/sports/football/nfl/news?limit=10&page=1',
    'https://site.api.espn.com/apis/site/v2/sports/basketball/nba/news?limit=10&page=1',
    'https://site.api.espn.com/apis/site/v2/sports/hockey/nhl/news?limit=10&page=1',
    'https://site.api.espn.com/apis/site/v2/sports/baseball/mlb/news?limit=10&page=1',
   ];

   const responses = await Promise.all(urls.map(url => fetch(url).then(res => res.json())));

   const combinedNewsData = responses.flatMap(response => response.articles);
   const randomizedNewsData = shuffleArray(combinedNewsData);

   setNewsData(randomizedNewsData);
  };

  fetchData();
 }, []);

 // Helper function to shuffle the array randomly
 const shuffleArray = (array: any[]) => {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
   const j = Math.floor(Math.random() * (i + 1));
   [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
 };

 return (
  <div className={styles.news}>
   {newsData.map(news => (
    <NewsCard key={news.id} news={news} />
   ))}
  </div>
 );
};

export default News;