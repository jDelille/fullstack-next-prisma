'use client'
import styles from './Scoreboard.module.scss';
import useSWR from 'swr'
import GameCard from './game-card/GameCard';
import Select from 'react-select';
import { useState, useRef } from 'react';
import { IoChevronForwardOutline, IoChevronBackOutline } from 'react-icons/io5'
import { Game } from '@/app/types/Game';
import { customStyles } from '@/app/utils/helpers';

const fetcher = (...args: [RequestInfo, RequestInit?]): Promise<any> =>
 fetch(...args).then((res) => res.json());

const Scoreboard: React.FC = () => {

 const [sport, setSport] = useState('baseball')
 const [league, setLeague] = useState('mlb')

 const { data, error, isLoading } = useSWR(
  `https://site.api.espn.com/apis/site/v2/sports/${sport}/${league}/scoreboard`,
  fetcher
 );

 const games = data && data.events
 // const date = data && data.day.date

 const sports = [
  { value: 'mlb', label: 'MLB', league: 'baseball' },
  { value: 'nba', label: 'NBA', league: 'basketball' },
  { value: 'nfl', label: 'NFL', league: 'football' },
  { value: 'nhl', label: 'NHL', league: 'hockey' },
  { value: 'usa.1', label: 'MLS', league: 'soccer' },
 ]

 const gameScrollerRef = useRef<HTMLDivElement>(null);

 const scrollContainer = (scrollOffset: number) => {
  if (gameScrollerRef.current) {
   gameScrollerRef.current.scrollBy({
    left: scrollOffset,
    behavior: 'smooth',
   });
  }
 };


 return (
  <div className={styles.scoreboard}>
   <div className={styles.sportSelector}>
    <Select placeholder="MLB" isClearable={false} options={sports} styles={customStyles} defaultValue={sports[0]} onChange={(value) => { setSport(value?.league as string); setLeague(value?.value as string) }} />
   </div>
   <div className={styles.games} ref={gameScrollerRef} >
    {games?.map((game: Game) => (
     <GameCard key={game.id} game={game} />
    ))}
   </div >
   {games?.length > 2 && (
    <div className={styles.gameScroller}>
     <div className={styles.arrow} onClick={() => scrollContainer(-300)}><IoChevronBackOutline color='#abadb1' size={20} /></div>
     <div className={styles.arrow} onClick={() => scrollContainer(300)}><IoChevronForwardOutline color='#abadb1' size={20} /></div>
    </div>
   )}

  </div >
 );
}

export default Scoreboard;
