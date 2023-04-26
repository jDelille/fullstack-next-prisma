import Image from "next/image";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import Button from "../button/Button";
import useLoginModal from "@/app/hooks/useLoginModal";

type ImageUploadProps = {
 onChange: (base64: string) => void;
 value: string;
 label?: string;
 setCustomValue: (id: string, value: any) => void;
 userId?: string
 isRegister?: boolean;
}


const ImageUpload: React.FC<ImageUploadProps> = ({ onChange, value, setCustomValue, label, userId, isRegister }) => {

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
   {base64 ? (
    // <Image src={base64} height='100' width='100' alt='uploaded image' />
    <Button onClick={() => { }} label={label} disabled={value.length > 0} />
   ) : (
    <Button onClick={() => { }} label={label} />

   )}
  </div>
 );
}

export default ImageUpload;