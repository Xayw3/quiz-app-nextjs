
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import DashboardWrapper from "../../components/DashboardWrapper/DashboardWrapper";
import Instructions from "../../components/Instructions/Instructions";
import Modal from "../../components/Modal/Modal";
import Questions from "../../components/Questions/Questions";
import { QuestionProps, TopicsProps } from "../../models/Topics";

const Topic: NextPage = () => {
  const [topic, setTopic] = useState<TopicsProps | any>()
  const [question, setQuestion] = useState(1)
  const [step, setStep] = useState(0)
  const [buttonText, setButtonText] = useState('Start')
  const [answer, setAnswer] = useState<number>(-1)
  const [yourAnswers, setYourAnswers] = useState<number[]>([])
  const [correctAnswers, setCorrectAnswers] = useState<number[]>([])

  const { query, } = useRouter()
  const router = useRouter()

  useEffect(() => {
    if (query.id) {
      fetch(`/api/topic?id=${query.id}`).then((res) => 
      res.json().then(({ topics }) => setTopic(topics)))
    }
  }, [query])

  const nextStep = () => {
    if (step === 0) {
      setStep(1)
      setButtonText('Next')
    } else if (step === 3 && buttonText === 'Finish') {
      router.replace('/categories')
    } else if (question === topic?.questions.length) {
      setQuestion(1)
      setStep(2)
      setButtonText('Next')
    } else if (question + 1 === topic?.questions.length && answer > -1) {
      setButtonText('Finish')
      setQuestion(question + 1)
      setAnswer(-1)
    } else if (step === 1 && answer > -1) {
      setQuestion(question + 1)
      setAnswer(-1)
    } else if (step === 3) {
      setQuestion(question + 1)
    }
  }

  const getAnswers = () => {
    if (step === 1 && answer >= 0) {
      setYourAnswers([...yourAnswers, answer + 1])
      if (answer + 1 === topic?.questions[question - 1].correct_answer) {
        setCorrectAnswers([...correctAnswers, answer + 1])
      }
    }
  }

  return (
    <DashboardWrapper>
      <>
        {step === 0 
          ? <Instructions 
            image={`/categories/${topic?.category_key}.png`}
            title={topic?.category_key} 
            date={topic?.date.toString().slice(0,10)} 
            time_limit={topic?.time_limit} 
            attempts={topic?.attempts} 
            points={topic?.points}
            questions_count={topic?.questions.length}
            />
          : null}
        {step === 1 
          ? <Questions 
            questions={topic ? topic.questions[question - 1]?.answers : []}
            title={topic?.category_key}
            image={topic?.questions[question - 1].image ? topic?.questions[question - 1].image : `/categories/${topic?.category_key}.png`}
            currentQuestion={question}
            questionsLenght={topic?.questions.length}
            question={topic?.questions[question - 1]?.question_description}
            stateChanger={setAnswer}
            checked={answer}
            /> 
          : null}
        {step === 2 
          ? <Modal 
            title={Math.ceil(yourAnswers.length / correctAnswers.length + 1) > correctAnswers.length ? 'Unfortunately you not passed' : 'Congratulations you have passed'} 
            buttonClick={() => setStep(3)}
            score={`${correctAnswers.length}/${yourAnswers.length}`} /> : null}
            
        {step === 3 
          ? <Questions 
            questions={topic ? topic.questions[question - 1].answers : []}
            title={topic?.category_key}
            image={`/categories/${topic?.category_key}.png`}
            currentQuestion={question}
            questionsLenght={topic?.questions.length}
            question={topic?.questions[question - 1]?.question_description}
            stateChanger={setAnswer}
            correctAnswer={topic?.questions[question - 1].correct_answer}
            yourAnswer={yourAnswers[question - 1]}
            notCorrect={yourAnswers[question - 1]}
            /> 
          : null}
        <button onClick={() => {nextStep(); getAnswers()}} className="topic-btn">{buttonText}</button>
      </>
    </DashboardWrapper>
  )
}

export default Topic