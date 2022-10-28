import { FC } from 'react'
import styles from './Instructions.module.css'
import Image from 'next/image'

type InstructionsProps = {
  title?: string,
  image: string,
  date?: string,
  time_limit?: string,
  attempts?: number,
  points?: number,
  questions_count?: number,
}

const Instructions: FC<InstructionsProps> = ({
  title, image, date, time_limit, attempts, points, questions_count
}) => (
  <>
    <h2 className={styles.title}>{title} Quiz</h2>
    <p className={styles.subtitle}>Read the following instructions</p>
    <div className={styles.wrapper}>
      <div className={styles.image_wrapper} style={{backgroundImage: `url(${image})`}}>

      </div>
      <ul className={styles.list}>
        <li className={styles.list__item}>
          <h4 className={styles.list__title}>Date:</h4>
          <p>{date}</p>
        </li>
        <li className={styles.list__item}>
          <h4 className={styles.list__title}>Time Limit:</h4>
          <p>{time_limit} Mins</p>
        </li>
        <li className={styles.list__item}>
          <h4 className={styles.list__title}>Attempts:</h4>
          <p>{attempts}</p>
        </li>
        <li className={styles.list__item}>
          <h4 className={styles.list__title}>Points:</h4>
          <p>{points} Points</p>
        </li>
      </ul>
    </div>
    <h4 className={styles.instucrions}>Instructions</h4>
    <p className={styles.text}>
      This quiz consists of {questions_count} multiple-choice questions. To be successful with the quizzes, it’s important to conversant with the topics. Keep the following in mind:
    </p>
    <p className={styles.text}>
      Timing - You need to complete each of your attempts in one sitting, as you are allotted {time_limit} minutes to each attempt.
      Answers - You may review your answer-choices and compare them to the correct answers after your final attempt.
    </p>
    <p className={styles.text}>
      To start, click the Start button. When finished, click the Submit button.
    </p>
  </>
)

export default Instructions