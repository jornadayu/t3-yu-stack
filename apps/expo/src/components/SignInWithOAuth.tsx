import React from 'react'
import { Button, View } from 'react-native'

import { useOAuth } from '@clerk/clerk-expo'

import { useWarmUpBrowser } from '../hooks/useWarmUpBrowser'

const SignInWithOAuth = () => {
  useWarmUpBrowser()

  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' })

  const handleSignInWithGooglePress = React.useCallback(async () => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const { createdSessionId, setActive } = await startOAuthFlow()
      if (createdSessionId) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        setActive({ session: createdSessionId })
      } else {
        // Modify this code to use signIn or signUp to set this missing requirements you set in your dashboard.
        throw new Error('There are unmet requirements, modifiy this else to handle them')
      }
    } catch (err) {
      console.log(JSON.stringify(err, null, 2))
      console.log('error signing in', err)
    }
  }, [startOAuthFlow])

  return (
    <View className="rounded-lg border-2 border-gray-500 p-4">
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <Button title="Sign in with Google" onPress={handleSignInWithGooglePress} />
    </View>
  )
}

export default SignInWithOAuth
