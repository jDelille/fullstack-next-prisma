'use client';

import { Odds } from '@/app/types/Odds';
import { useState, useEffect } from 'react';
import styles from './OddsSelect.module.scss';
import { FieldValues, UseFormRegister } from 'react-hook-form';

type OddsSelectProps = {
  matchId: string;
  onClick: (value: any) => void;
  name: string;
  homeTeam: string;
  awayTeam: string;
  leagueName: string;
  homeId: number;
  awayId: number;
  id: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
};

const OddsSelect: React.FC<OddsSelectProps> = ({
  matchId,
  onClick,
  name,
  homeTeam,
  awayTeam,
  leagueName,
  id,
  required,
  register,
  homeId,
  awayId,
}) => {
  const [odds, setOdds] = useState<Odds | null>();
  const [selected, setSelected] = useState('');
  const [sport, setSport] = useState('');

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

    const lowerCaseLeagueName = leagueName?.toLowerCase();

    async function getOddsData() {
      try {
        const res = await fetch(
          `https://sports.core.api.espn.com/v2/sports/${sport}/leagues/${lowerCaseLeagueName}/events/${matchId}/competitions/${matchId}/odds`
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

    if (sport) {
      getOddsData();
    }
  }, [leagueName, matchId, sport]);

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
                id={id}
                {...register(id, { required })}
                onClick={() => {
                  onClick({
                    odds: odds?.homeTeamOdds.moneyLine,
                    type: 'Moneyline',
                    favorite: odds?.homeTeamOdds.favorite,
                    value: null,
                    homeTeam: homeTeam,
                    location: 'home',
                    homeId: homeId,
                    awayId: awayId,
                    gameId: matchId,
                    sport: sport,
                  });
                  setSelected('homeML');
                }}>
                <p>{odds?.homeTeamOdds.moneyLine}</p>
              </div>
              <div
                className={
                  selected === 'awayML'
                    ? styles.awayOddBordered
                    : styles.awayOdd
                }
                id={id}
                {...register(id, { required })}
                onClick={() => {
                  onClick({
                    odds: odds?.awayTeamOdds.moneyLine,
                    type: 'Moneyline',
                    favorite: odds?.awayTeamOdds.favorite,
                    value: null,
                    awayTeam: awayTeam,
                    location: 'away',
                    homeId: homeId,
                    awayId: awayId,
                    gameId: matchId,
                    sport: sport,
                  });
                  setSelected('awayML');
                }}>
                <p>{odds?.awayTeamOdds.moneyLine}</p>
              </div>
            </div>
            {/* spread */}
            {odds?.homeTeamOdds?.spreadOdds && (
              <div className={styles.oddsWrapper}>
                <label>Spread</label>
                <div
                  className={
                    selected === 'homeSpread'
                      ? styles.homeOddBordered
                      : styles.homeOdd
                  }
                  id={id}
                  {...register(id, { required })}
                  onClick={() => {
                    onClick({
                      odds: odds?.homeTeamOdds.spreadOdds,
                      type: 'Spread',
                      favorite: odds?.homeTeamOdds.favorite,
                      value: odds?.spread,
                      homeTeam: homeTeam,
                      location: 'home',
                      homeId: homeId,
                      awayId: awayId,
                      gameId: matchId,
                      sport: sport,
                    });
                    setSelected('homeSpread');
                  }}>
                  <p>
                    {odds.homeTeamOdds.favorite ? '-' : '+'}
                    {odds.spread.toString().slice(1)}
                  </p>
                  <p>{odds?.homeTeamOdds.spreadOdds}</p>
                </div>
                <div
                  className={
                    selected === 'awaySpread'
                      ? styles.awayOddBordered
                      : styles.awayOdd
                  }
                  id={id}
                  {...register(id, { required })}
                  onClick={() => {
                    onClick({
                      odds: odds?.awayTeamOdds.spreadOdds,
                      type: 'Spread',
                      favorite: odds?.awayTeamOdds.favorite,
                      value: odds?.spread,
                      awayTeam: awayTeam,
                      location: 'away',
                      homeId: homeId,
                      awayId: awayId,
                      gameId: matchId,
                      sport: sport,
                    });
                    setSelected('awaySpread');
                  }}>
                  <p>
                    {odds.awayTeamOdds.favorite ? '-' : '+'}
                    {odds.spread.toString().slice(0)}
                  </p>
                  <p>{odds?.awayTeamOdds.spreadOdds}</p>
                </div>
              </div>
            )}

            {/* over/under */}
            <div className={styles.oddsWrapper}>
              <label>Over / Under</label>
              <div
                id={id}
                {...register(id, { required })}
                className={
                  selected === 'over' ? styles.homeOddBordered : styles.homeOdd
                }
                onClick={() => {
                  onClick({
                    odds: odds?.overOdds,
                    type: 'Over',
                    favorite: odds?.homeTeamOdds.favorite,
                    value: odds.overUnder,
                    homeTeam: homeTeam,
                    location: 'home',
                    homeId: homeId,
                    awayId: awayId,
                    gameId: matchId,
                    sport: sport,
                  });
                  setSelected('over');
                }}>
                <p>O {odds.overUnder}</p>
                <p>{odds?.overOdds}</p>
              </div>
              <div
                id={id}
                {...register(id, { required })}
                className={
                  selected === 'under' ? styles.awayOddBordered : styles.awayOdd
                }
                onClick={() => {
                  onClick({
                    odds: odds?.underOdds,
                    type: 'Under',
                    favorite: odds?.awayTeamOdds.favorite,
                    value: odds.overUnder,
                    awayTeam: awayTeam,
                    location: 'away',
                    homeId: homeId,
                    awayId: awayId,
                    gameId: matchId,
                    sport: sport,
                  });
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
