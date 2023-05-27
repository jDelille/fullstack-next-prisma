'use client';

import { useState } from 'react';
import PostCard from '../post-card/PostCard';
import styles from './PostFeed.module.scss';
import { SafeUser } from '@/app/types';
import { User } from '@prisma/client';
import PeopleBox from '../people-box/PeopleBox';
import News from '../news/News';

type PostFeedProps = {
 posts: any;
 currentUser: SafeUser | null;
 totalBets?: number;
 users: User[] | null;
 isProfilePage?: boolean;
 user?: SafeUser | null
};

const PostFeed: React.FC<PostFeedProps> = ({ posts, currentUser, users, isProfilePage, user }) => {
 const [tab, setTab] = useState('posts');

 return (
  <div className={styles.postFeed}>
   <div className={styles.feedToggle}>
    <p
     onClick={() => setTab('posts')}
     className={tab === 'posts' ? styles.activeTab : styles.tab}>
     Posts
    </p>

    <p
     onClick={() => setTab('bets')}
     className={tab === 'bets' ? styles.activeTab : styles.tab}>
     Bets
    </p>

    {isProfilePage && (
     <p
      onClick={() => setTab('media')}
      className={tab === 'media' ? styles.activeTab : styles.tab}>
      Media
     </p>
    )}

    {!isProfilePage && (
     <>
      <p
       onClick={() => setTab('people')}
       className={tab === 'people' ? styles.activeTab : styles.tab}>
       People
      </p>
      <p
       onClick={() => setTab('news')}
       className={tab === 'news' ? styles.activeTab : styles.tab}>
       News
      </p>
     </>
    )}

   </div>

   {tab === 'posts' &&
    posts.map((post: any) => (
     <PostCard post={post} key={post.id} currentUser={currentUser} />
    ))}

   {tab === 'bets' &&
    posts.map((post: any) => {
     if (user?.totalBets === 0) {
      return (
       <div key={user.id} className={styles.noBetsMessage}>{user?.name} has not made any bets yet</div>
      )
     }
     if (post?.Bet) {
      return (
       <PostCard post={post} key={post.id} currentUser={currentUser} />
      );
     }
    })}

   {tab === 'people' && (
    <div className={styles.peopleFeed}>
     {users?.map((user) => (
      <PeopleBox key={user?.id} user={user} />
     ))}
    </div>
   )}

   {tab === 'news' && (
    <div className={styles.newsFeed}>
     <News />
    </div>
   )}

   {tab === 'media' && (
    <div className={styles.noBetsMessage}>
     <p>Media feature coming soon</p>
    </div>
   )}
  </div>
 );
};

export default PostFeed;
