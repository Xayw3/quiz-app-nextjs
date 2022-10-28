import axios from "axios";
import { NextPage } from "next";
import CategoryCard from "../../components/CategoryCard/CategoryCard";
import DashboardWrapper from "../../components/DashboardWrapper/DashboardWrapper"
import { CategoryProps } from "../../models/Category";
import { InitialCategories } from "../new-topic";
import styles from './Categories.module.css'

type TopicProps = {
  initialCategories: InitialCategories
}

const baseUrl = process.env.BASE_URL

const Topic:NextPage<TopicProps> = ({initialCategories}) => {
  const data: CategoryProps[] = initialCategories.data

  return (
    <DashboardWrapper>
      <>
        <h2>Select Category</h2>
        <div className={styles.wrapper}>
          {
            data ? data.map(({ title, image }) => (
              <CategoryCard key={Math.random()} link={`/categories/${title}`} title={title} image={image}/>
            )) : <></>
          }
        </div>
      </>
    </DashboardWrapper>
  )
}

export const getServerSideProps = async () => {
  const { data } = await axios.get(`${baseUrl}/api/category`)

  return {
    props: {
      initialCategories: data,
    },
  };
};

export default Topic