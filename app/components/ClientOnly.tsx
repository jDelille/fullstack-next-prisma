'use client'
import { useState, useEffect, Suspense } from "react";
import styles from './ClientOnly.module.scss';
import CreatePostFormSkeleton from "./skeletons/create-post-form-skeleton/CreatePostFormSkeleton";
import PostCardSkeleton from "./skeletons/post-card-skeleton/PostCardSkeleton";

type ClientOnlyProps = {
 children: React.ReactNode
}

const ClientOnly: React.FC<ClientOnlyProps> = ({ children }) => {

 const [hasMounted, setHasMounted] = useState(false)

 useEffect(() => {
  setHasMounted(true)
 }, [])

 if (!hasMounted) {
  return <div className={styles.loadingContent}>
   <CreatePostFormSkeleton />
   <PostCardSkeleton />
   <PostCardSkeleton />
   <PostCardSkeleton />
   <PostCardSkeleton />
  </div>;
 }

 return (
  <Suspense fallback={<p>Loading...</p>}>
   {children}
  </Suspense>
 );
}

export default ClientOnly;