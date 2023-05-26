'use client'

import { User } from "@prisma/client";
import styles from './PeopleBox.module.scss';
import Image from "next/image";
import Avatar from "../avatar/Avatar";
import VerifiedIcon from "@/app/icons/VerifiedIcon";

type PeopleBoxProps = {
 user: User
}

const PeopleBox: React.FC<PeopleBoxProps> = ({ user }) => {
 return (
  <div className={styles.peopleBox}>
   <Avatar src={user.photo as string} />
   <div className={styles.userName}>
    <p className={styles.name}>{user.name} {user.isVerified && <VerifiedIcon />}</p>
    <p className={styles.username}>{user.username}</p>
   </div>
  </div>
 );
}

export default PeopleBox;