'use client';
import styles from '../create-post/create-post-form/CreatePostForm.module.scss';
import useBetModal from '@/app/hooks/useBetModal';
import { useState, useEffect } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import useLoginModal from '@/app/hooks/useLoginModal';
import usePollModal from '@/app/hooks/usePollModal';
import CreatePostInput from '../create-post/create-post-input/CreatePostInput';
import { Mention, MentionsInput, OnChangeHandlerFunc, SuggestionDataItem } from 'react-mentions';
import { User } from '@prisma/client';
import VerifiedIcon from '@/app/icons/VerifiedIcon';
import Image from 'next/image';
import mentionsInputStyle from '../create-post/create-post-textarea/mentionsInputStyle';
import mentionStyle from '../create-post/create-post-textarea/mentionStyle';
import TagMentionTextarea from '../tag-mention/TagMentionTextarea';

type CreateCommentFormProps = {
  userPhoto?: string;
  userId?: string;
  isComment: boolean;
  postId?: string;
  isBordered?: boolean;
  isGroup?: boolean;
  groupId?: string;
  placeholder?: string;
  users: User[]
};

interface ExtendedSuggestionDataItem extends SuggestionDataItem {
  avatar?: string;
  name?: string;
  isVerified?: boolean;
}

const CreateCommentForm = ({
  userPhoto,
  userId,
  isComment,
  postId,
  isBordered,
  isGroup,
  groupId,
  placeholder,
  users
}: CreateCommentFormProps) => {
  const router = useRouter();
  const betModal = useBetModal();
  const loginModal = useLoginModal();
  const pollModal = usePollModal();

  const [photo, setPhoto] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showGifs, setShowGifs] = useState(false);
  const [suggestions, setSuggestions] = useState<ExtendedSuggestionDataItem[]>([]);
  const [taggedUserIds, setTaggedUserIds] = useState<string[]>([])
  const [commentValue, setCommentValue] = useState("")

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

  const handleOnChange: OnChangeHandlerFunc = async (event: {
    target: {
      value: string;
    }
  }, rawString, mentions) => {
    let value = event.target.value;
    value = value.replace(/\@\[(\w+)\]\(\w+\)/g, '@$1');
    setCommentValue(value)
    console.log(value);
    setCustomValue('postBody', value)
  }

  const handleOnAdd = (id: string | number, display: string) => {
    const mentionText = `@${display}`;
    const newText = commentValue.replace(/@(\w+)?$/, mentionText);
    setCommentValue(newText);
    setTaggedUserIds((prevIds) => [...prevIds, id as string]);
  }

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
              id='postBody'
            />


          </>
        )}
      </div>
    </div>
  );
};

export default CreateCommentForm;
