'use client';

import { useState } from 'react';
import PostCard from '../post-card/PostCard';
import styles from './PostFeed.module.scss';
import { SafeUser } from '@/app/types';
import { Post, User } from '@prisma/client';
import PeopleBox from '../people-box/PeopleBox';
import News from '../news/News';
import { PostFeedString } from '@/app/utils/app-string/PostFeedString';
import Image from 'next/image';

type PostFeedProps = {
  posts: any;
  currentUser: SafeUser | null;
  totalBets?: number;
  users: User[] | null;
  isProfilePage?: boolean;
  user?: SafeUser | null;
};

const PostFeed: React.FC<PostFeedProps> = ({
  posts,
  currentUser,
  users,
  isProfilePage,
  user,
}) => {
  const [tab, setTab] = useState('posts');

  const renderPostCards = () => {
    return posts.map((post: Post) => (
      <PostCard
        post={post}
        key={post.id}
        currentUser={currentUser}
        hideComment={false}
      />
    ));
  };

  const renderBets = () => {
    if (user?.totalBets === 0) {
      return (
        <div key={user.id} className={styles.noBetsMessage}>
          {user?.name} {PostFeedString.noBetsMessage}
        </div>
      );
    }

    return posts
      .filter((post: any) => post?.Bet || post?.Parlay)
      .map((post: Post) => (
        <PostCard
          post={post}
          key={post.id}
          currentUser={currentUser}
          hideComment={false}
        />
      ));
  };

  const renderPeople = () => {
    return (
      <div className={styles.peopleFeed}>
        {users?.map((user) => (
          <PeopleBox key={user?.id} user={user} />
        ))}
      </div>
    );
  };

  const renderNews = () => {
    return (
      <div className={styles.newsFeed}>
        <News />
      </div>
    );
  };

  const renderMedia = () => {
    const mediaPosts = [...posts.filter((post: any) => post.photo)];


    if (mediaPosts.length === 0) {
      return (
        <div className={styles.noBetsMessage}>
          <p>{PostFeedString.comingSoon}</p>
        </div>
      );
    }

    // return mediaPosts.map((post: any) => (
    //   <Image src={post.photo || post.photo.url} alt={post.id} key={post.id} width={100} height={100} />
    // ));
  };

  const renderTabContent = () => {
    switch (tab) {
      case 'posts':
        return renderPostCards();
      case 'bets':
        return renderBets();
      case 'people':
        return renderPeople();
      case 'news':
        return renderNews();
      case 'media':
        return renderMedia();
      default:
        return null;
    }
  };

  const renderTabs = () => {
    const tabs = [
      {
        key: 'posts',
        label: PostFeedString.posts,
        show: true,
      },
      {
        key: 'bets',
        label: PostFeedString.bets,
        show: true,
      },
      {
        key: 'people',
        label: PostFeedString.people,
        show: !isProfilePage,
      },
      {
        key: 'news',
        label: PostFeedString.news,
        show: !isProfilePage,
      },
      {
        key: 'media',
        label: PostFeedString.media,
        show: isProfilePage,
      },
    ];

    return tabs.map((tabItem) => {
      if (!tabItem.show) {
        return null;
      }

      const { key, label } = tabItem;

      return (
        <p
          key={key}
          onClick={() => setTab(key)}
          className={tab === key ? styles.activeTab : styles.tab}
        >
          {label}
        </p>
      );
    });
  };

  return (
    <div className={styles.postFeed}>
      <div className={styles.feedToggle}>{renderTabs()}</div>
      {renderTabContent()}
    </div>
  );
};

export default PostFeed;