import Image from 'next/image'
import ProgressBar from '../ProgressBar/ProgressBar'
import styles from './AccountInfo.module.css'

const AccountInfo = () => {
  const progressDone = '70%'

  const progress = [
    {
      title: '27',
      desc: 'Quiz Passed',
      icon: '/svg/flag.svg'
    },
    {
      title: '27min',
      desc: 'Fastest Time',
      icon: '/svg/time.svg'
    },
    {
      title: '200',
      desc: 'Correct Answers',
      icon: '/svg/check.svg'
    },
  ]

  return (
    <div className={styles.wrapper}>
      <div className={styles.image} style={{backgroundImage: `url("/account-image.png")`}} />
      <div>
        <h2 className={styles.title}>Oluwatobi Olowu</h2>
        <p className={styles.desc}>Bonus booster 24lv</p>
        <ProgressBar width='100%' done={progressDone}/>
        <ul className={styles.progress_wrapper}>
          {
            progress.map(({ title, desc, icon }) => (
              <li className={styles.progres_item} key={title}>
                <div className={styles.icon}>
                  <Image src={icon} width='38px' height='38px' alt={desc} />
                </div>
                <div>
                  <h3 className={styles.progress_title}>{title}</h3>
                  <p className={styles.progress_desc}>{desc}</p>
                </div>
              </li>
            ))
          }
        </ul>
      </div>
    </div>
  )
}

export default AccountInfo