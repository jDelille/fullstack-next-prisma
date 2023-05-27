import { IconType } from "react-icons";
import styles from './NavigationPanel.module.scss';
import Link from 'next/link';

type NavLinkProps = {
 icon: IconType
 label: string;
 href: string;
}

const NavLink: React.FC<NavLinkProps> = ({ icon: Icon, label, href }) => {
 return (
  <Link className={styles.link} href={href} >
   <Icon size={20} color="#abadb1" />

  </Link>
 );
}

export default NavLink;