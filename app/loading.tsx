import PostCardSkeleton from "./components/skeletons/post-card-skeleton/PostCardSkeleton";

const PageLoading = () => {
 return (
  <div>
   <PostCardSkeleton />
   <PostCardSkeleton />
   <PostCardSkeleton />
   <PostCardSkeleton />
  </div>
 );
}

export default PageLoading;