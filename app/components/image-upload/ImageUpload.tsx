import Image from "next/image";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import Button from "../button/Button";
import useLoginModal from "@/app/hooks/useLoginModal";
import { AiFillCamera, AiOutlineCamera } from "react-icons/ai";
import styles from '../create-post/create-post-form/CreatePostForm.module.scss'

type ImageUploadProps = {
 onChange: (base64: string) => void;
 value: string;
 label?: string;
 setCustomValue: (id: string, value: any) => void;
 userId?: string
 isRegister?: boolean;
 isPost?: boolean
 placeholder?: string;
}


const ImageUpload: React.FC<ImageUploadProps> = ({ onChange, value, setCustomValue, label, userId, isRegister, isPost, placeholder }) => {

 const [base64, setBase64] = useState(value)

 const handleChange = useCallback((base64: string) => {
  onChange(base64);
  setCustomValue('photo', base64)
 }, [onChange, setCustomValue])

 const handleDrop = useCallback((files: any) => {
  const file = files[0]
  const reader = new FileReader()

  reader.onload = (event: any) => {
   setBase64(event.target.result)
   handleChange(event.target.result)
  }

  reader.readAsDataURL(file)
 }, [handleChange])

 const { getRootProps, getInputProps } = useDropzone({
  maxFiles: 1,
  onDrop: handleDrop,
  accept: {
   'image/jpeg': [],
   'image/png': []
  }
 })

 return (
  <div {...getRootProps({})} >
   <input {...getInputProps()} placeholder="upload" width='100px' height='50px' />
   {!isPost ? (
    <Image src={base64 || '/images/placeholder.png'} alt='profile-picture' width='50' height='50' />
   ) : (
    <div className={styles.icon}>
     <AiOutlineCamera size={20} color="#abadb1" />
     <span>Photo</span>
    </div>
   )}
  </div>
 );
}

export default ImageUpload;