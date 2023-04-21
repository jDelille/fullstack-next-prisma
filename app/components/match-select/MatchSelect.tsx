'use client';

import { Game } from '@/app/types/Game';
import { useState, useEffect } from 'react';
import styles from './MatchSelect.module.scss';

type MatchSelectProps = {
 onClick: (value: any) => void;
 selected: string;
};

const MatchSelect: React.FC<MatchSelectProps> = ({ selected, onClick }) => {
 const [matches, setMatches] = useState<Game[] | null>();

 async function getMatchData() {
  try {
   const res = await fetch(
    'http://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard'
   );

   if (!res.ok) {
    throw new Error('Failed to fetch matches');
   }

   const data = await res.json();
   setMatches(data.events);
  } catch (error) {
   console.log(error);
  }
 }

 useEffect(() => {
  getMatchData();
 }, []);

 console.log(matches);

 return (
  <>
   {matches?.map((match) => (
    <div
     key={match.id}
     className={
      selected === match.id ? styles.borderedMatch : styles.match
     }
     onClick={() => onClick({ matchId: match.id, name: match.name, status: match.status.type.shortDetail,  })}>
     {match.name}
    </div>
   ))}
  </>
 );
};

export default MatchSelect;
