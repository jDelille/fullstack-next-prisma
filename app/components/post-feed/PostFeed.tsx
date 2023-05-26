'use client';

import { useState } from 'react';
import PostCard from '../post-card/PostCard';
import styles from './PostFeed.module.scss';
import { SafeUser } from '@/app/types';
import { User } from '@prisma/client';
import PeopleBox from '../people-box/PeopleBox';

type PostFeedProps = {
 posts: any;
 currentUser: SafeUser | null;
 totalBets?: number;
 users: User[] | null;
};

const PostFeed: React.FC<PostFeedProps> = ({ posts, currentUser, users }) => {
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
   </div>

   {tab === 'posts' &&
    posts.map((post: any) => (
     <PostCard post={post} key={post.id} currentUser={currentUser} />
    ))}

   {tab === 'bets' &&
    posts.map((post: any) => {
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
  </div>
 );
};

export default PostFeed;
