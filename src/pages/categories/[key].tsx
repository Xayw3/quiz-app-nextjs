import { NextPage } from "next"
import { TopicsProps } from "../../models/Topics"
import { GetServerSidePropsContext } from "next"
import { useForm } from "react-hook-form"
import CategoryCard from "../../components/CategoryCard/CategoryCard"
import DashboardWrapper from "../../components/DashboardWrapper/DashboardWrapper"
import styles from './Categories.module.css'

export type Props ={
  categoryKey: string,
  topics: TopicsProps[]
}

const baseUrl = process.env.BASE_URL

const Category: NextPage<Props> = ({ categoryKey, topics }) => {
  return (
    <DashboardWrapper>
      <>
        <h2>Select Topic</h2>
        <p>Featured category: {categoryKey}</p>
        <div className={styles.wrapper}>
          {
            topics.length ? topics.map((el) => (
              <CategoryCard key={Math.random()} title={el.title} link={`/topics/${el._id}`} image={`url(${el.image})`} />
            )) : <></>
          }
        </div>
      </>
    </DashboardWrapper>
  )
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const { query } = context

  const { topics } = await fetch(`${baseUrl}/api/topic/${query.key}`)
  .then((res) => res.json())

  return {
    props: {
      categoryKey: query.key,
      topics: JSON.parse(JSON.stringify(topics))
    }
  }
}

export default Category