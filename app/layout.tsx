import { Group } from '@prisma/client';
import getGroupsByUserId from './actions/getGroupsByUserId';
import getCurrentUser from './actions/getCurrentUser';
import ClientOnly from './components/ClientOnly';
import Footer from './components/footer/Footer';
import BetModal from './components/modals/bet-modal/BetModal';
import EditProfileModal from './components/modals/EditProfileModal';
import LoginModal from './components/modals/auth-modal/LoginModal';
import RegisterModal from './components/modals/auth-modal/RegisterModal';
import Navbar from './components/navbar/Navbar';
import Scoreboard from './components/scoreboard/Scoreboard';
import ToasterProvider from './providers/ToasterProvider';
import MobileNavbar from './components/navbar/mobile-navbar/MobileNavbar';
import CreateGroupModal from './components/modals/group-modal/CreateGroupModal';
import UserBox from './components/user-box/UserBox';
import getBetRecord from './actions/getBetRecord';
import getNotificationByUserId from './actions/getNotificationByUserId';
import './styles/globals.scss';
import FollowUsers from './components/followUsers/FollowUsers';
import getUsers from './actions/getUsers';
import PollModal from './components/modals/poll-modal/PollModal';
import Button from './components/button/Button';
import AuthButtons from './components/auth-buttons/AuthButtons';
import News from './components/news/News';
import UserMenu from './components/navbar/UserMenu';
import GroupsBox from './components/groups-box/GroupsBox';
import CreatePostTextarea from './components/create-post/create-post-textarea/CreatePostTextarea';
import NavigationPanel from './components/navigation-panel/NavigationPanel';

export const metadata = {
  title: 'Wagerly',
  description: 'Free social platform for sports fans and sports betters. ',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const currentUser = await getCurrentUser();
  // const users = await getUsers();

  const [currentUser] = await Promise.all([getCurrentUser()]);

  let groups: Group[] = [];
  let record: any;
  let notifications: any;
  if (currentUser) {
    [groups, record, notifications] = await Promise.all([
      getGroupsByUserId({ userId: currentUser.id }),
      getBetRecord({ userId: currentUser.id }),
      getNotificationByUserId({ userId: currentUser.id }),
    ]);
  }

  async function getNotifications() {
    'use server';
    const notifications = await prisma?.notification.findMany({
      where: {
        userId: currentUser?.id,
      },
    });
    return notifications;
  }


  return (
    <html lang='en'>
      <body>
        <div className='layout'>
          <ToasterProvider />
          <RegisterModal />
          <LoginModal />
          <BetModal />
          <EditProfileModal
            name={currentUser?.name}
            username={currentUser?.username}
            bio={currentUser?.bio as string}
            userPhoto={currentUser?.photo as string}
          />
          <CreateGroupModal />
          <PollModal />

          <div className='sidebarContainer'>
            {/* <input type='text' className='searchInput' placeholder='Search' /> */}
            <div className='currentUser'>
              {currentUser ? (
                <p>Signed in as {currentUser?.name}</p>
              ) : (
                <p>Sign in to get started</p>
              )}
            </div>
            {!currentUser && (
              <>
                <div className='message'>
                  <p>Login to follow profiles or groups, like and reply to posts. You can also view sports scores and news, post polls, post images, and post your sports bets.</p>
                </div>
                <div className='auth-buttons'>
                  <AuthButtons />
                </div>
              </>
            )}

            {currentUser && (
              <>
                {/* <div className='userBox'>
                  <UserBox currentUser={currentUser}
                    record={record}
                    groups={groups} />
                </div> */}
                <CreatePostTextarea
                  userId={currentUser?.id}
                />
                {/* <GroupsBox groups={groups} currentUser={currentUser} /> */}
                {/* <FollowUsers users={users} currentUserId={currentUser?.id} followingIds={currentUser?.followingIds} /> */}
              </>


            )}

            <div className='disclaimer'>
              <p>Sports data is provided by ESPN. To learn more about the api used, <a href="https://gist.github.com/akeaswaran/b48b02f1c94f873c6655e7129910fc3b" target='_blank'>click here.</a></p>
              <p>To see what technologies are used in Wagerly and how it was built, checkout our <a href="https://github.com/jDelille/fullstack-next-prisma" target='_blank'>github repo</a></p>
            </div>
          </div>

          <div className='gamebarContainer'>
            <Scoreboard />
          </div>

          <div className='mobileNavbarContainer'>
            <MobileNavbar currentUser={currentUser} groups={groups} />
          </div>

          <NavigationPanel currentUser={currentUser} />


          <ClientOnly>
            <div className='mainContainer'>{children}</div>
          </ClientOnly>

          <Footer currentUserId={currentUser?.id} />


          <div className='rightSidebar'>
            <div className='siteTitle'>
              <h1>Wagerly</h1>
            </div>
            <div className='navLinks'>
              <Navbar currentUser={currentUser}
                groups={groups}
                notifications={notifications} />
            </div>
            <div>
              {/* <News /> */}
            </div>

          </div>
        </div>
      </body>
    </html>
  );
}


{/* <Navbar
              currentUser={currentUser}
              groups={groups}
              notifications={notifications}
            /> */}

// {
//   currentUser && (
//     <>
//       <UserBox
//         currentUser={currentUser}
//         record={record}
//         groups={groups}
//       />
//       <FollowUsers users={users} currentUserId={currentUser?.id} followingIds={currentUser?.followingIds} />
//     </>
//   )
// }