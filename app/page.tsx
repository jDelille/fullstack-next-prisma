import dynamic from 'next/dynamic';
import getCurrentUser from './actions/getCurrentUser';
import getPosts from './actions/getPosts';
import PostCardSkeleton from './components/skeletons/post-card-skeleton/PostCardSkeleton';
import { Suspense } from 'react';
import FeedHeader from './components/feed-header/FeedHeader';
import { BiHash } from 'react-icons/bi';
import getUsers from './actions/getUsers';

export default async function Home() {
  const [posts, currentUser, users] = await Promise.all([getPosts(), getCurrentUser(), getUsers()])

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
        {/* <CreatePostForm
          userPhoto={currentUser?.photo as string}
          userId={currentUser?.id as string}
          isBordered={true}
          isComment={false}
        /> */}
        <FeedHeader label='Explore' icon={BiHash} />
        <Suspense fallback={<p>Loading...</p>}>

          <DynamicPostFeed posts={posts} currentUser={currentUser} users={users} />
        </Suspense>
      </div>
    </main>
  );
}
