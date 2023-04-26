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
import ImageUpload from '../image-upload/ImageUpload';
import Image from 'next/image';
import useLoginModal from '@/app/hooks/useLoginModal';
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
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      username: '',
      email: '',
      password: '',
      photo: '',
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

  const openModal = () => {
    registerModal.onClose();
    loginModal.onOpen();
  }


  const bodyContent = (
    <div className={styles.bodyContent}>
      <Heading title='Welcome to OddSpot' subTitle='Create an account' />
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
        id='username'
        label='Username'
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
      <div className={styles.addProfilePicture}>
        <div className={styles.imagePreview}>
          <p className={styles.label}>Add your profile picture</p>
          <div className={styles.image}>

            <Image src={photo || '/images/placeholder.png'} alt='profile-picture' width='100' height='100' />

          </div>
        </div>
        <div className={styles.imageSelector}>
          <ImageUpload
            value={photo}
            onChange={(image) => setPhoto(image)}
            setCustomValue={setCustomValue}
            label={photo ? 'Change your profile picture' : 'Add your profile picture'}
          />

        </div>

      </div>

    </div>
  )

  const footerContent = (
    <div className={styles.footerContent}>
      {/* <Button label='Continue with Google' icon={FcGoogle} onClick={() => { }} />
      <Button label='Continue with Github' icon={AiFillGithub} onClick={() => { }} /> */}
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
