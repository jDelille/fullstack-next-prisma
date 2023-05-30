'use client';
import { useState } from 'react';
import betStore from '@/app/store/betStore';
import { observer } from 'mobx-react';
import Button from '../button/Button';
import { AiOutlineClose } from 'react-icons/ai';
import styles from './BetSlip.module.scss';
import { calculateParlayOdds, calculatePayout } from '@/app/utils/helpers';
import { Bet } from '@/app/types/Bet';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const BetSlip = observer(() => {
  const router = useRouter();

  const [wagerAmount, setWagerAmount] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  const selectedBet = [...betStore.selectedBet]

  const payout = calculatePayout(wagerAmount, selectedBet.map((bet: Bet) => bet.odds));

  const payload = selectedBet.map((bet) => {
    const { team, abbreviation, odds, type, status, favorite, value, location, sport, league, name } = bet;
    return {
      team,
      abbreviation,
      odds,
      type,
      status,
      favorite,
      value,
      location,
      sport,
      league,
      name,
    };
  });


  const onSubmit = () => {
    setIsLoading(true);

    axios.post('/api/parlay', payload)
      .then(() => {
        toast.success('Bet posted');
        router.refresh();
        ;
      })
      .catch(() => {
        toast.error('Something went wrong');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <div className={styles.betSlip}>
      <div className={styles.betSlipContent}>
        <div className={styles.header}>
          <p className={styles.title}>
            <span>{betStore.selectedBet.length || 0}</span>
            Bet Slip</p>
          {selectedBet.length > 0 && (
            <p className={styles.clear} onClick={() => betStore.clearSelectedBets()}>Clear All</p>
          )}
        </div>
        {selectedBet.length === 0 && (
          <div className={styles.noBetsMessage}>
            <p>Your picks will show up here.</p>
            <p>Select picks to then see the different types of bets available, including Singles and Parlays.</p>
          </div>
        )}
        {selectedBet.map((bet, i) => (
          <div className={styles.bet} key={i}>
            <div className={styles.clearBet}>
              <AiOutlineClose color='red' size={13} onClick={() => betStore.removeSelectedBet(i)} />
            </div>
            {/* <p className={styles.matchup}>{bet.gameMatchup}</p> */}
            <div className={styles.team}>
              <span>{bet.abbreviation}</span>
              <p>{bet.team}</p>
              <div className={styles.odds}>
                {bet.odds}
                {selectedBet.length < 2 && (
                  <input type='number' placeholder='0.00' />
                )}
              </div>
            </div>
            {/* <p className={styles.odds}>{bet.selectedOdds}</p> */}
            <p className={styles.type}>{bet.type} <span>{bet.value}</span></p>
            <p className={styles.matchup}>{bet.name}</p>

          </div>
        ))}

      </div>

      {selectedBet.length > 1 && (
        <div className={styles.betView}>
          <div className={styles.parlayView}>
            <p>{selectedBet.length} Pick Parlay</p>
            <p>{calculateParlayOdds(selectedBet.map((bet) => bet.odds))}</p>
          </div>

          <div className={styles.stake}>
            <input type='number' placeholder='0.00' onChange={(e) => setWagerAmount(parseFloat(e.target.value))} />
            <p className={styles.payout}>Payout: ${payout}</p>
          </div>
        </div>
      )}

      {selectedBet.length > 0 && (
        <div className={styles.buttonContainer}>
          <Button label='Place bet' onClick={onSubmit} />
        </div>
      )}
    </div>
  );
})

export default BetSlip;