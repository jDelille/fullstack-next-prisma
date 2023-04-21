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
import { FieldValue, FieldValues, useForm } from 'react-hook-form';
enum STEPS {
 LEAGUE = 0,
 MATCH = 1,
 REVIEW = 2
}

const BetModal = () => {
 const betModal = useBetModal();
 const [isLoading, setIsLoading] = useState(false);

 const [step, setStep] = useState(STEPS.LEAGUE)

 const { register, handleSubmit, setValue, watch, formState: {
  errors,
 },
  reset
 } = useForm<FieldValues>({
  defaultValues: {
   league: ''
  }
 })

 const league = watch('league')

 const setCustomValue = (id: string, value: any) => {
  setValue(id, value, {
   shouldDirty: true, shouldValidate: true, shouldTouch: true
  })
 }


 const onBack = () => {
  setStep((value) => value - 1);
 }

 const onNext = () => {
  setStep((value) => value + 1);
 }



 const actionLabel = useMemo(() => {
  if (step === STEPS.REVIEW) {
   return 'Post';
  }

  return 'Next';
 }, [step]);

 const secondaryActionLabel = useMemo(() => {
  if (step === STEPS.LEAGUE) {
   return undefined
  }

  return 'Back';
 }, [step]);

 const bodyContent = (
  <div>
   <Heading title='Choose a league' />
   <div className={styles.chooseLeague}>
    {leagues.map((item) => (
     <div key={item.label}>
      <LeagueInput
       onClick={(league) => { setCustomValue('league', league) }}
       selected={league === item.label}
       label={item.label}
       icon={item.icon}
      />
     </div>
    ))}
   </div>
  </div>
 );

 return (
  <Modal
   body={bodyContent}
   isOpen={betModal.isOpen}
   onClose={betModal.onClose}
   disabled={isLoading}
   icon={IoMdClose}
   onSubmit={() => { }}
   title='Post a bet'
   actionLabel={actionLabel}
   secondaryActionLabel={secondaryActionLabel}
   secondaryAction={step === STEPS.LEAGUE ? undefined : onBack}
  />
 );
};

export default BetModal;
