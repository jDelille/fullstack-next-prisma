'use client';

import { Odds } from '@/app/types/Odds';
import { useState, useEffect } from 'react';
import styles from './OddsSelect.module.scss';

type OddsSelectProps = {
  matchId: string;
  onClick: (value: any) => void;
};

const OddsSelect: React.FC<OddsSelectProps> = ({ matchId, onClick }) => {
  const [odds, setOdds] = useState<Odds | null>();
  const [selected, setSelected] = useState('');

  async function getOddsData() {
    try {
      const res = await fetch(
        `https://sports.core.api.espn.com/v2/sports/basketball/leagues/nba/events/${matchId}/competitions/${matchId}/odds`
      );

      if (!res.ok) {
        throw new Error('Failed to fetch matches');
      }

      const data = await res.json();
      setOdds(data.items[0]);
    } catch (error) {
      console.log(error);
    }
  }



  useEffect(() => {
    if (!odds) {
      getOddsData();
    }
  }, []);

  return (
    <>
      {odds && (
        <>
          {/* moneyline */}
          <div className={styles.odds}>
            <div className={styles.oddsWrapper}>
              <label>Moneyline</label>
              <div
                className={
                  selected === 'homeML'
                    ? styles.homeOddBordered
                    : styles.homeOdd
                }
                onClick={() => {
                  onClick({ odds: odds?.homeTeamOdds.moneyLine, type: 'Moneyline', favorite: odds?.homeTeamOdds.favorite, value: null }); setSelected('homeML');
                }}>
                <p>{odds?.homeTeamOdds.moneyLine}</p>
              </div>
              <div
                className={
                  selected === 'awayML'
                    ? styles.awayOddBordered
                    : styles.awayOdd
                }
                onClick={() => {
                  onClick({ odds: odds?.awayTeamOdds.moneyLine, type: 'Moneyline', favorite: odds?.awayTeamOdds.favorite, value: null });
                  setSelected('awayML');
                }}>
                <p>{odds?.awayTeamOdds.moneyLine}</p>
              </div>
            </div>
            {/* spread */}
            <div className={styles.oddsWrapper}>
              <label>Spread</label>
              <div
                className={
                  selected === 'homeSpread'
                    ? styles.homeOddBordered
                    : styles.homeOdd
                }
                onClick={() => {
                  onClick({ odds: odds?.homeTeamOdds.spreadOdds, type: 'Spread', favorite: odds?.homeTeamOdds.favorite, value: odds?.spread });
                  setSelected('homeSpread');
                }}>
                <p>{odds.homeTeamOdds.favorite ? '-' : '+'}{odds.spread.toString().slice(1)}</p>
                <p>{odds?.homeTeamOdds.spreadOdds}</p>
              </div>
              <div
                className={
                  selected === 'awaySpread'
                    ? styles.awayOddBordered
                    : styles.awayOdd
                }
                onClick={() => {
                  onClick({ odds: odds?.awayTeamOdds.spreadOdds, type: 'Spread', favorite: odds?.awayTeamOdds.favorite, value: odds?.spread });
                  setSelected('awaySpread');
                }}>
                <p>{odds.awayTeamOdds.favorite ? '-' : '+'}{odds.spread.toString().slice(0)}</p>
                <p>{odds?.awayTeamOdds.spreadOdds}</p>
              </div>
            </div>
            {/* over/under */}
            <div className={styles.oddsWrapper}>
              <label>Over / Under</label>
              <div
                className={
                  selected === 'over'
                    ? styles.homeOddBordered
                    : styles.homeOdd
                }
                onClick={() => {
                  onClick({ odds: odds?.overOdds, type: 'Over', favorite: odds?.homeTeamOdds.favorite, value: odds.overUnder })
                  setSelected('over');
                }}>
                <p>O {odds.overUnder}</p>
                <p>{odds?.overOdds}</p>
              </div>
              <div
                className={
                  selected === 'under'
                    ? styles.awayOddBordered
                    : styles.awayOdd
                }
                onClick={() => {
                  onClick({ odds: odds?.underOdds, type: 'Under', favorite: odds?.awayTeamOdds.favorite, value: odds.overUnder });
                  setSelected('under');
                }}>
                <p>U {odds.overUnder}</p>
                <p>{odds?.underOdds}</p>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default OddsSelect;
