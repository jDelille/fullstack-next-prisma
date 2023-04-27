
import getCurrentUser from './actions/getCurrentUser'
import ClientOnly from './components/ClientOnly'
import Footer from './components/footer/Footer'
import BetModal from './components/modals/bet-modal/BetModal'
import CreateCommunityModal from './components/modals/CreateCommunityModal'
import EditProfileModal from './components/modals/EditProfileModal'
import LoginModal from './components/modals/LoginModal'
import RegisterModal from './components/modals/RegisterModal'
import Navbar from './components/navbar/Navbar'
import Scoreboard from './components/scoreboard/Scoreboard'
import ToasterProvider from './providers/ToasterProvider'
import './styles/globals.scss'

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body>

        <ClientOnly>
          <ToasterProvider />
          <RegisterModal />
          <LoginModal />
          <BetModal />
          <EditProfileModal />
          <CreateCommunityModal />
          <div className='sidebarContainer'>
            <Navbar currentUser={currentUser} />
          </div>

          <div className="gamebarContainer">
            <Scoreboard />
          </div>
          <div className='rightSidebar'>
          </div>
          <Footer currentUserId={currentUser?.id} />

          <div className="mainContainer">
            {children}
          </div>
        </ClientOnly>
      </body>
    </html >
  )
}
