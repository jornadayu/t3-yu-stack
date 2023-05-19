import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import SignOut from '~/components/SignOut'

const HomeScreen = () => {
  return (
    <SafeAreaView>
      <View className="h-full w-full p-4">
        <Text>Logado</Text>
        <SignOut />
      </View>
    </SafeAreaView>
  )
}

export default HomeScreen
