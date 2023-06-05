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
import mentionsInputStyle from './mentionsInputStyle';
import mentionStyle from './mentionStyle';

import { MentionsInput, Mention, SuggestionDataItem, OnChangeHandlerFunc } from 'react-mentions';
import { User } from '@prisma/client';
import VerifiedIcon from '@/app/icons/VerifiedIcon';
import TagMentionTextarea from '../../tag-mention/TagMentionTextarea';

interface ExtendedSuggestionDataItem extends SuggestionDataItem {
  avatar?: string;
  name?: string;
  isVerified?: boolean;
}


type CreatePostTextareaProps = {
  userPhoto?: string;
  userId?: string;
  users?: User[]
};

const CreatePostTextarea: React.FC<CreatePostTextareaProps> = ({
  userId,
  userPhoto,
  users
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
  const [suggestions, setSuggestions] = useState<ExtendedSuggestionDataItem[]>([]);
  const [textareaValue, setTextareaValue] = useState("");
  const [taggedUserIds, setTaggedUserIds] = useState<string[]>([])

  useEffect(() => {
    // Transform the usernames into SuggestionDataItem objects
    const userSuggestions: ExtendedSuggestionDataItem[] = (users ?? []).map((user) => ({
      id: user.id,
      display: user.username,
      avatar: user.photo as string,
      name: user.name,
      isVerified: user.isVerified
    }));

    setSuggestions(userSuggestions ?? []);
  }, [users]);




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

    data.groupId = null;
    data.taggedUserIds = taggedUserIds


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

  const handleOnChange: OnChangeHandlerFunc = async (event: {
    target: {
      value: string;
    }
  }, rawString, mentions) => {
    let value = event.target.value;
    value = value.replace(/\@\[(\w+)\]\(\w+\)/g, '@$1');
    setTextareaValue(value)
    console.log(value);
    setCustomValue('postBody', value)
  }

  const handleOnAdd = (id: string | number, display: string) => {
    const mentionText = `@${display}`;
    const newText = textareaValue.replace(/@(\w+)?$/, mentionText);
    setTextareaValue(newText);
    setTaggedUserIds((prevIds) => [...prevIds, id as string]);
  }


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
        <div className={styles.createPost}>
          <div className={styles.textareaContainer}>
            <TagMentionTextarea
              value={textareaValue}
              placeholder="What's on your mind?"
              onChange={handleOnChange}
              suggestions={suggestions}
              onAdd={handleOnAdd}
              isTextarea={true}
            />
          </div>

          {photo && (
            <div className={styles.imagePreview}>
              <div
                className={styles.closeImagePreview}
                onClick={clearPhoto}>
                <AiFillCloseCircle size={30} />
              </div>
              <Image
                src={photo}
                fill
                alt='Uploaded Image'
                className={styles.imagePreview}
                style={{ objectFit: 'cover' }}
              />
            </div>
          )}

          {postPhoto.url && (
            <div className={styles.imagePreview}>
              <div
                className={styles.closeImagePreview}
                onClick={clearPhoto}>
                <AiFillCloseCircle size={30} />
              </div>
              <Image
                src={postPhoto.url}
                fill
                alt='Uploaded Image'
                className={styles.imagePreview}
                style={{ objectFit: 'cover' }}
              />
            </div>
          )}

          <div className={styles.createPostButtons}>
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
        </div >

        <div className={styles.postButton}>
          <Button
            onClick={handleSubmit(onSubmit)}
            label='Post'
            isButtonDisabled={!textareaValue || postBodyLength > 500 || textareaValue.length > 500}
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
