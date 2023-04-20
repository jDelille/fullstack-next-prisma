import Button from "../button/Button";
import UserMenu from "./UserMenu";

type NavbarProps = {

}

const Navbar: React.FC<NavbarProps> = () => {
 return (
  <div>
   <div>
    Logo
   </div>
   <UserMenu />
  </div>
 );
}

export default Navbar;