import styles from './DashboardWrapper.module.css'

type DashboardWrapperProps = {
  children: JSX.Element
}

const DashboardWrapper = ({children}: DashboardWrapperProps) => (
  <div className={styles.container}>
    <div className={styles.wrapper}>
      {children}
    </div>
  </div>
)

export default DashboardWrapper