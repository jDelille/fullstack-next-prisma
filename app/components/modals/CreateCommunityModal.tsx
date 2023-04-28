'use client'

import useCreateCommunityModal from "@/app/hooks/useCreateCommunityModal"
import { useState } from "react"
import Modal from "./Modal"
import axios from "axios"
import { toast } from "react-hot-toast"
import Input from "../input/Input"
import Textarea from "../textarea/Textarea"
import { useRouter } from "next/navigation"
import ImageUpload from "../image-upload/ImageUpload"
import styles from './Modal.module.scss';
import { IoMdClose } from "react-icons/io"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import Image from "next/image"

const CreateCommunityModal = () => {
 const router = useRouter();
 const createCommunityModal = useCreateCommunityModal();
 const [isLoading, setIsLoading] = useState(false);
 const [photo, setPhoto] = useState('');
 const [visibility, setVisibility] = useState('')

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
    toast.success('Community created');
    createCommunityModal.onClose();
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

 const bodyContent = (
  <div className={styles.bodyContent}>
   <Input
    id='communityName'
    label='Community name'
    disabled={isLoading}
    register={register}
    errors={errors}
    type='text'
    onChange={(e) => setCustomValue('communityName', e.target.value)}
   />
   <Textarea
    id='communityBio'
    label='Community description'
    disabled={isLoading}
    register={register}
    errors={errors}
    onChange={(e) => setCustomValue('communityBio', e.target.value)}
   />
   <div className={styles.addProfilePicture}>
    <div className={styles.imagePreview}>
     <p className={styles.label}>Add your profile picture</p>
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
   </div>
   <div className={styles.visibility}>
    <p className={styles.label}>Change community visibility</p>
    <div className={styles.buttons}>
     <div onClick={() => { setVisibility('public'); setCustomValue('visibility', false) }} className={visibility === 'public' ? styles.selected : styles.public}>Public</div>
     <div onClick={() => { setVisibility('private'); setCustomValue('visibility', true) }} className={visibility === 'private' ? styles.selected : styles.private}>Private</div>

    </div>


   </div>
  </div>
 )

 return (
  <Modal
   disabled={isLoading}
   isOpen={createCommunityModal.isOpen}
   title='Create a community'
   actionLabel="Create Community"
   onClose={createCommunityModal.onClose}
   icon={IoMdClose}
   body={bodyContent}
   onSubmit={handleSubmit(onSubmit)}
  />
 )
}

export default CreateCommunityModal