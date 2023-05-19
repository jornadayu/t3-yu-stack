import React from 'react'
import { Text } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import Constants from 'expo-constants'
import { StatusBar } from 'expo-status-bar'

import { ClerkProvider, SignedIn, SignedOut } from '@clerk/clerk-expo'

import HomeScreen from './screens/HomeScreen'
import { SignInSignUpScreen } from './screens/SignInSignUpScreen'
import { tokenCache } from './utils/cache'
import { TRPCProvider } from './utils/trpc'

export const App = () => {
  return (
    <ClerkProvider
      publishableKey={Constants.expoConfig?.extra?.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
      tokenCache={tokenCache}
    >
      <SignedIn>
        <TRPCProvider>
          <SafeAreaProvider>
            <HomeScreen />
            <StatusBar />
          </SafeAreaProvider>
        </TRPCProvider>
      </SignedIn>
      <SignedOut>
        <SignInSignUpScreen />
      </SignedOut>
    </ClerkProvider>
  )
}
