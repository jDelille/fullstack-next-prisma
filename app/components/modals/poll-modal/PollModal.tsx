'use client';

import usePollModal from '@/app/hooks/usePollModal';
import Modal from '../Modal';
import styles from '../Modal.module.scss';
import { IoMdClose } from 'react-icons/io';
import { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import Input from '../../input/Input';

const PollModal = () => {
  const router = useRouter();

  const pollModal = usePollModal();

  const [isLoading, setIsLoading] = useState(false);
  const [option1, setOption1] = useState('');
  const [option2, setOption2] = useState('');
  const [days, setDays] = useState('')
  const [hours, setHours] = useState('')
  const [minutes, setMinutes] = useState('')

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      option1: '',
      option2: '',
      expiration: '',
    },
  });

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldValidate: true,
      shouldTouch: true,
    });


  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    const expiration = new Date();
    expiration.setDate(expiration.getDate() + Number(days));
    expiration.setHours(expiration.getHours() + Number(hours));
    expiration.setMinutes(expiration.getMinutes() + Number(minutes));

    const expirationString = expiration.toISOString();
    data.groupId = null;

    const payload = {
      ...data,
      option1: data.option1,
      option2: data.option2,
      expiration: expirationString,
    };

    axios
      .post('/api/poll', payload)
      .then(() => {
        toast.success('Bet posted');
        router.refresh();
        reset();
        pollModal.onClose()
      })
      .catch(() => {
        toast.error('Something went wrong');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };



  const bodyContent = (
    <div className={styles.bodyContent}>
      <Input
        id='thoughts'
        label='Share your thoughts'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <div>
        <Input
          id='option1'
          label='Option 1'
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <Input
          id='option2'
          label='Option 2'
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
      <div className={styles.pollExpiration}>
        <Input
          id='days'
          label='Days'
          disabled={isLoading}
          register={register}
          errors={errors}
          type='number'
          required
          onChange={(e) => setDays(e.target.value)}
        />
        <Input
          id='hours'
          label='Hours'
          disabled={isLoading}
          register={register}
          errors={errors}
          type='number'
          required
          onChange={(e) => setHours(e.target.value)}
        />
        <Input
          id='minutes'
          label='Minutes'
          disabled={isLoading}
          register={register}
          errors={errors}
          type='number'
          required
          onChange={(e) => setMinutes(e.target.value)}
        />
      </div>
    </div>
  );

  return (
    <Modal
      body={bodyContent}
      isOpen={pollModal.isOpen}
      onClose={pollModal.onClose}
      disabled={isLoading}
      icon={IoMdClose}
      title='Create a poll'
      actionLabel='Post poll'
      onSubmit={handleSubmit(onSubmit)}
    />
  );
};

export default PollModal;
