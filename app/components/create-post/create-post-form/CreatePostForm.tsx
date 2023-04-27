'use client';
import styles from './CreatePostForm.module.scss';
import Button from '../../button/Button';
import useBetModal from '@/app/hooks/useBetModal';
import ImageUpload from '../../image-upload/ImageUpload';
import { useState } from 'react';
import CreatePostInput from '../create-post-input/CreatePostInput';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import useLoginModal from '@/app/hooks/useLoginModal';

type CreatePostFormProps = {
  userPhoto?: string;
  userId?: string;
  isComment: boolean;
  postId?: string;
  isBordered?: boolean;
};

const CreatePostForm = ({
  userPhoto,
  userId,
  isComment,
  postId,
  isBordered,
}: CreatePostFormProps) => {
  const router = useRouter();

  const betModal = useBetModal();
  const [photo, setPhoto] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const loginModal = useLoginModal();

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
      postBody: '',
      photo: '',
    },
  });

  const body = watch('postBody');
  const postPhoto = watch('photo');

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
      .post(isComment ? `/api/comment/${postId}` : '/api/post', data)
      .then(() => {
        toast.success(isComment ? 'You commented' : 'Bet posted');
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
      <div
        className={
          isBordered ? styles.inputWrapperBordered : styles.inputWrapper
        }>
        {!isComment && (
          <>
            <div className={styles.createPostWrapper}>
              <CreatePostInput
                setCustomValue={setCustomValue}
                photo={postPhoto}
                userPhoto={userPhoto}
                userId={userId}
                placeholder="What's Happening?"
                id='postBody'
                body={body}
                setPhoto={setPhoto}
              />
            </div>
            <div className={styles.inputButtons}>
              <Button
                onClick={() => {
                  !userId ? loginModal.onOpen() : betModal.onOpen();
                }}
                label='Post a bet'
              />
              {userId && (
                <ImageUpload
                  value={photo}
                  onChange={(image) => setPhoto(image)}
                  setCustomValue={setCustomValue}
                  label='Post a photo'
                  userId={userId as string}
                />
              )}

              {/* <Button
                onClick={() => {
                  !userId ? loginModal.onOpen() : null;
                }}
                label='Post a poll'
              /> */}
              <Button onClick={handleSubmit(onSubmit)} label='Post' disabled={body.length === 0} />
            </div>
          </>
        )}
        {isComment && (
          <>
            <CreatePostInput
              setCustomValue={setCustomValue}
              photo={photo}
              userPhoto={userPhoto}
              userId={userId}
              placeholder='Comment'
              isComment
              body={body}
              handleSubmit={handleSubmit}
              onSubmit={onSubmit}
              id="postBody"
            />
          </>
        )}
      </div>
    </div>
  );
};

export default CreatePostForm;
