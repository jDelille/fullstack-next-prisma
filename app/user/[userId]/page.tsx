import getUserById from "@/app/actions/getUserById";
import styles from './Page.module.scss';

interface IParams {
 userId?: string;
}

const ProfilePage = async ({ params }: { params: IParams }) => {

 const user = await getUserById(params);

 return (
  <div className={styles.page}>
   {user?.name}
  </div>
 )
}

export default ProfilePage;