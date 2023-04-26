'use client'
import { useState, useEffect, Suspense } from "react";
import Loading from "./loading/Loading";

type ClientOnlyProps = {
 children: React.ReactNode
}

const ClientOnly: React.FC<ClientOnlyProps> = ({ children }) => {

 const [hasMounted, setHasMounted] = useState(false)

 useEffect(() => {
  setHasMounted(true)
 }, [])

 if (!hasMounted) {
  return null;
 }

 return (
  <Suspense fallback={<Loading />}>
   {children}
  </Suspense>
 );
}

export default ClientOnly;