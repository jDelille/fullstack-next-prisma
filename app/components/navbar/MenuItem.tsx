
import { useRouter } from 'next/navigation';
import styles from './Navbar.module.scss';
import { IconType } from 'react-icons';
import { usePathname } from 'next/navigation';

type MenuItemProps = {
 icon: IconType;
 label: string;
 href?: string

}

const MenuItem: React.FC<MenuItemProps> = ({ icon: Icon, label, href }) => {

 const router = useRouter();
 const pathname = usePathname()

 const linkStyle = pathname === href ? styles.activeLink : styles.Link

 return (
  <div onClick={() => router.push(href as string)} className={linkStyle} >
   <Icon size={18} />
   {label}
  </div >

 );
}

export default MenuItem;