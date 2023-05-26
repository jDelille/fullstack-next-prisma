'use client';

import { useRouter } from 'next/navigation';

type BackButtonProps = {
 label: string;
}

const BackButton: React.FC<BackButtonProps> = ({ label }) => {
 const router = useRouter();

 return (
  <p onClick={() => router.push('/')}>{label}</p>
 );
}

export default BackButton;