'use client';
import axios from 'axios';
import { AiFillGithub } from 'react-icons/ai';
import { useCallback, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Modal from './Modal';
import { IoMdClose } from 'react-icons/io';
import styles from './Modal.module.scss';
import Heading from '../heading/Heading';
import Input from '../input/Input';
import { toast } from 'react-hot-toast';
import Button from '../button/Button';
import { FcGoogle } from 'react-icons/fc'
import useLoginModal from '@/app/hooks/useLoginModal';
import { signIn } from 'next-auth/react'
import useRegisterModal from '@/app/hooks/useRegitserModal';
import { useRouter } from 'next/navigation';

const LoginModal = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
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
      }
    })
  };

  const bodyContent = (
    <div className={styles.bodyContent}>
      <Heading title='Welcome back' subTitle='Log in to your account' />
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
      {/* <hr />
      <Button label='Continue with Google' icon={FcGoogle} onClick={() => { }} />
      <Button label='Continue with Github' icon={AiFillGithub} onClick={() => { }} /> */}
      <div className={styles.navigate} onClick={registerModal.onOpen}>
        <div>Already have an account? </div>
        <div>Sign up</div>
      </div>
    </div>
  )


  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title='Login'
      actionLabel='Continue'
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      icon={IoMdClose}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModal;
