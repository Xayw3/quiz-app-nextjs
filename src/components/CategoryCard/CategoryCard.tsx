import Link from "next/link"
import { FC, } from "react"
import styles from "./CategoryCard.module.css"



type categoryCardProps = {
  title: string,
  image?: string,
  link: string
}


const CategoryCard:FC<categoryCardProps> = ({ title, image,link }) => {
  
  return (
    <Link href={link}>
      <div className={styles.wrapper} style={{backgroundImage: image}}> 
        <p>{title}</p>
      </div>
    </Link>
    
  )
}



export default CategoryCard