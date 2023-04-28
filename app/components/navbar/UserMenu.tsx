
import { SafeUser } from '@/app/types';
import useRegisterModal from '@/app/hooks/useRegitserModal';
import Button from '../button/Button';
import useLoginModal from '@/app/hooks/useLoginModal';
import { signOut } from 'next-auth/react'
import styles from './Navbar.module.scss';
import { useRouter } from 'next/navigation';
import { AiFillHome } from 'react-icons/ai'
import { FaUserAlt, FaUsers } from 'react-icons/fa'
import { BiMoneyWithdraw } from 'react-icons/bi'
import { MdAddCircle, MdNotifications } from 'react-icons/md'
import useCreateCommunityModal from '@/app/hooks/useCreateCommunityModal';
import Image from 'next/image';
type UserMenu = {
 currentUser?: SafeUser | null
 communities?: any
}

const UserMenu: React.FC<UserMenu> = ({ currentUser, communities }) => {
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
      <div onClick={() => router.push(`/community`)} className={styles.Link}>
       <FaUsers size={20} />
       <p>Communities</p>
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
   <div className={styles.communities}>
    <p className={styles.label}>My community <span>{communities.length}</span></p>
    <div className={styles.createButton} onClick={currentUser ? createCommunityModal.onOpen : loginModal.onOpen}>
     <MdAddCircle size={20} color='#20b46a' />
     <p >Create a community</p>
    </div>
    {communities.map((community: any) => (
     <div key={community.id} className={styles.community} onClick={() => { router.push(`/community/${community.id}`) }}>
      <div className={styles.image}>
       <Image src={community.photo} alt='community-photo' width={30} height={30} />
      </div>
      <div className={styles.name}>
       <p>{community.name}</p>
       <p className={styles.members}>{community.memberIds.length} members</p>
      </div>
     </div>
    ))}
   </div>
   <div className={styles.events}>
    <p className={styles.label}>Events <span>0</span></p>
    <div className={styles.Link}>
     <MdAddCircle size={20} />
     <p>Comming soon...</p>
    </div>
   </div>
  </div>
 );
}

export default UserMenu;