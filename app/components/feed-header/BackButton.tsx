'use client';
import Link from 'next/link';

type BackButtonProps = {
 label: string;
}

const BackButton: React.FC<BackButtonProps> = ({ label }) => {

 return (
  <Link href={'/'}>{label}</Link>
 );
}

export default BackButton;