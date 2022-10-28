import styles from './Achievments.module.css'
import DashboardHeader from '../DashboardHeader/DashboardHeader'
import ProgressBar from '../ProgressBar/ProgressBar'
import Image from 'next/image'
import Link from 'next/link'

const Achievments = () => {
  const achievments = [
    {
      title: 'Comeback',
      image: '/achievments/comeback.png'
    },
    {
      title: 'Winner',
      image: '/achievments/winner.png'
    },
    {
      title: 'Lucky',
      image: '/achievments/lucky.png'
    },
  ]

  return (
    <div className={styles.achievments}>
      <DashboardHeader title='Achievments' element={<ProgressBar width='160px' done='50%' />} />
      <div className={styles.wrapper}>
        <ul className={styles.achievments_list}>
          {
            achievments.map(({ title, image }) => (
              <li className={styles.achievments_item} key={Math.random()}>
                <Image src={image} alt={title} width='100px' height='100px' />
                <p>{title}</p>
              </li>
            ))
          }
        </ul>
        <Link href='/'>
          <a className={styles.link}>
            View All
          </a>
        </Link>
      </div>
    </div>
  )
}

export default Achievments