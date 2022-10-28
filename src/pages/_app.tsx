import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Header from '../components/Header/Header'
import Sidebar from '../components/Sidebar/Sidebar'
import { SessionProvider, useSession } from "next-auth/react";
import { Session } from 'next-auth'
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const Auth = ({ children }: any) => {
  const router = useRouter()

  const { data: session } = useSession()

  useEffect(() => {
    if (session !== undefined) {
      if (!session && router.route !== '/signup') {
        router.replace('/signin')
      }
    }
  }, [session, router])

  return children
}

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps<{ session: Session }>) {
  const router = useRouter()

  return (
    <SessionProvider session={session}>
      <Auth>
        {
          router.route === '/signin' || router.route === '/signup'
          ?   
            <>
              <Component {...pageProps} />
            </> 
          :
            <>
              <Header />
              <div className='d-flex'>
                <Sidebar />
                <Component {...pageProps} />
              </div>
            </>
        }
      </Auth>
    </SessionProvider>
  )
}

export default MyApp
