'use client';
import styles from './CreatePostForm.module.scss';
import Button from '../../button/Button';
import useBetModal from '@/app/hooks/useBetModal';
import ImageUpload from '../../image-upload/ImageUpload';
import { useEffect, useState } from 'react';
import CreatePostInput from '../create-post-input/CreatePostInput';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import useLoginModal from '@/app/hooks/useLoginModal';
import { AiOutlineCamera } from 'react-icons/ai';
import { HiOutlineBanknotes } from 'react-icons/hi2'
import Gifs from '../../gifs/Gifs';
import { CgPoll } from 'react-icons/cg'
import usePollModal from '@/app/hooks/usePollModal';

type CreatePostFormProps = {
  userPhoto?: string;
  userId?: string;
  isComment: boolean;
  postId?: string;
  isBordered?: boolean;
  isGroup?: boolean
  groupId?: string;
  placeholder?: string;
};

const CreatePostForm = ({
  userPhoto,
  userId,
  isComment,
  postId,
  isBordered,
  isGroup,
  groupId,
  placeholder
}: CreatePostFormProps) => {
  const router = useRouter();
  const betModal = useBetModal();
  const loginModal = useLoginModal();
  const pollModal = usePollModal();

  const [photo, setPhoto] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showGifs, setShowGifs] = useState(false)
  const [show, setShow] = useState(true);

  const controlForm = () => {
    if (window.scrollY > 100) {
      setShow(window.scrollY < prevScrollY ? true : false);
    } else {
      setShow(true);
    }
    prevScrollY = window.scrollY;
  };

  let prevScrollY = 0;


  useEffect(() => {
    window.addEventListener('scroll', controlForm)
    return () => {
      window.removeEventListener("scroll", controlForm)
    }
  }, [])

  const isMobile = window.innerWidth <= 768;

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

    data.groupId = isGroup ? groupId : null;

    console.log(data.groupId)


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
    <div className={groupId ? styles.groupInputContainer : styles.inputContainer}>
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
                placeholder={placeholder ? placeholder : "What's Happening?"}
                id='postBody'
                body={body}
                setPhoto={setPhoto}
              />
            </div>
            <div className={styles.inputButtons}>
              <div className={styles.icon} onClick={() => {
                !userId ? loginModal.onOpen() : betModal.onOpen();
              }}>
                <HiOutlineBanknotes color="#abadb1" size={20} />
                <span>Bet</span>
              </div>


              {!userId && !isGroup && (
                <div className={styles.icon} onClick={() => loginModal.onOpen()}>
                  <AiOutlineCamera size={20} color="#abadb1" />
                  <span>Photo</span>
                </div>

              )}
              {/* <AiOutlineFileGif color="#abadb1" size={23} onClick={() => setShowGifs(true)} /> */}
              {showGifs && (
                <Gifs
                  onChange={(image) => setPhoto(image)}
                  setCustomValue={setCustomValue}
                  register={register}
                  errors={errors}
                />
              )}
              {userId && !isGroup && (
                <div className={styles.icon}>
                  <ImageUpload
                    value={photo}
                    onChange={(image) => setPhoto(image)}
                    setCustomValue={setCustomValue}
                    label='Post a photo'
                    userId={userId as string}
                    isPost
                  />
                </div>

              )}
              {!isGroup && (
                <div className={styles.icon} onClick={() => pollModal.onOpen()}>
                  <CgPoll size={20} color="#abadb1" />
                  <span>Poll</span>
                </div>
              )}


              <Button onClick={handleSubmit(onSubmit)} label='Post' isButtonDisabled={!body} />
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
              placeholder={placeholder ? placeholder : 'Comment'}
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
