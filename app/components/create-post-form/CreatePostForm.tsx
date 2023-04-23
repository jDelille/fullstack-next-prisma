'use client'
import Image from 'next/image';
import styles from './CreatePostForm.module.scss';
import Button from '../button/Button';
import useBetModal from '@/app/hooks/useBetModal';
import ImageUpload from '../image-upload/ImageUpload';
import { useState } from 'react';
import CreatePostInput from '../create-post-input/CreatePostInput';
import {
  FieldValues,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

type CreatePostFormProps = {
  userPhoto?: string;
  userId?: string;
}


const CreatePostForm = ({ userPhoto, userId }: CreatePostFormProps) => {
  const router = useRouter();

  const betModal = useBetModal();
  const [photo, setPhoto] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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


  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldValidate: true,
      shouldTouch: true,
    })

  }

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios
      .post('/api/post', data)
      .then(() => {
        toast.success('Bet posted');
        router.refresh();
        reset();
      })
      .catch(() => {
        toast.error('Something went wrong');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className={styles.inputContainer}>
      <div className={styles.inputWrapper}>
        <div className={styles.createPostWrapper}>
          <CreatePostInput setCustomValue={setCustomValue} photo={photo} userPhoto={userPhoto} userId={userId} />
          {/* TODO - add textarea and image select for normal posts*/}
          {/* <p>Upload image</p> */}

        </div>
        <div className={styles.inputButtons}>
          <Button onClick={betModal.onOpen} label='Post a bet' />
          <ImageUpload
            value={photo}
            onChange={(image) => setPhoto(image)}
            setCustomValue={setCustomValue}
            label='Post a photo'
          />
          <Button onClick={betModal.onOpen} label='Post a poll' />


          <Button onClick={handleSubmit(onSubmit)} label='Post' />
        </div>

      </div>
    </div>
  );
}

export default CreatePostForm;