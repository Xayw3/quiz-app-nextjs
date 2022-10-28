import styles from './DashboardHeader.module.css'
import { FC } from 'react'

type DashboardHeaderProps = {
  title: string,
  element: JSX.Element
}

const DashboardHeader:FC<DashboardHeaderProps> = ({ title, element }) => (
  <div className={styles.wrapper}>
    <h3 className={styles.title}>{title}</h3>
    {element}
  </div>
)

export default DashboardHeader