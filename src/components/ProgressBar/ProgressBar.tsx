import { FC } from 'react'
import styles from './ProgressBar.module.css'

type ProgressBarProps = {
  width: string,
  done: string
}

const ProgressBar: FC<ProgressBarProps> = ({ width, done }) => {
  return (
    <div className={styles.progress_bar} style={{width: width}}>
      <div className={styles.progress_done} style={{width: done}} />
    </div>
  )
}

export default ProgressBar