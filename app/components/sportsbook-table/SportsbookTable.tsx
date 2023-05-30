'use client';

import SportSelector from "@/app/components/sportsbook-table/SportSelector";
import { useEffect, useState } from "react";
import styles from './SportsbookTable.module.scss';
import GameCard from "./game-card/GameCard";

const SportsbookTable = () => {

 const [sport, setSport] = useState('baseball')
 const [league, setLeague] = useState("mlb")
 const [matches, setMatches] = useState([])
 const [isLoading, setIsLoading] = useState(false)

 useEffect(() => {
  async function getMatchData() {
   try {
    setIsLoading(true)
    const delay = 0;
    setTimeout(async () => {
     const res = await fetch(
      `https://site.api.espn.com/apis/site/v2/sports/${sport}/${league}/scoreboard`
     );

     if (!res.ok) {
      throw new Error('Failed to fetch matches');
     }

     const data = await res.json();
     setMatches(data.events);
     setIsLoading(false);
    }, delay);
   } catch (error) {
    console.log(error);
   } finally {
    setIsLoading(false)
   }
  }
  getMatchData();
 }, [league, sport]);


 return (
  <>
   <div className={styles.sportSelectorContainer}>
    <SportSelector setSport={setSport} sport={sport} setLeague={setLeague} />
   </div>
   <div className={styles.sportsbookTable}>
    <div className={styles.header}>
     {sport} - {league}
    </div>

    <div className={`${styles.feed} ${isLoading ? styles.loading : styles.loaded}`}>
     {matches.map((match, i) => (
      <GameCard key={i} game={match} sport={sport} league={league} />
     ))}
    </div>


   </div>
  </>
 );
}

export default SportsbookTable;