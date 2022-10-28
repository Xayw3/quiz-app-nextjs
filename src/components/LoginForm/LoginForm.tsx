import Link from 'next/link'
import { FC } from 'react'
import styles from './LoginForm.module.css'

type LoginFormProps = {
  onSubmit: () => void,
  link: string,
  linkText: string,
  buttonText: string,
  emailSender: any,
  passwordSender: any,
  title: string,
  subtitle?: string
  emailError: string
}

const LoginForm:FC<LoginFormProps> = ({ 
  onSubmit, link, linkText, buttonText, emailSender, passwordSender, title, subtitle, emailError 
}) => {

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.subtitle}>{subtitle}</p>
      <form className={styles.form} onSubmit={onSubmit}>
        <label htmlFor="email-input">
          <p className={styles.label_text}>Email address*</p>
          <input className={styles.input} id='email-input' type="email" placeholder="Enter email address" 
            {...emailSender}
            />
            <p>{emailError}</p>
          
        </label>
        <label htmlFor="password-input">
          <p className={styles.label_text}>Enter password*</p>
          <input className={styles.input} id='password-input' type="password" placeholder="Password"
            {...passwordSender} />
        </label>
        <Link href={link}>
          <a className={styles.link}>{linkText}</a>
        </Link>
        <button className={styles.btn}>{buttonText}</button>
      </form>
    </div>
 ) 
}

export default LoginForm