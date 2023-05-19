import { useEffect, useState } from 'react'

import type { NextPage } from 'next'

const Home: NextPage = () => {
  const [host, setHost] = useState('')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setHost(window.location.host)
    }
  }, [])

  return (
    <main className="flex h-96 flex-col items-center justify-center">
      <p>
        This route{' '}
        <a href="/" className="font-medium text-blue-600 hover:underline dark:text-blue-500">
          {host}/
        </a>{' '}
        is public
      </p>

      <p>
        Try to access this{' '}
        <a className="font-medium text-blue-600 hover:underline dark:text-blue-500" href="/tasks">
          {host}/tasks
        </a>{' '}
        private route
      </p>
    </main>
  )
}

export default Home
