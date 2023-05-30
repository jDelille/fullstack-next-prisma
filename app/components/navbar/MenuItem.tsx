
import { usePathname } from 'next/navigation';
import styles from './Navbar.module.scss';
import { IconType } from 'react-icons';
import { signOut } from 'next-auth/react';
import Link from 'next/link';

type MenuItemProps = {
 icon: IconType;
 label: string;
 href?: string

}

const MenuItem: React.FC<MenuItemProps> = ({ icon: Icon, label, href }) => {

 const pathname = usePathname()

 const linkStyle = pathname === href ? styles.activeLink : styles.Link

 return (
  <Link href={href as string} className={linkStyle}>
   <Icon size={18} />
   {label}
   {label === 'Sportsbook' && (
    <div className={styles.betaTag}>Beta</div>
   )}
  </Link>
 );
}

export default MenuItem;