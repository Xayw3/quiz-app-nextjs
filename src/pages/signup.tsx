import { NextPage } from "next"
import { useState } from "react"
import { useForm } from "react-hook-form"
import LoginForm from "../components/LoginForm/LoginForm"
import { UserProps } from "../models/User"

type form = {
  email: string,
  password: string
}

type users = {
  users: any
}

const baseUrl = process.env.BASE_URL

const SignUp: NextPage<users> = ({ users }) => {
  const { register, handleSubmit } = useForm<form>()
  const [errorMessage, setErrorMessage] = useState('')
  
  const emailData = users?.map((el: UserProps) => el.email)

  const formSubmit = (formData: form) => {
    const {email, password} = formData;

    if (emailData.includes(email)) {
      setErrorMessage('email already exist')
    } else {
      const res = fetch(`${baseUrl}/api/user`, {
      method: 'POST',
      body: JSON.stringify({email, password})
    }).then((res) => res.json()) 
    } 
  }


  return (
    <LoginForm 
      onSubmit={handleSubmit(formSubmit)}
      link='/signin'
      linkText="Already have an account"
      buttonText="Sign Up"
      emailSender={register('email', { required: true })}
      passwordSender={register('password', { required: true })}
      title='Registration'
      emailError={errorMessage}
    />
  )
}

export const getServerSideProps = async () => {
  const { data: users } = await fetch(`${baseUrl}/api/user`)
  .then((res) => res.json())

  return {
    props: {
      users
    }
  }
}


export default SignUp