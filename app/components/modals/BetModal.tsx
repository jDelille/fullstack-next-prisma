'use client';

import useBetModal from '@/app/hooks/useBetModal';
import Heading from '../heading/Heading';
import Modal from './Modal';
import { useMemo, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { leagues } from '../leagues/Leagues';
import Image from 'next/image';

import styles from './Modal.module.scss';

import LeagueInput from '../league-input/LeagueInput';
import {
 FieldValue,
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

  if (id === 'match') {
   setMatchId(value);
  }
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

 let bodyContent = (
  <div>
   <Heading title='Choose a league' />
   <div className={styles.chooseLeague}>
    {leagues.map((item) => (
     <div key={item.label}>
      <LeagueInput
       onClick={(league) => {
        setCustomValue('league', league);
       }}
       selected={league === item.label}
       label={item.label}
       icon={item.icon}
      />
     </div>
    ))}
   </div>
  </div>
 );

 if (step === STEPS.MATCH) {
  bodyContent = (
   <div>
    <Heading title='Choose a matchup' />
    <div className={styles.chooseMatch}>
     <MatchSelect
      selected={match}
      onClick={(value) => setCustomValue('match', value)}
     />
    </div>
   </div>
  );
 }

 if (step === STEPS.ODDS) {
  bodyContent = (
   <div>
    <Heading title='Choose your bet' />
    <div className={styles.chooseOdds}>
     <OddsSelect matchId={matchId} onClick={(value) => setCustomValue('odds', value)} />
     <Input
      id='wager'
      label='Wager'
      disabled={isLoading}
      register={register}
      errors={errors}
      formatPrice
      type='number'
      required
     />
     <Input
      id='thoughts'
      label='Share your thoughts on this'
      disabled={isLoading}
      register={register}
      errors={errors}
      required
     />
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
