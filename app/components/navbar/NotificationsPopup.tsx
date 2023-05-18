import styles from './Navbar.module.scss';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';

type NotificationsPopupProps = {
 notifications: Notification[] | undefined;
 setOpenMenu: (value: boolean) => void;
}

const NotificationsPopup: React.FC<NotificationsPopupProps> = ({ notifications, setOpenMenu }) => {
 return (
  <>
   <div className={styles.overlay} onClick={() => setOpenMenu(false)}></div>
   <SimpleBar className={styles.notificationsPopup}>
    {notifications?.map((notification, index) => (
     <div key={index} className={styles.notification}>{notification.body}</div>
    ))}
   </SimpleBar>
  </>

 );
}

export default NotificationsPopup;