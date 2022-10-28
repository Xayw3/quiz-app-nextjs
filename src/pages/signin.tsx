import { useForm } from "react-hook-form"
import { signIn, useSession } from 'next-auth/react'
import { useEffect } from "react"
import { useRouter } from "next/router"
import LoginForm from "../components/LoginForm/LoginForm"

type form = {
  email: string,
  password: string
}

const SignIn = () => {
  const { register, handleSubmit } = useForm<form>()

  const router = useRouter();

  const { data: session } = useSession()

  const formSubmit = async(formData: form) => {
    signIn('credentials', { redirect: false, ...formData })
  }

  useEffect(() => {
    if (session?.user?.email) {
      router.replace('/')
    }
  }, [session, router])

  return (
    <LoginForm 
      onSubmit={handleSubmit(formSubmit)}
      link='/signup'
      linkText="Don't have account?"
      buttonText="Login"
      emailSender={register('email', { required: true })}
      passwordSender={register('password', { required: true })}
      title='Login to your Account'
      subtitle="with your registered Email Address"
      emailError=""
    />
  )
}

export default SignIn
