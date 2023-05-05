
import { Group } from '@prisma/client'
import getGroupsByUserId from './actions/getGroupsByUserId'
import getCurrentUser from './actions/getCurrentUser'
import ClientOnly from './components/ClientOnly'
import Footer from './components/footer/Footer'
import BetModal from './components/modals/bet-modal/BetModal'
import EditProfileModal from './components/modals/EditProfileModal'
import LoginModal from './components/modals/auth-modal/LoginModal'
import RegisterModal from './components/modals/auth-modal/RegisterModal'
import Navbar from './components/navbar/Navbar'
import Scoreboard from './components/scoreboard/Scoreboard'
import ToasterProvider from './providers/ToasterProvider'
import './styles/globals.scss'
import MobileNavbar from './components/navbar/mobile-navbar/MobileNavbar'
import CreateGroupModal from './components/modals/group-modal/CreateGroupModal'
import UserBox from './components/user-box/UserBox'
import getBetRecord from './actions/getBetRecord'

export const metadata = {
  title: 'Wagerly',
  description: 'Generated by create next app',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const currentUser = await getCurrentUser();

  let groups: Group[] = [];
  let record: any;
  if (currentUser) {
    groups = await getGroupsByUserId({ userId: currentUser.id });
    record = await getBetRecord({ userId: currentUser.id })
  }



  return (
    <html lang="en">
      <body>
        <div className='layout'>
          <ClientOnly>
            <ToasterProvider />
            <RegisterModal />
            <LoginModal />
            <BetModal />
            <EditProfileModal />
            <CreateGroupModal />
            <div className='sidebarContainer'>
              <Navbar currentUser={currentUser} groups={groups} />
            </div>

            <div className="gamebarContainer">
              <Scoreboard />
            </div>
            <div className='mobileNavbarContainer'>
              <MobileNavbar currentUser={currentUser} groups={groups} />
            </div>

            <Footer currentUserId={currentUser?.id} />

            <div className="mainContainer">
              {children}
            </div>

            <div className='rightSidebar'>
              {currentUser && (
                <UserBox currentUser={currentUser} record={record} groups={groups} />
              )}
            </div>
          </ClientOnly>
        </div>
      </body>
    </html >
  )
}
