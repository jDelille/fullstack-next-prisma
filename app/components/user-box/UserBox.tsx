import { SafeUser } from "@/app/types";
import styles from './UserBox.module.scss';
import Image from "next/image";
import VerifiedIcon from "@/app/icons/VerifiedIcon";
import { Group } from "@prisma/client";

type UserBoxProps = {
 currentUser?: SafeUser | null;
 record?: any;
 groups?: Group[] | null

}

const UserBox: React.FC<UserBoxProps> = ({ currentUser, record, groups }) => {

 return (
  <div className={styles.userBox}>
   <div className={styles.top}>
    <Image src={currentUser?.photo as string} alt="user-photo" width={40} height={40} />
    <div className={styles.name}>
     <p>{currentUser?.name} {currentUser?.isVerified && <VerifiedIcon />}</p>
     <span>{currentUser?.username}</span>
    </div>

   </div>
   {/* <div className={styles.bottom}>
    <p className={styles.points}>{currentUser?.points} pts.</p>
    <p>{record.winCount} wins</p>
    <p>{record.lossCount} losses</p>
    <p>{groups?.length || 0} groups</p>
   </div> */}
  </div >
 );
}

export default UserBox;