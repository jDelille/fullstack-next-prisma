import CreatePostInput from './components/create-post-input/CreatePostInput'
import './styles/globals.scss'

export default function Home() {
  return (
    <main className='main'>
      <div className="gamebarContainer">
      </div>
      <div className="mainFeed">
        <CreatePostInput />
      </div>
      <div className="rightSidebar"></div>
    </main>
  )
}
