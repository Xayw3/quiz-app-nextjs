import { Model, model, models, Schema } from "mongoose"

export type Answers = {
  firstAnswer: string,
  secondAnswer: string,
  thirdAnswer: string,
  fourthAnswer: string
}

export type QuestionProps = {
  question_description: string,
  answers?: string[],
  correct_answer: number,
  image?: string
}

export type TopicsProps = {
  _id?: string,
  category_key: string,
  title: string,
  date?: Date,
  image?: string,
  time_limit: string,
  attempts: number,
  points: number,
  questions?: QuestionProps[]
}

const QuestionSchema = new Schema<QuestionProps>({
  question_description: { required: true, type: String },
  answers: { required: true, type: [String] },
  correct_answer: { required: true, type: Number },
  image: { required: false, type: String }
})

const TopicsSchema = new Schema<TopicsProps>({
  category_key: { required: true, type: String },
  title: { required: true, type: String },
  date: { required: true, type: Date },
  image: { required: false, type: String },
  time_limit: { required: true, type: String },
  attempts: { required: true, type: Number },
  points: { required: true, type: Number },
  questions: [QuestionSchema]
})

const Topics: Model<TopicsProps> = models.Topics || model('Topics', TopicsSchema)

export default Topics