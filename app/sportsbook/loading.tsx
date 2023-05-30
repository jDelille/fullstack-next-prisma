import FeedHeader from "@/app/components/feed-header/FeedHeader";
import PostCardSkeleton from "@/app/components/skeletons/post-card-skeleton/PostCardSkeleton";
import styles from './Page.module.scss';
import { IoArrowBack } from "react-icons/io5";

const SportsbookPageLoading = () => {
 return (
  <div className={styles.page}>
   <FeedHeader label='Back' icon={IoArrowBack} isBack />
   <PostCardSkeleton />
   <PostCardSkeleton />
   <PostCardSkeleton />
   <PostCardSkeleton />
  </div>
 );
}

export default SportsbookPageLoading;