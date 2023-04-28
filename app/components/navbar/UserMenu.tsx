
import { SafeUser } from '@/app/types';
import useRegisterModal from '@/app/hooks/useRegitserModal';
import Button from '../button/Button';
import useLoginModal from '@/app/hooks/useLoginModal';
import { signOut } from 'next-auth/react'
import styles from './Navbar.module.scss';
import { useRouter } from 'next/navigation';
import { AiFillHome } from 'react-icons/ai'
import { FaUserAlt } from 'react-icons/fa'
import { BiMoneyWithdraw } from 'react-icons/bi'
import { MdAddCircle, MdNotifications } from 'react-icons/md'
import useCreateCommunityModal from '@/app/hooks/useCreateCommunityModal';
type UserMenu = {
 currentUser?: SafeUser | null
}

const UserMenu: React.FC<UserMenu> = ({ currentUser }) => {
 const registerModal = useRegisterModal();
 const loginModal = useLoginModal();
 const router = useRouter();
 const createCommunityModal = useCreateCommunityModal();

 return (
  <div className={styles.userMenu}>
   <div className={styles.pages}>
    <p className={styles.label}>Menu </p>
    {currentUser ? (
     <>
      <div onClick={() => { router.push('/') }} className={styles.Link}>
       <AiFillHome size={20} />
       <p>Home</p>
      </div>
      <div onClick={() => router.push(`/user/${currentUser?.id}`)} className={styles.Link}>
       <FaUserAlt size={20} />
       <p>My Profile</p>
      </div>
      <div onClick={() => router.push(`/myBets/${currentUser?.id}`)} className={styles.Link}>
       <BiMoneyWithdraw size={20} />
       <p>My Bets</p>
      </div>
      <div onClick={() => router.push(`/myBets/${currentUser?.id}`)} className={styles.Link}>
       <MdNotifications size={20} />
       <p>Notifications</p>
      </div>
      <div className={styles.logoutWrapper}>
       <Button label='Logout' onClick={() => signOut()} />
      </div>
     </>
    ) : (
     <>
      <div onClick={() => { router.push('/') }} className={styles.Link}>
       <AiFillHome size={20} />
       <p>Home</p>
      </div>
     </>
    )}
   </div>
   <div className={styles.community}>
    <p className={styles.label}>My community <span>0</span></p>
    <div className={styles.Link} onClick={createCommunityModal.onOpen}>
     <MdAddCircle size={20} />
     <p>Create a community</p>
    </div>
   </div>
   <div className={styles.events}>
    <p className={styles.label}>Events <span>0</span></p>
    <div className={styles.Link}>
     <MdAddCircle size={20} />
     <p>Create an event</p>
    </div>
   </div>
  </div>
 );
}

export default UserMenu;