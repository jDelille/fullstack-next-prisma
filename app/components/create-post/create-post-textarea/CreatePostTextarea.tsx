'use client';

import { HiOutlineBanknotes } from 'react-icons/hi2';
import Button from '../../button/Button';
import styles from './CreatePostTextarea.module.scss';
import useBetModal from '@/app/hooks/useBetModal';
import useLoginModal from '@/app/hooks/useLoginModal';
import usePollModal from '@/app/hooks/usePollModal';
import { usePathname, useRouter } from 'next/navigation';
import ImageUpload from '../../image-upload/ImageUpload';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { CgPoll } from 'react-icons/cg';
import Image from 'next/image';
import { AiFillCloseCircle, AiOutlineFileGif, AiOutlineGif } from 'react-icons/ai';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import BetSlip from '../../bet-slip/BetSlip';
import Gifs from '../../gifs/Gifs';

type CreatePostTextareaProps = {
  userPhoto?: string;
  userId?: string;
};

const CreatePostTextarea: React.FC<CreatePostTextareaProps> = ({
  userId,
  userPhoto,
}) => {
  const router = useRouter();
  const betModal = useBetModal();
  const loginModal = useLoginModal();
  const pollModal = usePollModal();
  const pathname = usePathname()

  const textAreaRef = useRef<HTMLTextAreaElement>(null);


  const [photo, setPhoto] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false)
  const [showGifs, setShowGifs] = useState(false);

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

  console.log(postPhoto)

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    data.groupId = null;

    axios
      .post('/api/post', data)
      .then(() => {
        toast.success('Posted');
        router.refresh();
        reset();
      })
      .catch(() => {
        toast.error('Something went wrong');
      })
      .finally(() => {
        setIsLoading(false);
        setPhoto("")
      });
  };

  const autosize = () => {
    if (textAreaRef.current) {
      var el = textAreaRef.current;
      setTimeout(function () {
        el.style.cssText = 'height:auto; padding:0';
        el.style.cssText = 'height:' + el.scrollHeight + 'px';
      }, 0);
    }
  };

  useEffect(() => {
    if (textAreaRef.current) {
      const textarea = textAreaRef.current;
      textarea.addEventListener('keydown', autosize);

      return () => {
        textarea.removeEventListener('keydown', autosize);
      };
    }
  }, []);

  const postBodyLength = body.length || 0


  useEffect(() => {
    if (postBodyLength > 500) {
      setError(true)
    } else {
      setError(false)
    }
  }, [postBodyLength])

  const clearPhoto = () => {
    setCustomValue('photo', '');
    setPhoto && setPhoto('')
  }


  return (
    pathname && !pathname?.includes('sportsbook') ? (
      <>
        <SimpleBar className={styles.createPost}>
          <textarea
            placeholder="What's on your mind?"
            className={styles.textarea}
            onChange={(event) => {
              event.stopPropagation();
              setCustomValue('postBody', event.target.value);
            }}
            value={body}
            ref={textAreaRef}
            rows={1}>


          </textarea>

          {photo || postPhoto.url && (
            <div className={styles.imagePreview}>

              <div
                className={styles.closeImagePreview}
                onClick={clearPhoto}>
                <AiFillCloseCircle size={30} />
              </div>

              <Image
                src={photo || postPhoto.url}
                fill
                alt='Uploaded Image'
                className={styles.imagePreview}
                style={{ objectFit: 'cover' }}
              />
            </div>

          )}


          <div className={styles.createPostButtons}>
            {/* <div
              className={styles.icon}
              onClick={() => {
                !userId ? loginModal.onOpen() : betModal.onOpen();
              }}>
              <HiOutlineBanknotes color='#2a333f' size={21} />
            </div> */}
            <div className={styles.icon}>
              <ImageUpload
                value={photo}
                onChange={(image) => setPhoto(image)}
                setCustomValue={setCustomValue}
                isPost
                disabled={photo.length > 0}
              />
            </div>

            <div className={styles.icon} onClick={() => setShowGifs(true)}>
              <AiOutlineFileGif color="#2a333f" size={20} />
            </div>
            {showGifs && (
              <Gifs
                onChange={(image) => setPhoto(image)}
                setCustomValue={setCustomValue}
                register={register}
                errors={errors}
                setShowGifs={setShowGifs}
              />
            )}
            <div className={styles.icon} onClick={() => pollModal.onOpen()}>
              <CgPoll size={20} color='#2a333f' />
            </div>
            <div className={styles.textCount}>
              {error ? (
                <p className={styles.lengthError}>{postBodyLength} / 500</p>
              ) : (
                <p>{postBodyLength} / 500</p>
              )}
            </div>
          </div>
        </SimpleBar >

        <div className={styles.postButton}>
          <Button
            onClick={handleSubmit(onSubmit)}
            label='Post'
            isButtonDisabled={!body || postBodyLength > 500}
            ariaLabel='Publish post'
          />
        </div>
      </>
    ) : (
      <BetSlip />

    )

  );
};

export default CreatePostTextarea;
