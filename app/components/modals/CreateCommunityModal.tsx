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

const CreateCommunityModal = () => {
 const router = useRouter();
 const createCommunityModal = useCreateCommunityModal();
 const [isLoading, setIsLoading] = useState(false);
 const [photo, setPhoto] = useState('');

 const bodyContent = (
  <div className={styles.bodyContent}>


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
   onSubmit={() => { }}
  />
 )
}

export default CreateCommunityModal