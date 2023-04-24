'use client'

import { useRef, useEffect } from 'react';
import styles from './CreatePostInput.module.scss';
import Image from 'next/image';
import { AiFillCloseCircle } from 'react-icons/ai';
import Avatar from '../avatar/Avatar';
import { BsFillSendFill } from 'react-icons/bs'

type CreatePostInput = {
  setCustomValue: (id: string, value: any) => void;
  photo: string;
  userPhoto?: string;
  userId?: string;
  isComment?: boolean;
  placeholder: string;
  body?: string
}

const CreatePostInput: React.FC<CreatePostInput> = ({ setCustomValue, photo, userPhoto, userId, isComment, placeholder, body }) => {

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

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



  return (
    <div className={styles.createPostInput}>
      <div className={styles.profilePicture} >
        <Avatar src={userPhoto} userId={userId} />
      </div>
      <div className={styles.textareaWrapper}>
        <textarea
          onChange={(event) => {
            event.stopPropagation();
            setCustomValue('postBody', event.target.value);
          }}
          // value={body}
          className={styles.textarea}
          placeholder={placeholder}
          ref={textAreaRef}
          rows={1}>

        </textarea>
        {isComment && (
          <button className={styles.commentBtn} disabled={!body}>
            <BsFillSendFill color='white' />
          </button>
        )}

        {photo && (
          <div className={styles.imagePreview}>
            {/* <div
              className={styles.closeImagePreview}
              onClick={() => setPhoto('')}>
              <AiFillCloseCircle size={30} />
            </div> */}
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