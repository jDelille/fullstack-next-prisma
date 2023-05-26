import { FaUsers } from "react-icons/fa";
import FeedHeader from "../components/feed-header/FeedHeader";
import PostCardSkeleton from "../components/skeletons/post-card-skeleton/PostCardSkeleton";
import styles from './Page.module.scss';

const GroupsLoading = () => {
 return (
  <div className={styles.page}>
   <FeedHeader label='Groups' icon={FaUsers} />
   <PostCardSkeleton />
   <PostCardSkeleton />
   <PostCardSkeleton />
   <PostCardSkeleton />
  </div>
 );
}

export default GroupsLoading;