'use client';

import useBetModal from '@/app/hooks/useBetModal';
import Heading from '../../heading/Heading';
import Modal from '../Modal';
import { useMemo, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { leagues } from '../../leagues/Leagues';
import styles from '../Modal.module.scss';
import LeagueInput from './league-input/LeagueInput';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import MatchSelect from './match-select/MatchSelect';
import OddsSelect from './odds-select/OddsSelect';
import Input from '../../input/Input';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { usePathname, useRouter } from 'next/navigation';
import ConfidenceSelect from './confidence-select/ConfidenceSelect';
import Toggle from 'react-toggle';

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
  const [leagueName, setLeagueName] = useState('');
  const [isEmpty, setIsEmpty] = useState(false);
  const [shouldNotify, setShouldNotify] = useState(true);
  const [isPrivate, setIsPrivate] = useState(false);

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
      match: '',
    },
  });

  const league = watch('league');
  const match = watch('match');
  const oddsData = watch("odds");

  const pathname = usePathname();
  let id = '';
  // Check if pathname includes "groups"
  if (pathname && pathname.includes('groups')) {
    id = pathname && (pathname.split('/').pop() as string);
  }

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldValidate: true,
      shouldTouch: true,
    });

    if (id === 'league') {
      if (value === 'MLS') {
        setLeagueName('usa.1');
        return;
      }
      setLeagueName(value);
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

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step !== STEPS.ODDS) {
      return onNext();
    }
    setIsLoading(true);

    data.groupId = id || null;

    const payload = {
      ...data,
      payout: payout,
      league: league,
      shouldNotify: shouldNotify,
      isPrivate: isPrivate,
    };

    axios
      .post('/api/bet', payload)
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

    if (step === STEPS.LEAGUE) {
      return 'Choose matchup'
    }

    if (step === STEPS.MATCH) {
      return 'Choose odds'
    }

    return 'Next';
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.LEAGUE) {
      return 'Close';
    }

    return 'Back';
  }, [step]);

  const headerTitle = useMemo(() => {
    if (step === STEPS.ODDS) {
      return 'Choose your odds';
    }

    if (step === STEPS.LEAGUE) {
      return 'Choose a league'
    }

    if (step === STEPS.MATCH) {
      return 'Choose a matchup'
    }
  }, [step])

  const disableButton = useMemo(() => {
    if (step === STEPS.ODDS && odds && wagerAmount) {
      return false
    }

    if (step === STEPS.LEAGUE && league) {
      return false
    }

    if (step === STEPS.MATCH && match) {
      return false
    }

    return true

  }, [step, odds, wagerAmount, league, match]);

  console.log(errors);

  let bodyContent = (
    <div>

      <SimpleBar className={styles.chooseLeague}>
        {leagues.map((item) => (
          <div key={item.label}>
            <LeagueInput
              id='league'
              register={register}
              required
              onClick={(league) => {
                setCustomValue('league', league);
              }}
              selected={league === item.label}
              label={item.description}
              shortLabel={item.label}
              icon={item.icon}
              errors={errors}
            />
          </div>
        ))}
      </SimpleBar>
    </div>
  );

  if (step === STEPS.MATCH) {
    bodyContent = (
      <div>

        <SimpleBar className={styles.chooseMatch}>
          <MatchSelect
            id='match'
            register={register}
            required
            selected={match?.matchId}
            onClick={(value) => setCustomValue('match', value)}
            leagueName={leagueName}
            setIsEmpty={setIsEmpty}
          />
        </SimpleBar>
      </div>
    );
  }

  if (step === STEPS.ODDS) {
    bodyContent = (
      <div>

        <div className={styles.chooseOdds}>
          <OddsSelect
            id='odds'
            required
            register={register}
            matchId={matchId}
            name={match?.name}
            homeTeam={match?.homeTeam}
            awayTeam={match?.awayTeam}
            homeId={match?.homeId}
            awayId={match?.awayId}
            leagueName={leagueName}
            homeAbbrv={match?.homeAbbrv}
            awayAbbrv={match?.awayAbbrv}
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
            label='Share your thoughts'
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />
          <div className={styles.confidence}>
            <label>Share your confidence level</label>
            <ConfidenceSelect
              id='confidence'
              register={register}
              required
              onChange={(value) => setCustomValue('confidence', value)}
            />
          </div>
          <div className={styles.setting}>
            <div className={styles.text}>
              <p className={styles.name}>Make Bet Private</p>
              <p className={styles.description}>Choose whether or not you want to only show this bet for followers.</p>
            </div>
            <div className={styles.toggle}>
              <Toggle
                defaultChecked={false}
                onChange={() => setIsPrivate(!isPrivate)} icons={false} />
            </div>

          </div>
          <div className={styles.setting}>
            <div className={styles.text}>
              <p className={styles.name}>Turn on notifications</p>
              <p className={styles.description}>Choose whether or not you want you to be notified of this bets status.</p>
            </div>
            <div className={styles.toggle}>
              <Toggle
                defaultChecked={true}
                onChange={() => setShouldNotify(!shouldNotify)} icons={false} />
            </div>

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
      setIsEmpty={setIsEmpty}
      title={headerTitle}
      noMatches={isEmpty}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.LEAGUE ? betModal.onClose : onBack}
      isButtonDisabled={disableButton}
    />
  );
};

export default BetModal;
