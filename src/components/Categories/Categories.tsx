import Link from 'next/link'
import { FC } from 'react'
import DashboardHeader from '../DashboardHeader/DashboardHeader'
import styles from './Categories.module.css'

type categoriesProps = {
  item: JSX.Element,
}

const Categories:FC<categoriesProps> = ({ item }) => (
  <div className={styles.wrapper}>
    <DashboardHeader title='Featured Category' element={
      <Link href='/categories'>
        <a>View All</a>
      </Link>
    } />
    <div className={styles.categories}>
      {item}
    </div>
  </div>
)

export default Categories