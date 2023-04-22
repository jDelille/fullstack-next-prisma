import getCurrentUser from './actions/getCurrentUser';
import getPosts from './actions/getPosts';
import CreatePostForm from './components/create-post-form/CreatePostForm';

import PostFeed from './components/post-feed/PostFeed'
import './styles/globals.scss'

export default async function Home() {

  const posts = await getPosts();
  const currentUser = await getCurrentUser();
  return (
    <main className='main'>
      <div className="gamebarContainer">
      </div>
      <div className="mainFeed">
        <CreatePostForm />
        <PostFeed posts={posts} currentUser={currentUser} />
      </div>
      {/* <div className="rightSidebar"></div> */}
    </main>
  )
}
