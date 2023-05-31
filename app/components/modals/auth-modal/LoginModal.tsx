'use client';
import { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Modal from '../Modal';
import { IoMdClose } from 'react-icons/io';
import styles from './AuthModal.module.scss';
import Input from '../../input/Input';
import { toast } from 'react-hot-toast';
import useLoginModal from '@/app/hooks/useLoginModal';
import { signIn } from 'next-auth/react'
import useRegisterModal from '@/app/hooks/useRegitserModal';
import { useRouter } from 'next/navigation';

const LoginModal = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    signIn('credentials', {
      ...data,
      redirect: false
    }).then((callback) => {
      setIsLoading(false)

      if (callback?.ok) {
        toast.success('Logged in')
        router.refresh();
        loginModal.onClose();
      }

      if (callback?.error) {
        toast.error(callback.error)
        setError('Invalid credentials')
      }
    })
  };

  const onDemoSubmit = () => {
    setIsLoading(true);

    signIn('credentials', {
      email: 'buzz@gmail.com',
      password: 'password',
      redirect: false,
    }).then((callback) => {
      setIsLoading(false);;

      if (callback?.ok) {
        toast.success('Logged into demo account')
        router.refresh();
        loginModal.onClose();
      }

      if (callback?.error) {
        toast.error(callback?.error)
      }
    })
  }

  const bodyContent = (
    <div className={styles.bodyContent}>
      {error && error.length > 1 && (
        <div className={styles.error}>{error}</div>
      )}
      <Input
        id='email'
        label='Email'
        type='email'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        placeholder='Email address'
      />
      <Input
        id='password'
        label='Password'
        type='password'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        placeholder='••••••••'
      />
    </div>
  )

  const openModal = () => {
    registerModal.onOpen();
    loginModal.onClose();
    reset();
  }

  const footerContent = (
    <div className={styles.footerContent}>
      <div className={styles.navigate} onClick={() => openModal()}>
        <div>New to Wagerly? </div>
        <span>Sign up</span>
      </div>
    </div>
  )


  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title='Login'
      actionLabel='Log in'
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      icon={IoMdClose}
      body={bodyContent}
      footer={footerContent}
      isDemoLogin
      onDemoSubmit={onDemoSubmit}
    />
  );
};

export default LoginModal;
