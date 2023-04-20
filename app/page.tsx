

import Image from 'next/image'
import { Inter } from 'next/font/google'
import './globals.css'
import useUsers from './hooks/useUsers';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const { data: users = [] } = useUsers();

  console.log(users)
  return (
    <main className='main' >
      <h1>HOME</h1>
    </main>
  )
}
