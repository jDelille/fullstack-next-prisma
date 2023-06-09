'use client';
import axios from 'axios';
import { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import useRegisterModal from '@/app/hooks/useRegitserModal';
import Modal from '../Modal';
import { IoMdClose } from 'react-icons/io';
import styles from './AuthModal.module.scss';
import Input from '../../input/Input';
import { toast } from 'react-hot-toast';
import ImageUpload from '../../image-upload/ImageUpload';
import useLoginModal from '@/app/hooks/useLoginModal';
import { signIn } from 'next-auth/react';

const RegisterModal = () => {

  const registerModal = useRegisterModal();
  const [isLoading, setIsLoading] = useState(false);
  const [photo, setPhoto] = useState('');
  const loginModal = useLoginModal();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
    reset
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      username: '',
      email: '',
      password: '',
      photo: '',
    },
  });

  const email = watch('email')
  const password = watch("password")

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldValidate: true,
      shouldTouch: true,
    });
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios
      .post('/api/register', data)
      .then(() => {
        registerModal.onClose();
      })
      .then(() => {
        signIn('credentials', {
          ...data,
          redirect: true
        })
      })
      .catch((error) => {
        toast.error('Error')
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const openModal = () => {
    registerModal.onClose();
    loginModal.onOpen();
  }

  const closeModal = () => {
    registerModal.onClose();
    reset()
  }


  const bodyContent = (
    <div className={styles.bodyContent}>

      <Input
        id='email'
        label='Email'
        type='email'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        placeholder='Email address (required)'
      />
      <Input
        id='name'
        label='Name'
        type='text'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        placeholder='Your name (required)'
      />
      <Input
        id='username'
        label='Username'
        type='text'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        placeholder='Your username (required)'
      />
      <Input
        id='password'
        label='Password'
        type='password'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        placeholder='Your password (required)'
      />
      <div className={styles.addProfilePicture}>
        <p>Profile Picture</p>
        <div className={styles.imageSelector}>
          <ImageUpload
            value={photo}
            onChange={(image) => setPhoto(image)}
            setCustomValue={setCustomValue}
            isRegister
          />

        </div>

      </div>

    </div>
  )

  const footerContent = (
    <div className={styles.footerContent}>
      <div className={styles.navigate} onClick={() => openModal()}>
        <div>Already have an account? </div>
        <span>Log in</span>
      </div>
    </div >
  )


  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title='Register'
      actionLabel='Register'
      onClose={closeModal}
      onSubmit={handleSubmit(onSubmit)}
      icon={IoMdClose}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default RegisterModal;
