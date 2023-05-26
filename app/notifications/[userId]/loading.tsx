import { FaBell } from "react-icons/fa";

import styles from './Page.module.scss';
import FeedHeader from "@/app/components/feed-header/FeedHeader";
import PostCardSkeleton from "@/app/components/skeletons/post-card-skeleton/PostCardSkeleton";

const NotificationsLoading = () => {
 return (
  <div className={styles.page}>
   <FeedHeader label='Notiications' icon={FaBell} />
   <PostCardSkeleton />
   <PostCardSkeleton />
   <PostCardSkeleton />
   <PostCardSkeleton />
  </div>
 );
}

export default NotificationsLoading;