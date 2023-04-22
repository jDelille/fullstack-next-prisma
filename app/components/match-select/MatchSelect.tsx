'use client';

import { Game } from '@/app/types/Game';
import { useState, useEffect } from 'react';
import styles from './MatchSelect.module.scss';

type MatchSelectProps = {
 onClick: (value: any) => void;
 selected: string;
 leagueName?: string;
};

const MatchSelect: React.FC<MatchSelectProps> = ({ selected, onClick, leagueName }) => {
 const [matches, setMatches] = useState<Game[] | null>();
 const [sport, setSport] = useState("baseball")

 useEffect(() => {
  switch (leagueName) {
   case 'NBA':
    setSport('basketball');
    break;
   case 'MLB':
    setSport('baseball');
    break;
   case 'NFL':
    setSport('football');
    break;
   case 'NHL':
    setSport('hockey');
    break;
   case 'usa.1':
    setSport('soccer');
    break;
   default:
    setSport('');
    break;
  }
 }, [leagueName]);


 const lowerCaseLeagueName = leagueName?.toLowerCase()

 useEffect(() => {
  async function getMatchData() {
   try {
    const res = await fetch(
     `http://site.api.espn.com/apis/site/v2/sports/${sport}/${lowerCaseLeagueName}/scoreboard`
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

  getMatchData();
 }, [lowerCaseLeagueName, sport]);




 return (
  <>
   {matches?.map((match) => (
    <div
     key={match.id}
     className={
      selected === match.id ? styles.borderedMatch : styles.match
     }
     onClick={() => onClick({ matchId: match.id, name: match.name, status: match.status.type.shortDetail, homeTeam: match.competitions[0].competitors[0].team.displayName, awayTeam: match.competitions[0].competitors[1].team.displayName })}>
     {match.name}
    </div>
   ))}
  </>
 );
};

export default MatchSelect;
