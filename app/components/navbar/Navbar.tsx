'use client'
import { SafeUser } from "@/app/types";
import Button from "../button/Button";
import UserMenu from "./UserMenu";

type NavbarProps = {
 currentUser?: SafeUser | null
}

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
 return (
  <div>
   <div>
    Logo
   </div>
   <UserMenu currentUser={currentUser} />
  </div>
 );
}

export default Navbar;