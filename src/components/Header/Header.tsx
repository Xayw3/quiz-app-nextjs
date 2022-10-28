import styles from './Header.module.css'
import Image from 'next/image';
import MobileMenu from '../MobileMenu/MobileMenu';

const Header = () => {

  return (
    <header className={styles.header}>
      <span className={styles.logo}>
        quiz time
      </span>
      <MobileMenu />
      <div className={styles.wrapper}>
        <div className={styles.input_wrapper}>
          <input className={styles.search} type="text" placeholder='Search..' />
        </div>
        <button className={styles.btn}>
          start quiz
          </button>
        <div className={styles.account_details}>
          <Image src='/avatar.png' alt='avatar' width='70px' height='70px'/>
          <p className={styles.account_name}>
            Oluwatobi.
          </p>
        </div>
      </div>
    </header>
  )
}

export default Header;