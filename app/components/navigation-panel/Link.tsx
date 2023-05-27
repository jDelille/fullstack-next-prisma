import { IconType } from "react-icons";
import styles from './NavigationPanel.module.scss';
import Link from 'next/link';
import { usePathname } from "next/navigation";

type NavLinkProps = {
 icon: IconType
 label: string;
 href: string;
}

const NavLink: React.FC<NavLinkProps> = ({ icon: Icon, label, href }) => {

 const pathname = usePathname()

 const linkStyle = pathname === href ? styles.activeLink : styles.link

 return (
  <Link className={linkStyle} href={href} >
   <Icon size={20} color="#abadb1" />

  </Link>
 );
}

export default NavLink;