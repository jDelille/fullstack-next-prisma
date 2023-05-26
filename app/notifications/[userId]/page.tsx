import FeedHeader from '@/app/components/feed-header/FeedHeader';
import styles from './Page.module.scss';
import getNotificationByUserId from '@/app/actions/getNotificationByUserId';
import Notification from '@/app/components/notification/Notification';
import prisma from '@/app/libs/prismadb';
import dynamic from 'next/dynamic';
import { FaBell } from 'react-icons/fa';

interface IParams {
 userId?: string;
}

const Notifications = async ({ params }: { params: IParams }) => {
 const notifications = await getNotificationByUserId(params)

 await prisma.user.update({
  where: {
   id: params.userId
  },
  data: {
   hasNotification: false,
  },
 });

 const DynamicNotification = dynamic(() => import('../../components/notification/Notification'), {
  loading: () => <p>Loading...</p>
 })

 return (
  <div className={styles.page}>
   <FeedHeader label='Notiications' icon={FaBell} />
   {notifications.map((notification) => (
    <DynamicNotification key={notification.id} id={notification.id} body={notification} className={styles.notificationCard} />
   ))}
  </div>
 );
};

export default Notifications;
