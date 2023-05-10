'use client';

import { Game } from '@/app/types/Game';
import { useState, useEffect } from 'react';
import styles from './MatchSelect.module.scss';
import { FieldValues, UseFormRegister } from 'react-hook-form';

type MatchSelectProps = {
  onClick: (value: any) => void;
  selected: string;
  leagueName?: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  id: string;
  setIsEmpty?: (value: boolean) => void;
};

const MatchSelect: React.FC<MatchSelectProps> = ({
  selected,
  onClick,
  leagueName,
  required,
  register,
  id,
  setIsEmpty,
}) => {
  const [matches, setMatches] = useState<Game[] | null>();
  const [sport, setSport] = useState('baseball');

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

  const lowerCaseLeagueName = leagueName?.toLowerCase();

  useEffect(() => {
    async function getMatchData() {
      try {
        const res = await fetch(
          `https://site.api.espn.com/apis/site/v2/sports/${sport}/${lowerCaseLeagueName}/scoreboard`
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

  const currentMatches = matches?.filter(
    (match) =>
      match.status.type.state !== 'post' &&
      (match.status.type.state === 'in' || match.status.type.state === 'pre')
  );

  useEffect(() => {
    if (currentMatches && currentMatches.length === 0) {
      setIsEmpty && setIsEmpty(true)
    } else {
      setIsEmpty && setIsEmpty(false)
    }
  }, [currentMatches])

  return (
    <>
      {currentMatches?.length === 0 && <div> No More matches today</div>}
      {currentMatches &&
        currentMatches?.length > 0 &&
        currentMatches?.map((match) => (
          <div
            key={match.id}
            className={
              selected === match.id ? styles.borderedMatch : styles.match
            }
            id={id}
            {...register(id, { required })}
            onClick={() =>
              onClick({
                matchId: match.id,
                name: match.name,
                status: match.status.type.shortDetail,
                homeTeam: match.competitions[0].competitors[0].team.displayName,
                awayTeam: match.competitions[0].competitors[1].team.displayName,
                homeId: match.competitions[0].competitors[0].team.id,
                awayId: match.competitions[0].competitors[1].team.id,
                homeAbbrv: match.competitions[0].competitors[0].team.abbreviation,
                awayAbbrv: match.competitions[0].competitors[1].team.abbreviation
              })
            }>
            {match.name}
          </div>
        ))}
    </>
  );
};

export default MatchSelect;
