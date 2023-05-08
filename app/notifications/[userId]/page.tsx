import styles from './Page.module.scss';
import getNotificationByUserId from '@/app/actions/getNotificationByUserId';

interface IParams {
 userId?: string;
}

const Notifications = async ({ params }: { params: IParams }) => {
 const notifications = await getNotificationByUserId(params)

 

 return (
  <div className={styles.page}>
   <h1> Notifications </h1>
   {notifications.map((notification) => (
    <div key={notification.id} className={styles.notificationCard}>{notification.body}</div>
   ))}
  </div>
 );
};

export default Notifications;