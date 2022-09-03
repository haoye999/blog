import Link from 'next/link';
import styles from './MyLayout.module.scss'

const Header = () => {
  return (
    <header className={styles.header}>
      <Link href='/'>
        <a><h1 className={styles.title}>Haoye Blog</h1></a>
      </Link>
    </header>
  );
};

export default Header;