import styles from './MobileMenu.module.css'
import Link from 'next/link';
import { useState } from 'react';

const MobileMenu = () => {
  const [isMenuClicked, setIsMenuClicked] = useState(false)

  const updateMenu = () => {
    setIsMenuClicked(!isMenuClicked)
  }

  const routes = [
    {
      title: 'Dashboard',
      route: '/',
      icon: 'M9.375 21.875H5.20833C4.0625 21.875 3.125 20.9375 3.125 19.7917V5.20833C3.125 4.0625 4.0625 3.125 5.20833 3.125H9.375C10.5208 3.125 11.4583 4.0625 11.4583 5.20833V19.7917C11.4583 20.9375 10.5208 21.875 9.375 21.875ZM15.625 21.875H19.7917C20.9375 21.875 21.875 20.9375 21.875 19.7917V14.5833C21.875 13.4375 20.9375 12.5 19.7917 12.5H15.625C14.4792 12.5 13.5417 13.4375 13.5417 14.5833V19.7917C13.5417 20.9375 14.4792 21.875 15.625 21.875ZM21.875 8.33333V5.20833C21.875 4.0625 20.9375 3.125 19.7917 3.125H15.625C14.4792 3.125 13.5417 4.0625 13.5417 5.20833V8.33333C13.5417 9.47917 14.4792 10.4167 15.625 10.4167H19.7917C20.9375 10.4167 21.875 9.47917 21.875 8.33333Z'
    },
    {
      title: 'Support',
      route: '/support',
      icon: 'M11.5002 2.08337C5.75641 2.08337 1.0835 6.75629 1.0835 12.5V16.8157C1.0835 17.8823 2.01787 18.75 3.16683 18.75H4.2085C4.48476 18.75 4.74971 18.6403 4.94507 18.4449C5.14042 18.2496 5.25016 17.9846 5.25016 17.7084V12.3511C5.25016 12.0748 5.14042 11.8099 4.94507 11.6145C4.74971 11.4192 4.48476 11.3094 4.2085 11.3094H3.26266C3.84183 7.27817 7.31058 4.16671 11.5002 4.16671C15.6897 4.16671 19.1585 7.27817 19.7377 11.3094H18.7918C18.5156 11.3094 18.2506 11.4192 18.0553 11.6145C17.8599 11.8099 17.7502 12.0748 17.7502 12.3511V18.75C17.7502 19.899 16.8158 20.8334 15.6668 20.8334H13.5835V19.7917H9.41683V22.9167H15.6668C17.9647 22.9167 19.8335 21.048 19.8335 18.75C20.9825 18.75 21.9168 17.8823 21.9168 16.8157V12.5C21.9168 6.75629 17.2439 2.08337 11.5002 2.08337Z'
    },
    {
      title: 'Notification',
      route: '/notification',
      icon: 'M12.4167 22.9167C11.7258 22.914 11.0641 22.694 10.5744 22.3041C10.0847 21.9143 9.80632 21.386 9.79949 20.8334H15.0078C15.0106 21.1119 14.9442 21.3881 14.8125 21.6459C14.6441 21.955 14.3863 22.2276 14.0603 22.4413C13.7343 22.6551 13.3495 22.8037 12.9375 22.875H12.8763C12.725 22.9002 12.5712 22.9142 12.4167 22.9167ZM22.8334 19.7917H2V17.7084L4.60417 16.6667V10.9375C4.53557 9.46787 4.95044 8.00955 5.8073 6.70837C6.22896 6.11178 6.80395 5.59349 7.49434 5.18769C8.18473 4.7819 8.97483 4.49782 9.81251 4.35421V2.08337H15.0208V4.35421C18.3789 4.99379 20.2292 7.33129 20.2292 10.9375V16.6667L22.8334 17.7084V19.7917Z'
    },
    {
      title: 'Add new topic',
      route: '/new-topic',
      icon: 'M13 2.34375C7.17603 2.34375 2.4375 6.90002 2.4375 12.5C2.4375 18.1 7.17603 22.6562 13 22.6562C18.824 22.6562 23.5625 18.1 23.5625 12.5C23.5625 6.90002 18.824 2.34375 13 2.34375ZM13 3.90625C17.9448 3.90625 21.9375 7.74536 21.9375 12.5C21.9375 17.2546 17.9448 21.0938 13 21.0938C8.05518 21.0938 4.0625 17.2546 4.0625 12.5C4.0625 7.74536 8.05518 3.90625 13 3.90625ZM12.1875 7.8125V11.7188H8.125V13.2812H12.1875V17.1875H13.8125V13.2812H17.875V11.7188H13.8125V7.8125H12.1875Z'
    }
  ]

  return (
    <div className={styles.wrapper}>
      <button className={styles.btn} onClick={() => updateMenu()}>
        <span className={isMenuClicked === false ? `${styles.bar} ${styles.unclicked}` : `${styles.bar} ${styles.clicked}`} />
        <span className={isMenuClicked === false ? `${styles.bar} ${styles.unclicked}` : `${styles.bar} ${styles.clicked}`} />
        <span className={isMenuClicked === false ? `${styles.bar} ${styles.unclicked}` : `${styles.bar} ${styles.clicked}`} />
      </button>
      <nav>
        <ul className={isMenuClicked === false ? `${styles.mobile_menu} ${styles.hidden}` : `${styles.mobile_menu}`}>
          {
            routes.map(({ title, icon, route }) => (
              <li key={Math.random()}>
                <Link href={route}>
                  <a className={styles.link} onClick={() => updateMenu()}>
                    <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d={icon} fill="#696F79"/>
                    </svg>
                    {title}
                  </a>
                </Link>
              </li>
            ))
          }
        </ul>
      </nav>
    </div>
  )
}

export default MobileMenu