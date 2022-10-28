import styles from './Modal.module.css'
import Image from "next/image"
import { FC } from 'react'

type ModalProps = {
  score: string,
  title: string,
  buttonClick: () => void
}

const Modal: FC<ModalProps> = ({ score, title, buttonClick }) => (
  <div className={styles.wrapper}>
    <div className={styles.modal}>
      <Image src='/achievments/lucky.png' width='100px' height='100px' alt='achievment'></Image>
      <p>{title}</p>
      <p>You scored {score}</p>
      <button onClick={buttonClick}>Review Quiz</button>
    </div>
  </div>
)

export default Modal