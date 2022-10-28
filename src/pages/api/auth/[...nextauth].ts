import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from 'next-auth/providers/credentials'
import { ResponseProps } from '../user/[email]';

const bcrypt = require('bcryptjs')

const baseUrl = process.env.BASE_URL

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      credentials: {
        password: {},
        email: {}
      },
      async authorize(credentials: any) {
        const { password, email } = credentials

        const { user }: ResponseProps = await fetch(`${baseUrl}/api/user/${email}`).then((res) => res.json())

        if (!user?.hash) {
          return null;
        }

        const isEqual = bcrypt.compareSync(password, user.hash)

        if (isEqual) {
          return { email: user.email, provider: "credentials" }
        }

        return null;
      },
    })
  ]
}

export default NextAuth(authOptions)