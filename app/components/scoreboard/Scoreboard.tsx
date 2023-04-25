'use client'
import axios from 'axios';
import styles from './Scoreboard.module.scss';
import { useEffect, useState } from 'react';
import { Game } from '@/app/types/Game';
import useSWR from 'swr'
import GameCard from './game-card/GameCard';
import Image from 'next/image';



const fetcher = (...args: [RequestInfo, RequestInit?]): Promise<any> =>
 fetch(...args).then((res) => res.json());

const Scoreboard: React.FC = () => {
 const { data, error, isLoading } = useSWR(
  'http://site.api.espn.com/apis/site/v2/sports/baseball/mlb/scoreboard',
  fetcher
 );

 const games = data && data.events



 return (
  <div className={styles.scoreboard}>
   <div className={styles.sportSelector}>
    
   </div>
   <div className={styles.games}>
    {games?.map((game: any) => (
     <GameCard key={game.id} game={game} />
    ))}
   </div>

  </div>
 );
}

export default Scoreboard;