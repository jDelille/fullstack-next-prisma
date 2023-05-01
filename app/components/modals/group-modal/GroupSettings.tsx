'use client'
import Toggle from 'react-toggle'
import EmojiPicker, { EmojiStyle } from 'emoji-picker-react';
import { Theme } from 'emoji-picker-react';
import Input from "../../input/Input"
import styles from '../Modal.module.scss';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import "react-toggle/style.css"
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';

type GroupSettingsProps = {
  isLoading?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  required?: boolean;
  setCustomValue: (id: string, value: any) => void;
}


const GroupSettings: React.FC<GroupSettingsProps> = ({ isLoading, register, errors, required, setCustomValue }) => {

  const [privacy, setPrivacy] = useState(false)
  const [emoji, setEmoji] = useState('');
  const [isShowing, setIsShowing] = useState(false);

  const chooseEmoji = (emoji: string) => {
    setIsShowing(false)
    setEmoji(emoji as string)
  }

  const Picker = dynamic(
    () => {
      return import('emoji-picker-react');
    },
    { ssr: false }
  );

  return (
    <>
      <div className={styles.groupSettingsName}>
        Group Settings
      </div>
      <div className={styles.groupName}>
        <Input
          id='groupName'
          label='Group name'
          disabled={isLoading}
          register={register}
          errors={errors}
          type='text'
          onChange={(e) => setCustomValue('groupName', e.target.value)}
        />
        <Input
          id='groupBio'
          label='Group Description'
          disabled={isLoading}
          register={register}
          errors={errors}
          type='text'
          onChange={(e) => setCustomValue('groupBio', e.target.value)}
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
    </>

  );
}

export default GroupSettings;