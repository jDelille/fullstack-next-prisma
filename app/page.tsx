import dynamic from 'next/dynamic';
import getCurrentUser from './actions/getCurrentUser';
import getPosts from './actions/getPosts';
import CreatePostForm from './components/create-post/create-post-form/CreatePostForm';
import PostCardSkeleton from './components/skeletons/post-card-skeleton/PostCardSkeleton';
import { Suspense } from 'react';
import getUsers from './actions/getUsers';

export default async function Home() {
  const posts = await getPosts();
  const currentUser = await getCurrentUser();
  const users = await getUsers();

  const DynamicPostFeed = dynamic(() => import('./components/post-feed/PostFeed'), {
    loading: () => <>
      <PostCardSkeleton />
      <PostCardSkeleton />
      <PostCardSkeleton />
    </>
  })

  return (
    <main className='main'>
      <div className='mainFeed'>
        <CreatePostForm
          userPhoto={currentUser?.photo as string}
          userId={currentUser?.id as string}
          isBordered={true}
          isComment={false}
          users={users}
        />
        <Suspense fallback={<p>Loading...</p>}>
          <DynamicPostFeed posts={posts} currentUser={currentUser} />
        </Suspense>
      </div>
    </main>
  );
}
