import axios from "axios"
import { NextPage } from "next"
import { useState } from "react"
import DashboardWrapper from "../../components/DashboardWrapper/DashboardWrapper"
import { CategoryProps } from "../../models/Category"
import { QuestionProps, TopicsProps } from "../../models/Topics"
import { useForm } from "react-hook-form";
import dbConnect from "../../lib/dbConnect"
import styles from './NewTopic.module.css'

export type InitialCategories = {
  res: string,
  data: CategoryProps[]
}

type NewTopicProps = {
  initialCategories: InitialCategories,
  categoryKey: string,
  topics: TopicsProps[]
}

const baseUrl = process.env.BASE_URL

const NewTopic: NextPage<NewTopicProps> = ({ initialCategories }) => {
  const [step, setStep] = useState(-1)
  const [questions, setQuestions] = useState<any>([])
  const [count, setCount] = useState(0)

  const [topics, setTopics] = useState<TopicsProps | any>({
    title: '',
    image: '',
    time_limit: '',
    attempts: '',
    points: '',
    category_key: ''
  })

  const optionValues: string[] = []
  initialCategories.data.map((el: CategoryProps) => optionValues.push(el.title))

  const { register, handleSubmit } = useForm<TopicsProps>({
    defaultValues: {
      title: "",
      category_key: "",
      date: new Date(),
      image: '',
      points: 100,
      time_limit: "",
      attempts: 3,
      questions: [
        {
          image:'',
          question_description:"",
          answers: [""],
          correct_answer: 0,
        },
      ],
    },
  });

  const onSubmit = async (data: TopicsProps) => {
    const topics = await fetch('/api/topic', {
      method: 'POST',
      body: JSON.stringify(data)
    }).then((res) => res.json())
  }

  const addQuestion = () => {
    if (topics.category_key === '' || topics.title === '' || topics.time_limit === '' || topics.attempts === 0 || topics.points === 0) {
      setStep(step)
    } else {
      setQuestions([...questions, count])
      setCount(count + 1)
      setStep(step + 1)
    }
  }

  return (
    <DashboardWrapper>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          {
            step === -1 
            ?
            <>
              <h2>Category</h2>
              <div className={styles.wrapper}>
                <label htmlFor="">
                  <p>Category</p>
                  <select className={`${styles.input} ${styles.select}`} {...register("category_key")} value={topics.category_key} onChange={(el) => setTopics({...topics, category_key: el.target.value})}>
                    {
                      optionValues.map((value) => (
                        <option key={value}>{value}</option>
                      ))
                    }
                  </select>
                </label>
                <label htmlFor="title">
                  <p>Topic title</p>
                  <input id="title" className={styles.input} 
                  {...register("title")} 
                  onChange={(el) => setTopics({...topics, title: el.target.value})} value={topics.title} type="text" />
                </label>
                <label htmlFor="mainImage">
                  <p>Image *optional</p>
                  <input id="mainImage" className={styles.input} 
                  {...register("image")} 
                  onChange={(el) => setTopics({...topics, image: el.target.value})} type="text" />
                </label>
                <label htmlFor="time">
                  <p>Time limit</p>
                  <input id="time" className={styles.input} 
                  {...register("time_limit")} 
                  onChange={(el) => setTopics({...topics, time_limit: el.target.value})} value={topics.time_limit} type="text" />
                </label>
                <label htmlFor="attempts">
                  <p>Attempts</p>
                  <input id="attempts" className={styles.input} 
                  {...register("attempts")} 
                  onChange={(el) => setTopics({...topics, attempts: Number(el.target.value)})} value={topics.attempts} type="number" />
                </label>
                <label htmlFor="points">
                  <p>Points</p>
                  <input id="points" className={styles.input} 
                  {...register("points")} 
                  onChange={(el) => setTopics({...topics, points: Number(el.target.value)})} value={topics.points} type="number" />
                </label>
              </div>
            </>
            :
            <>
              <h2>Questions</h2>
              <div>
                {
                  questions.map((el: number) => {
                    const fieldName = `questions[${el}]`
                    return (
                      step === el 
                      ?
                      <fieldset className={styles.wrapper} name={fieldName} key={Math.random()}>
                        <h3>{`Question: ${el + 1}`}</h3>
                        <label htmlFor="questionImage">
                          <p>Question image *optional</p>
                          <input id="questionImage" className={styles.input} {...register(`questions.${el}.image`)} type="text" />
                        </label>
                        <label htmlFor="question">
                          <p>Question</p>
                          <textarea id="question" className={`${styles.input} ${styles.question}`} {...register(`questions.${el}.question_description`)} />
                        </label>
                        <div className={styles.answers}>
                          <label htmlFor="answer-1">
                            <p>Answer 1</p>
                            <input id="answer-1" className={styles.input} {...register(`questions.${el}.answers.${0}`)} type="text" />
                          </label>
                          <label htmlFor="answer-2">
                            <p>Answer 2</p>
                            <input id="answer-2" className={styles.input} {...register(`questions.${el}.answers.${1}`)} type="text" />
                          </label>
                          <label htmlFor="answer-3">
                            <p>Answer 3</p>
                            <input id="answer-3" className={styles.input} {...register(`questions.${el}.answers.${2}`)} type="text" />
                          </label>
                          <label htmlFor="answer-4">
                            <p>Answer 4</p>
                            <input id="answer-4" className={styles.input} {...register(`questions.${el}.answers.${3}`)} type="text" />
                          </label>
                          <label htmlFor="correct">
                            <p>Correct answer by number</p>
                            <input id="correct" className={styles.input} {...register(`questions.${el}.correct_answer`)} type="text" />
                          </label>
                        </div>
                      </fieldset>
                      : null
                    )
                  })
                }
              </div>
            </>
          }
          <div className={styles.btn_wrapper}>
            <button className={styles.btn} onClick={addQuestion} type="button">Add question</button>
            {
              step > 4 ? <button className={styles.btn} type="submit">Submit</button> : null
            }
          </div>
        </form>
      </div>
    </DashboardWrapper>
  )
}
export const getServerSideProps = async () => {
  await dbConnect()

  const { data } = await axios.get(`${baseUrl}/api/category`)

  return {
    props: {
      initialCategories: data,
    },
  };
};

export default NewTopic