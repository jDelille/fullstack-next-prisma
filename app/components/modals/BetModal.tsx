'use client';

import useBetModal from '@/app/hooks/useBetModal';
import Heading from '../heading/Heading';
import Modal from './Modal';
import { useMemo, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { leagues } from '../leagues/Leagues';
import styles from './Modal.module.scss';
import LeagueInput from '../league-input/LeagueInput';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import {
  FieldValues,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import MatchSelect from '../match-select/MatchSelect';
import OddsSelect from '../odds-select/OddsSelect';
import Input from '../input/Input';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import ConfidenceSelect from '../confidence-select/ConfidenceSelect';
enum STEPS {
  LEAGUE = 0,
  MATCH = 1,
  ODDS = 2,
  // REVIEW = 3,
}

const BetModal = () => {
  const router = useRouter();
  const betModal = useBetModal();

  const [isLoading, setIsLoading] = useState(false);
  const [matchId, setMatchId] = useState('');
  const [step, setStep] = useState(STEPS.LEAGUE);
  const [odds, setOdds] = useState(0);
  const [wagerAmount, setWagerAmount] = useState(0);
  const [leagueName, setLeagueName] = useState('')


  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      league: '',
    },
  });

  const league = watch('league');
  const match = watch('match');

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldValidate: true,
      shouldTouch: true,
    });

    if (id === 'league') {
      if (value === 'MLS') {
        setLeagueName('usa.1')
        return;
      }
      setLeagueName(value)
    }

    if (id === 'match') {
      setMatchId(value.matchId);
    }

    if (id === 'odds') {
      setOdds(value.odds);
    }
  };

  const setWager = (event: any) => {
    const wager = event.target.value;
    setWagerAmount(wager);
  };

  const onBack = () => {
    setStep((value) => value - 1);
  };

  const onNext = () => {
    setStep((value) => value + 1);
  };
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step !== STEPS.ODDS) {
      return onNext();
    }

    setIsLoading(true);

    axios
      .post('/api/bet', data)
      .then(() => {
        toast.success('Bet posted');
        router.refresh();
        reset();
        setStep(STEPS.LEAGUE);
        betModal.onClose();
      })
      .catch(() => {
        toast.error('Something went wrong');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.ODDS) {
      return 'Post bet';
    }

    return 'Next';
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.LEAGUE) {
      return undefined;
    }

    return 'Back';
  }, [step]);

  const calculatePayout = (wager: number, odds: number) => {
    let payoutAmount = 0;
    if (odds >= 0) {
      payoutAmount = wager * (odds / 100 + 1);
    } else {
      payoutAmount = wager * (100 / Math.abs(odds) + 1);
    }
    const formattedPayout = Number(payoutAmount.toFixed(2));
    return formattedPayout;
  };

  const payout = calculatePayout(wagerAmount, odds);

  let bodyContent = (
    <div>
      <Heading title='Choose a league' />
      <SimpleBar className={styles.chooseLeague}>
        {leagues.map((item) => (
          <div key={item.label}>
            <LeagueInput
              onClick={(league) => {
                setCustomValue('league', league);
              }}
              selected={league === item.label}
              label={item.description}
              shortLabel={item.label}
              icon={item.icon}
            />
          </div>
        ))}
      </SimpleBar>
    </div>
  );

  if (step === STEPS.MATCH) {
    bodyContent = (
      <div>
        <Heading title='Choose a matchup' />
        <SimpleBar className={styles.chooseMatch}>
          <MatchSelect
            selected={match?.matchId}
            onClick={(value) => setCustomValue('match', value)}
            leagueName={leagueName}
          />
        </SimpleBar>
      </div>
    );
  }

  if (step === STEPS.ODDS) {
    bodyContent = (
      <div>
        <Heading title='Choose your bet' subTitle={match?.name} />
        <div className={styles.chooseOdds}>
          <OddsSelect
            matchId={matchId}
            name={match?.name}
            homeTeam={match?.homeTeam}
            awayTeam={match?.awayTeam}
            leagueName={leagueName}
            onClick={(value) => setCustomValue('odds', value)}
          />
          <div className={styles.wager}>
            <div className={styles.wagerInput}>
              <Input
                id='wager'
                label='Wager'
                disabled={isLoading}
                register={register}
                errors={errors}
                formatPrice
                type='number'
                required
                onChange={setWager}
              />
            </div>

            <div className={styles.payoutContainer}>
              <label>Potential Payout</label>
              <div className={styles.payout}>${payout}</div>
            </div>
          </div>
          <Input
            id='thoughts'
            label='Share your thoughts on this'
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />
          <div className={styles.confidence}>
            <label>Share your confidence level</label>
            <ConfidenceSelect onChange={(value) => setCustomValue('confidence', value)} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <Modal
      body={bodyContent}
      isOpen={betModal.isOpen}
      onClose={betModal.onClose}
      disabled={isLoading}
      icon={IoMdClose}
      onSubmit={handleSubmit(onSubmit)}
      title='Post a bet'
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.LEAGUE ? undefined : onBack}
    />
  );
};

export default BetModal;
