'use client'

import { useState } from "react"
import Modal from "./Modal"
import axios from "axios"
import { toast } from "react-hot-toast"
import Input from "../input/Input"
import { useRouter } from "next/navigation"
import styles from './Modal.module.scss';
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import { MdOutlineKeyboardBackspace } from "react-icons/md"
import "react-toggle/style.css"
import Toggle from 'react-toggle'
import EmojiPicker, { EmojiStyle } from 'emoji-picker-react';
import dynamic from 'next/dynamic';
import { Theme } from 'emoji-picker-react';
import useCreateGroupModal from "@/app/hooks/useCreateCommunityModal"

const CreateGroupModal = () => {
  const router = useRouter();
  const createGroupModal = useCreateGroupModal();
  const [isLoading, setIsLoading] = useState(false);
  const [photo, setPhoto] = useState('');
  const [privacy, setPrivacy] = useState(false)
  const [emoji, setEmoji] = useState('');
  const [isShowing, setIsShowing] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      communityName: '',
      communityBio: '',
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
      .post('/api/community', data)
      .then(() => {
        toast.success('Group created');
        createGroupModal.onClose();
        router.refresh();
        reset();
      })
      .catch((error) => {
        toast.error('Error');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }


  const Picker = dynamic(
    () => {
      return import('emoji-picker-react');
    },
    { ssr: false }
  );

  const chooseEmoji = (emoji: string) => {
    setIsShowing(false)
    setEmoji(emoji as string)
  }

  const bodyContent = (
    <div className={styles.bodyContent}>
      <div className={styles.tabs}>
        <p className={styles.selected}>Group Settings</p>
        <p>My Settings</p>
        <p>Members</p>
      </div>
      <div className={styles.groupSettingsName}>
        Group Settings
      </div>
      <div className={styles.groupName}>
        <Input
          id='communityName'
          label='Group name'
          disabled={isLoading}
          register={register}
          errors={errors}
          type='text'
          onChange={(e) => setCustomValue('communityName', e.target.value)}
        />
        <Input
          id='communityBio'
          label='Group bio'
          disabled={isLoading}
          register={register}
          errors={errors}
          type='text'
          onChange={(e) => setCustomValue('communityBio', e.target.value)}
        />
      </div>
      <div className={styles.emojiSelector}>
        <div className={styles.label}>
          <p>Group Icon</p>
        </div>
        <div className={styles.content}>
          <div className={styles.selector} onClick={() => setIsShowing(true)}>
            <p>{emoji}</p>
            {isShowing && (
              <div className={styles.picker}>
                {<Picker theme={'dark' as Theme} emojiStyle={"google" as EmojiStyle} onEmojiClick={(value) => { setCustomValue('photo', value.emoji); chooseEmoji(value.emoji) }} />}
              </div>
            )}
          </div>

          <p className={styles.description}>
            The emoji you select will show up in the betting groups lobby.
          </p>
        </div>
      </div>
      <div className={styles.advancedSettings}>
        <div className={styles.label}>
          <p>Advanced Settings</p>
        </div>
        <div className={styles.setting}>
          <div className={styles.text}>
            <p className={styles.name}>Make Group Private</p>
            <p className={styles.description}>Choose whether or not you want anyone to join.</p>
          </div>
          <div className={styles.toggle}>
            <Toggle
              defaultChecked={privacy as boolean}
              onChange={() => { setPrivacy(!privacy); setCustomValue('visibility', !privacy) }} icons={false} />
          </div>

        </div>
        <div className={styles.setting}>
          <div className={styles.text}>
            <p className={styles.name}>Bet Filters (All Selected)</p>
            <p className={styles.description}>Select the sports or leagues you want shared with this group. </p>
          </div>
          <div className={styles.toggle}>
            <Toggle
              defaultChecked={privacy as boolean}
              onChange={() => setPrivacy(!privacy)} icons={false} />
          </div>
        </div>
      </div>

      {/* <Textarea
        id='communityBio'
        label='Group bio'
        disabled={isLoading}
        register={register}
        errors={errors}
        onChange={(e) => setCustomValue('communityBio', e.target.value)}
      /> */}
      {/* <div className={styles.addProfilePicture}>
        <div className={styles.imagePreview}>
          <p className={styles.label}>Community picture</p>
          <div className={styles.image}>

            <Image src={photo || '/images/placeholder.png'} alt='profile-picture' width='100' height='100' />

          </div>
        </div>
        <div className={styles.imageSelector}>
          <ImageUpload
            value={photo}
            onChange={(image) => setPhoto(image)}
            setCustomValue={setCustomValue}
            label={photo ? 'Change your community picture' : 'Add your community picture'}
            isRegister
          />
        </div>
      </div> */}
      {/* <div className={styles.visibility}>
        <p className={styles.label}>Change community visibility</p>
        <div className={styles.buttons}>
          <div onClick={() => { setVisibility('public'); setCustomValue('visibility', false) }} className={visibility === 'public' ? styles.selected : styles.public}>Public</div>
          <div onClick={() => { setVisibility('private'); setCustomValue('visibility', true) }} className={visibility === 'private' ? styles.selected : styles.private}>Private</div>

        </div>


      </div> */}
    </div>
  )

  return (
    <Modal
      disabled={isLoading}
      isOpen={createGroupModal.isOpen}
      title='Create a group'
      actionLabel="Create Group"
      onClose={createGroupModal.onClose}
      icon={MdOutlineKeyboardBackspace}
      body={bodyContent}
      onSubmit={handleSubmit(onSubmit)}
    />
  )
}

export default CreateGroupModal