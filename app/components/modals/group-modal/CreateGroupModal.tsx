'use client'

import { useState } from "react"
import Modal from "../Modal"
import axios from "axios"
import { toast } from "react-hot-toast"
import { useRouter } from "next/navigation"
import styles from '../Modal.module.scss';
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import { MdOutlineKeyboardBackspace } from "react-icons/md"
import useCreateGroupModal from "@/app/hooks/useCreateGroupModal"
import GroupSettings from "./GroupSettings"
import Tabs from "./Tabs"
import MySettings from "./MySettings"
import Members from "./Members"

enum STEPS {
  GROUPSETTINGS = 0,
  MYSETTINGS = 1,
  MEMBERS = 2
}

const CreateGroupModal = () => {
  const router = useRouter();
  const createGroupModal = useCreateGroupModal();
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(STEPS.GROUPSETTINGS)

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
      .post('/api/group', data)
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

  console.log(step)


  let bodyContent = (
    <div className={styles.bodyContent}>
      <Tabs setStep={setStep} step={step} />
      <GroupSettings isLoading={isLoading} register={register} errors={errors} setCustomValue={setCustomValue} />
    </div>
  )

  if (step === STEPS.MYSETTINGS) {
    bodyContent = (
      <div className={styles.bodyContent}>
        <Tabs setStep={setStep} step={step} />
        <MySettings setCustomValue={setCustomValue} />
      </div>
    )
  }

  if (step === STEPS.MEMBERS) {
    bodyContent = (
      <div className={styles.bodyContent}>
        <Tabs setStep={setStep} step={step} />
        <Members isLoading={isLoading} register={register} errors={errors} setCustomValue={setCustomValue} />
      </div>
    )
  }

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