import Image from "next/image"
import { FC } from "react"
import styles from './Questions.module.css'

type QuestionsProps = {
  questions: string[],
  title?: string,
  image: string,
  currentQuestion?: number,
  questionsLenght?: number,
  question?: string,
  stateChanger: (el: number) => void,
  yourAnswer?: number,
  notCorrect?: number,
  correctAnswer?: number,
  checked?: number

}

const Questions: FC<QuestionsProps> = ({ 
  questions, title, image, currentQuestion, questionsLenght, question, stateChanger, yourAnswer, correctAnswer, notCorrect, checked 
}) => {

  return (
    <>
      <h2 className={styles.title}>{title} Quiz</h2>
      <p className={styles.subtitle}>Read the following instructions</p>
      <div className={styles.question_container}>
        <div className={styles.image_wrapper} style={{backgroundImage: `url(${image})`}} />
        <div className={styles.question_wrapper}>
          <h4 className={styles.heading}>Question {currentQuestion}/{questionsLenght}</h4>
          <p className={styles.text}>{question}</p>
        </div>
      </div>
      <h4 className={styles.heading}>Choose answer</h4>
      <ul className={styles.questions}>
        {
          questions?.map((el, id) => (
            <li key={Math.random()}>
              <label className={styles.questions__label} htmlFor={el}>
                <input onChange={() => checked === id} checked={checked === id || yourAnswer === id + 1} onClick={() => {stateChanger(id)} } type="radio" name='question' id={el} value={el} />
                <p className={
                  yourAnswer === undefined ? `${styles.questions__text}` : correctAnswer === id + 1 ? `${styles.questions__text} ${styles.correct}` : `${styles.questions__text} ${styles.incorrect}`}>{el}</p>
                {
                  yourAnswer === correctAnswer 
                  ?
                  <div className={styles.details}>
                    <p className={`${correctAnswer === id + 1 ? `${styles.correct_answer}` : `${styles.incorrect_answer}` } `}>
                      {yourAnswer === id + 1 ? 'Your answer': ''}
                    </p>
                  </div>
                : 
                  <div className={styles.details}>
                    <p className={`${notCorrect ? `${styles.incorrect_answer}` : `${styles.correct_answer}` } `}>
                      {yourAnswer === id + 1 ? 'Your answer': ''}
                    </p>
                    <p className={`${correctAnswer ? `${styles.correct_answer}` : `${styles.incorrect_answer}` } `}>
                      {correctAnswer === id + 1 ? 'Correct Answer': ''}
                    </p>
                  </div>
                }
              </label>
            </li>
          ))
        }
      </ul>
    </>
  )
}

export default Questions