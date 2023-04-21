'use client'

import { Game } from '@/app/types/Game';
import { useState, useEffect } from 'react'
import styles from './MatchSelect.module.scss';

type MatchSelectProps = {
 onClick: (value: string) => void;
 selected: string
}


const MatchSelect: React.FC<MatchSelectProps> = ({ selected, onClick }) => {

 const [matches, setMatches] = useState<Game[] | null>()

 async function getMatchData() {
  try {
   const res = await fetch(
    'http://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard'
   );

   if (!res.ok) {
    throw new Error('Failed to fetch matches');
   }

   const data = await res.json();
   setMatches(data.events)

  } catch (error) {
   console.log(error)
  }
 }

 useEffect(() => {
  getMatchData()
 }, [])

 return (
  <>
   {matches?.map((match) => (
    <div key={match.id} className={selected === match.id ? styles.borderedMatch : styles.match} onClick={() => onClick(match.id)}>{match.name} </div>
   ))}
  </>
 );
}

export default MatchSelect;