import type { NextPage } from 'next'
import DashboardWrapper from '../components/DashboardWrapper/DashboardWrapper'
import AccountInfo from '../components/AccountInfo/AccountInfo'
import Categories from '../components/Categories/Categories'
import { CategoryProps } from '../models/Category'
import axios from 'axios'
import Achievments from '../components/Achievments/Achievments'
import CategoryCard from '../components/CategoryCard/CategoryCard'

type HomeProps = {
  initialCategories: any
}

const baseUrl = process.env.BASE_URL

const Home: NextPage<HomeProps> = ({initialCategories}) => {
  const data: CategoryProps[] = initialCategories.data.slice(0, 4)
  
  return (
    <DashboardWrapper>
      <>
        <AccountInfo />
        <div className='dashboard-wrapper'>
          <Achievments />
          <Categories item={
            <>
              {
                data ? data.map(({ title, image }) => (
                  <CategoryCard link={`/categories/${title}`} key={Math.random()} title={title} image={image}/>
                )) : <></>
              }
            </>
          }
           />
        </div>
      </>
    </DashboardWrapper>
  )
}

export const getServerSideProps = async () => {
  const { data } = await axios.get(`${baseUrl}/api/category?limit=4`)

  return {
    props: {
      initialCategories: data,
    },
  };
};

export default Home
