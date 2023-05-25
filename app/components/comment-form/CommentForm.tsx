'use client';
import styles from '../create-post/create-post-form/CreatePostForm.module.scss';
import useBetModal from '@/app/hooks/useBetModal';
import { useEffect, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import useLoginModal from '@/app/hooks/useLoginModal';

import usePollModal from '@/app/hooks/usePollModal';
import CreatePostInput from '../create-post/create-post-input/CreatePostInput';

type CreateCommentFormProps = {
 userPhoto?: string;
 userId?: string;
 isComment: boolean;
 postId?: string;
 isBordered?: boolean;
 isGroup?: boolean
 groupId?: string;
 placeholder?: string;
};

const CreateCommentForm = ({
 userPhoto,
 userId,
 isComment,
 postId,
 isBordered,
 isGroup,
 groupId,
 placeholder
}: CreateCommentFormProps) => {
 const router = useRouter();
 const betModal = useBetModal();
 const loginModal = useLoginModal();
 const pollModal = usePollModal();

 const [photo, setPhoto] = useState('');
 const [isLoading, setIsLoading] = useState(false);
 const [showGifs, setShowGifs] = useState(false)


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
  <div className={styles.inputCommentContainer}>
   <div
    className={
     isBordered ? styles.inputWrapperBordered : styles.inputWrapper
    }>
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

export default CreateCommentForm;
