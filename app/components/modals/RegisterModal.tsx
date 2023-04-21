'use client';
import axios from 'axios';
import { AiFillGithub } from 'react-icons/ai';
import { useCallback, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import useRegisterModal from '@/app/hooks/useRegitserModal';
import Modal from './Modal';
import { IoMdClose } from 'react-icons/io';
import styles from './Modal.module.scss';
import Heading from '../heading/Heading';
import Input from '../input/Input';
import { toast } from 'react-hot-toast';
import Button from '../button/Button';
import { FcGoogle } from 'react-icons/fc'
const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios
      .post('/api/register', data)
      .then(() => {
        registerModal.onClose();
      })
      .catch((error) => {
        toast.error('Error')
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const bodyContent = (
    <div className={styles.bodyContent}>
      <Heading title='Welcome to Bweem' subTitle='Create an account' />
      <Input
        id='email'
        label='Email'
        type='email'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id='name'
        label='Name'
        type='text'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id='password'
        label='Password'
        type='password'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  )

  const footerContent = (
    <div className={styles.footerContent}>
      <hr />
      <Button label='Continue with Google' icon={FcGoogle} onClick={() => { }} />
      <Button label='Continue with Github' icon={AiFillGithub} onClick={() => { }} />
      <div className={styles.navigate} onClick={registerModal.onClose}>
        <div>Already have an account? </div>
        <div>Log in</div>
      </div>
    </div>
  )


  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title='Register'
      actionLabel='Continue'
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      icon={IoMdClose}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default RegisterModal;
