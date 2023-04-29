'use client'
import styles from './Scoreboard.module.scss';
import useSWR from 'swr'
import GameCard from './game-card/GameCard';
import Select from 'react-select';
import { useState, useContext, useEffect, useRef } from 'react';
import { IoChevronForwardOutline, IoChevronBackOutline } from 'react-icons/io5'

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


 const customStyles = {
  control: (provided: any) => ({
   ...provided,
   borderRadius: '4px',
   borderColor: '#27282f',
   boxShadow: 'none',
   backgroundColor: '#17181c',
   color: '#fcfeff',
   cursor: 'pointer'
  }),
  option: (provided: any, state: any) => ({
   ...provided,
   backgroundColor: state.isSelected ? '#20b46a' : '#17181c',
   color: state.isSelected ? '#fcfeff' : '#fcfeff',
   cursor: 'pointer',
   ':hover': {
    backgroundColor: state.isSelected ? '#20b46a' : '#1e1f23',
    color: state.isSelected ? '#fcfeff' : '#fcfeff'
   }
  }),
  menu: (provided: any) => ({
   ...provided,
   backgroundColor: '#17181c',

  }),
  menuList: (provided: any) => ({
   ...provided,
   backgroundColor: '#17181c',
   color: '#fcfeff',
  }),
  singleValue: (provided: any) => ({
   ...provided,
   color: '#fcfeff',
  }),
  indicatorSeparator: (provided: any) => ({
   ...provided,
   backgroundColor: '#fcfeff',
  }),
 };

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
    {/* <p>{date}</p> */}
   </div>
   <div className={styles.games} ref={gameScrollerRef}>
    {games?.map((game: any) => (
     <GameCard key={game.id} game={game} />
    ))}
   </div>
   {games?.length > 2 && (
    <div className={styles.gameScroller}>
     <div className={styles.arrow} onClick={() => scrollContainer(-300)}><IoChevronBackOutline color='#abadb1' size={20} /></div>
     <div className={styles.arrow} onClick={() => scrollContainer(300)}><IoChevronForwardOutline color='#abadb1' size={20} /></div>
    </div>
   )}

  </div>
 );
}

export default Scoreboard;
