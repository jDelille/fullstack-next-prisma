'use client'

import { useRef, useEffect, MouseEventHandler } from 'react';
import styles from './CreatePostInput.module.scss';
import Image from 'next/image';
import { AiFillCloseCircle } from 'react-icons/ai';
import Avatar from '../../avatar/Avatar';
import { BsFillSendFill } from 'react-icons/bs'
import { FieldValues, SubmitHandler, UseFormHandleSubmit } from 'react-hook-form';
import useLoginModal from '@/app/hooks/useLoginModal';

type CreatePostInput = {
  setCustomValue: (id: string, value: any) => void;
  photo: string;
  userPhoto?: string;
  userId?: string;
  isComment?: boolean;
  placeholder: string;
  body?: string
  id?: string;
  handleSubmit?: UseFormHandleSubmit<FieldValues>;
  onSubmit?: SubmitHandler<FieldValues>;
  setPhoto?: (value: string) => void;
}

const CreatePostInput: React.FC<CreatePostInput> = ({ id, setCustomValue, photo, userPhoto, userId, isComment, placeholder, body, handleSubmit, onSubmit, setPhoto }) => {

  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const loginModal = useLoginModal();
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

  const clearPhoto = () => {
    setCustomValue('photo', '');
    setPhoto && setPhoto('')
  }

  return (
    <div className={isComment ? styles.createCommentInput : styles.createPostInput}>
      <div className={styles.profilePicture} >
        <Avatar src={userPhoto} userId={userId} />
      </div>
      <div className={styles.textareaWrapper} onClick={() => { !userId ? loginModal.onOpen() : null }}>
        <textarea
          id={id}
          onChange={(event) => {
            event.stopPropagation();
            setCustomValue('postBody', event.target.value);
          }}
          value={body}
          className={body && body.length > 0 ? styles.textarea : styles.textareaPlaceholder}
          placeholder={placeholder}
          ref={textAreaRef}
          rows={1}>
          c

        </textarea>
        {isComment && body && body.length > 0 && (
          <button className={styles.commentBtn} disabled={!body} onClick={handleSubmit && onSubmit && handleSubmit(onSubmit)}>
            <BsFillSendFill color='white' />
          </button>
        )}

        {photo && (
          <div className={styles.imagePreview}>
            {setPhoto && (
              <div
                className={styles.closeImagePreview}
                onClick={clearPhoto}>
                <AiFillCloseCircle size={30} />
              </div>
            )}
            <Image
              src={photo}
              fill
              alt='Uploaded Image'
              className={styles.imagePreview}
              style={{ objectFit: 'cover' }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default CreatePostInput;