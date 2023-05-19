import Link from 'next/link'

import { UserButton, useAuth } from '@clerk/nextjs'

const AuthShowcase: React.FC = () => {
  const { isSignedIn } = useAuth()

  return (
    <>
      {isSignedIn && (
        <div className="flex flex-row items-center gap-2">
          <strong className="text-white">click here ➜</strong>
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {
                userButtonAvatarBox: {
                  width: '3rem',
                  height: '3rem',
                },
              },
            }}
          />
        </div>
      )}
      {!isSignedIn && (
        <Link
          href="/sign-in"
          className="animate-rainbow rounded-lg bg-gray-800 px-5 py-2.5 text-sm font-medium text-slate-900 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
        >
          Sign In
        </Link>
      )}
    </>
  )
}

export default AuthShowcase
