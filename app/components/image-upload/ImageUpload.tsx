import Image from "next/image";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import Button from "../button/Button";
import useLoginModal from "@/app/hooks/useLoginModal";
import { AiFillCamera, AiOutlineCamera } from "react-icons/ai";

type ImageUploadProps = {
 onChange: (base64: string) => void;
 value: string;
 label?: string;
 setCustomValue: (id: string, value: any) => void;
 userId?: string
 isRegister?: boolean;
 isPost?: boolean
}


const ImageUpload: React.FC<ImageUploadProps> = ({ onChange, value, setCustomValue, label, userId, isRegister, isPost }) => {

 const [base64, setBase64] = useState(value)
 const loginModal = useLoginModal();

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
    <AiOutlineCamera size={24} color="#abadb1" />
   )}
  </div>
 );
}

export default ImageUpload;