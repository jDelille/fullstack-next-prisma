import { Game } from '@/app/types/Game';
import styles from './GameCard.module.scss';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Odds } from '@/app/types/Odds';
import betStore from '@/app/store/betStore';

type GameCardProps = {
  game: Game;
  sport: string;
  league: string;
};

const GameCard: React.FC<GameCardProps> = ({ game, sport, league, }) => {
  const [odds, setOdds] = useState<Odds | null>();

  useEffect(() => {
    async function getOddsData() {
      try {
        const res = await fetch(
          `https://sports.core.api.espn.com/v2/sports/${sport}/leagues/${league}/events/${game.id}/competitions/${game.id}/odds`
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

    getOddsData();
  }, [game.id, league, sport]);

  const handleBetSelection = (
    team: any,
    odds: any,
    type: string,
    favorite: boolean,
    sport: string,
    league: string,
    game: Game,
    location: string,
    value?: number | null
  ) => {
    betStore.setSelectedBet({
      team: team.shortDisplayName,
      abbreviation: team.abbreviation,
      odds: odds,
      type: type,
      status: 'open',
      favorite: favorite,
      value: value !== undefined ? value : null,
      location: location,
      sport: sport,
      league: league,
      name: game.name,
      groupId: null,
    });
  };

  return (
    <div className={styles.gameCard}>
      <div className={styles.status}>
        <p>{game.status.type.shortDetail}</p>
      </div>
      <div className={styles.teams}>
        <div className={styles.labels}>
          <p className={styles.teamsLabel}>Teams</p>
          <div className={styles.oddsBoxLabels}>
            <p>Spread</p>
            <p>Total</p>
            <p>Moneyline</p>
          </div>
        </div>
        {odds && game.competitions.map((team) => (
          <>
            <div key={team.competitors[0].id} className={styles.team}>
              <div className={styles.name}>
                <Image
                  src={team.competitors[0].team.logo}
                  alt='logo'
                  width={20}
                  height={20}
                />
                <p className={styles.abbreviation}>
                  {team.competitors[0].team.abbreviation}
                </p>
                <p className={styles.displayName}>
                  {team.competitors[0].team.shortDisplayName}
                </p>
                <p className={styles.score}>{team.competitors[0].score}</p>
              </div>
              {odds && (
                <div className={styles.odds}>
                  <div className={styles.oddBoxes}>
                    {/* spread */}
                    <div
                      className={styles.oddsBox}
                      onClick={() =>
                        handleBetSelection(
                          team.competitors[0].team,
                          odds.homeTeamOdds.spreadOdds || Number('-115'),
                          'Spread',
                          odds?.homeTeamOdds.favorite,
                          sport,
                          league,
                          game,
                          'home',
                          odds.spread
                        )
                      }>
                      <p>
                        {odds?.homeTeamOdds.favorite
                          ? odds.spread
                          : '+' + Math.abs(odds.spread)}
                      </p>
                      <p className={styles.oddsNumber}>{odds.homeTeamOdds.spreadOdds || -110}</p>
                    </div>
                    {/* over / under */}
                    <div className={styles.oddsBox}
                      onClick={() =>
                        handleBetSelection(
                          team.competitors[0].team,
                          odds.overOdds,
                          'Total O',
                          odds?.homeTeamOdds.favorite,
                          sport,
                          league,
                          game,
                          'home',
                          odds.overUnder
                        )
                      }>
                      <p>{'O ' + Math.abs(odds.overUnder)}</p>
                      <p className={styles.oddsNumber}>{odds.overOdds}</p>
                    </div>
                    {/* moneyline */}
                    <div className={styles.oddsBox}
                      onClick={() =>
                        handleBetSelection(
                          team.competitors[0].team,
                          odds.homeTeamOdds.moneyLine,
                          'Moneyline',
                          odds?.homeTeamOdds.favorite,
                          sport,
                          league,
                          game,
                          'home',
                        )
                      }>
                      <p>
                        {odds?.homeTeamOdds.favorite
                          ? odds.homeTeamOdds.moneyLine
                          : '+' + Math.abs(odds.homeTeamOdds.moneyLine)}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div key={team.competitors[1].id} className={styles.team}>
              <div className={styles.name}>
                <Image
                  src={team.competitors[1].team.logo}
                  alt='logo'
                  width={20}
                  height={20}
                />
                <p className={styles.abbreviation}>
                  {team.competitors[1].team.abbreviation}
                </p>
                <p className={styles.displayName}>
                  {team.competitors[1].team.shortDisplayName}
                </p>
                <p className={styles.score}>{team.competitors[1].score}</p>

              </div>
              {odds && (
                <div className={styles.odds}>
                  <div className={styles.oddBoxes}>
                    {/* spread */}
                    <div
                      className={styles.oddsBox}
                      onClick={() =>
                        handleBetSelection(
                          team.competitors[1].team,
                          odds.awayTeamOdds.spreadOdds || Number('-115'),
                          'Spread',
                          odds?.awayTeamOdds.favorite,
                          sport,
                          league,
                          game,
                          'away',
                          odds.spread
                        )
                      }>
                      <p>
                        {odds?.awayTeamOdds.favorite
                          ? odds.spread
                          : '-' + Math.abs(odds.spread)}
                      </p>
                      <p className={styles.oddsNumber}>{odds.awayTeamOdds.spreadOdds || -110}</p>

                    </div>
                    {/* over / under */}
                    <div className={styles.oddsBox} onClick={() =>
                      handleBetSelection(
                        team.competitors[1].team,
                        odds.underOdds,
                        'Total U',
                        odds?.awayTeamOdds.favorite,
                        sport,
                        league,
                        game,
                        'away',
                        odds.overUnder
                      )
                    }>
                      <p>{'U ' + Math.abs(odds.overUnder)}</p>
                      <p className={styles.oddsNumber}>{odds.underOdds}</p>
                    </div>
                    {/* moneyline */}
                    <div className={styles.oddsBox} onClick={() =>
                      handleBetSelection(
                        team.competitors[1].team,
                        odds.awayTeamOdds.moneyLine,
                        'Moneyline',
                        odds?.awayTeamOdds.favorite,
                        sport,
                        league,
                        game,
                        'away',
                      )
                    }>
                      <p>
                        {odds?.awayTeamOdds.favorite
                          ? odds.awayTeamOdds.moneyLine
                          : '-' + Math.abs(odds.awayTeamOdds.moneyLine)}
                      </p>

                    </div>
                  </div>
                </div>
              )}
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

export default GameCard;
