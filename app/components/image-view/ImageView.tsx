import Image from 'next/image';
import styles from './ImageView.module.scss';
import { Dispatch, SetStateAction } from 'react';
import { AiFillCloseSquare } from 'react-icons/ai'
type ImageViewProps = {
 url: string;
 setImageView: Dispatch<SetStateAction<string>>
}

const ImageView: React.FC<ImageViewProps> = ({ url, setImageView }) => {
 return (
  <>
   <div className={styles.overlay} onClick={(e) => { e.stopPropagation(); setImageView('') }}>
    <div className={styles.imageView} onClick={(e) => { e.stopPropagation(); setImageView('') }}>
     <div className={styles.close}>
      <AiFillCloseSquare size={40} onClick={() => setImageView('')} />
     </div>
     <Image
      src={url}
      fill
      alt='Uploaded Image'
      className={styles.image}
      
     />
    </div>
   </div>
  </>
 );
}

export default ImageView;