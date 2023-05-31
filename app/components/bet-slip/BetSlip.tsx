'use client';
import { useState } from 'react';
import betStore from '@/app/store/betStore';
import { observer } from 'mobx-react';
import Button from '../button/Button';
import { AiOutlineClose, AiFillInfoCircle } from 'react-icons/ai';
import styles from './BetSlip.module.scss';
import { calculateParlayOdds, calculatePayout } from '@/app/utils/helpers';
import { Bet } from '@/app/types/Bet';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Input from '../input/Input';
import { FieldValues, useForm } from 'react-hook-form';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import InfoPopup from './info-popup/InfoPopup';
import usePlacedBetPopup from '@/app/hooks/usePlacedBetPopup';
import useInfoPopup from '@/app/hooks/useInfoPopup';

const BetSlip = observer(() => {
  const router = useRouter();

  const placedBetPopup = usePlacedBetPopup();
  const infoPopup = useInfoPopup();

  const [wagerAmount, setWagerAmount] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [thoughts, setThoughts] = useState("")
  const [addText, setAddText] = useState(false)
  const [showInfoPopup, setShowInfoPopup] = useState(false)
  const [error, setError] = useState("")

  let selectedBet = [...betStore.selectedBet]

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      wager: 0,
    },
  });

  const wagerInput = watch('wager')

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

    if (wagerInput.lenth < 0) {
      return setError('You must enter a wager amount.')
    }

    if (thoughts.length <= 0) {
      return setError('You must write something about this bet.')

    }

    const betPayload = {
      bets: payload,
      thoughts: thoughts,
      odds: calculateParlayOdds(selectedBet.map((bet) => bet.odds)),
      wager: wagerAmount,
      payout
    }

    axios.post('/api/parlay', betPayload)
      .then(() => {
        toast.success('Bet posted');
        router.refresh();
        betStore.setWager(wagerAmount)
      })
      .catch(() => {
        toast.error('Something went wrong');
      })
      .finally(() => {
        setIsLoading(false);
        placedBetPopup.onOpen();
      });
  }



  return (
    <div className={styles.betSlip}>
      <div className={styles.betSlipContent}>
        <div className={selectedBet.length > 1 ? styles.shadowHeader : styles.header}>
          <p className={styles.title}>
            <span>{betStore.selectedBet.length || 0}</span>
            Bet Slip</p>
          {selectedBet.length > 0 && (
            <p className={styles.clear} onClick={() => betStore.clearSelectedBets()}>Clear All</p>
          )}
          <div className={styles.infoButton}>
            <AiFillInfoCircle color='#20b46a' size={18} onClick={() => infoPopup.onOpen()} />
          </div>

        </div>
        {selectedBet.length === 0 && (
          <div className={styles.noBetsMessage}>
            <p>Your picks will show up here.</p>
            <p>Select picks to then see the different types of bets available, including Singles and Parlays.</p>
          </div>
        )}
        <SimpleBar className={styles.bets}>
          {selectedBet.length > 0 && (
            <div className={styles.title}>
              <p>Picks</p>
            </div>
          )}

          {selectedBet.map((bet, i) => (
            <div className={styles.bet} key={i}>
              <div className={styles.clearBet}>
                <AiOutlineClose color='#1a222c' size={12} onClick={() => betStore.removeSelectedBet(i)} />
              </div>
              <div className={styles.team}>
                <span>{bet.abbreviation}</span>
                <p>{bet.team}</p>
                <div className={styles.odds}>
                  <span>{bet.odds}</span>
                  {selectedBet.length < 2 && (
                    <Input
                      id='wager'
                      label=''
                      disabled={isLoading}
                      register={register}
                      errors={errors}
                      type='text'
                      inputMode="numeric"
                      required
                      placeholder='0.00'
                      formatPrice
                      onChange={(e) => setWagerAmount(e.target.value)}
                    />
                  )}
                </div>
              </div>
              <p className={styles.type}>{bet.type} <span>{bet.value}</span></p>
              <p className={styles.matchup}>{bet.name}</p>
            </div>
          ))}
        </SimpleBar>


      </div>

      {selectedBet.length > 1 && (
        <div className={styles.betView}>
          <div className={styles.parlayView}>
            <p>{selectedBet.length} Pick Parlay</p>
            <span>{calculateParlayOdds(selectedBet.map((bet) => bet.odds))}</span>
          </div>

          <div className={styles.stake}>
            <Input
              id='wager'
              label=''
              disabled={false}
              register={register}
              errors={errors}
              type='text'
              inputMode="numeric"
              placeholder='0.00'
              required
              formatPrice
              onChange={(e) => setWagerAmount(e.target.value)}
            />
            {wagerAmount > 0 && (
              <p className={styles.payout}>Payout: ${payout}</p>
            )}
          </div>
        </div>
      )}

      {selectedBet.length > 0 && (
        <div className={styles.thoughts}>
          <textarea placeholder='Share your thoughts on this bet' required onChange={(e) => setThoughts(e.target.value)} />
        </div>
      )}


      {selectedBet.length > 0 && (
        <div className={styles.buttonContainer}>
          {error.length > 0 && (
            <p className={styles.error}>{error}</p>
          )}
          <Button label={selectedBet.length > 1 ? 'Place parlay' : 'Place bet'} onClick={onSubmit} />
        </div>
      )}
    </div>
  );
})

export default BetSlip;