import '@fontsource/roboto/400.css'
import 'react-toastify/dist/ReactToastify.css'
import '~/styles/globals.css'

import type { AppType } from 'next/app'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import { ClerkProvider } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import { ToastContainer } from 'react-toastify'

import AuthShowcase from '~/components/auth/AuthShowcase'
import { api } from '~/utils/api'

const App: AppType = ({ Component, pageProps: { ...pageProps } }) => {
  return (
    <ClerkProvider
      {...pageProps}
      appearance={{
        baseTheme: dark,
      }}
    >
      <ToastContainer theme="colored" position="bottom-right" />

      <div className="min-h-screen bg-slate-900 text-slate-200">
        <nav className="bg-slate-800 ">
          <div className="black flex flex-row items-center justify-between p-2 shadow-lg">
            <Link href="https://github.com/jornadayu" target="_blank" rel="noreferrer">
              <Image alt="yu logo" src="/favicon.png" width={50} height={50} />
            </Link>
            <AuthShowcase />
          </div>
        </nav>

        <div className="container mx-auto max-w-xl ">
          <div className="mt-4 flex flex-col items-center justify-center">
            <Head>
              <title>T3 Yu Template</title>
              <meta name="description" content="Generated by t3-yu-stack" />
              <link rel="icon" href="public/favicon.ico" />
            </Head>

            <Component {...pageProps} />
          </div>
        </div>
      </div>
    </ClerkProvider>
  )
}

export default api.withTRPC(App)
