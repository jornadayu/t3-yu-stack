import { type NextPage } from 'next'

import { SignIn } from '@clerk/nextjs'

const SignInPage: NextPage = () => (
  <main className="flex h-96 items-end">
    <SignIn
      appearance={{ variables: { colorBackground: 'transparent' } }}
      path="/sign-in"
      routing="path"
      signUpUrl="/sign-up"
    />
  </main>
)

export default SignInPage
