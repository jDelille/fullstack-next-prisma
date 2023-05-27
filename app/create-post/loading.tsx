import PostCardSkeleton from "../components/skeletons/post-card-skeleton/PostCardSkeleton";


const CreatePostLoading = () => {
 return (
  <div>
   <PostCardSkeleton />
   <PostCardSkeleton />
   <PostCardSkeleton />
   <PostCardSkeleton />
  </div>
 );
}

export default CreatePostLoading;