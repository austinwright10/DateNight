import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import DateNightSelection from 'src/onboarding/DateNightSelection'
import HomePage from 'src/homepage/homePage'
import AddressAndPrice from 'src/onboarding/AddressAndPrice'
import InterestSelection from 'src/onboarding/InterestSelection'
import SignUp from 'src/onboarding/SignUp'
import Review from 'src/onboarding/Review'
import Purchases from 'react-native-purchases'
import { Platform } from 'react-native'
import { useEffect } from 'react'
import Paywall from 'src/components/Paywall'
import Dashboard from 'src/dashboard/dashboard'
import Profile from 'src/profile/Profile'

const Stack = createNativeStackNavigator()

export default function App() {
  useEffect(() => {
    if (Platform.OS === 'ios') {
      Purchases.configure({ apiKey: process.env.REVENUE_CAT! })
    } else if (Platform.OS === 'android') {
      Purchases.configure({ apiKey: process.env.REVENUE_CAT! })
      Purchases.configure({ apiKey: process.env.REVENUE_CAT!, useAmazon: true })
    }
    Purchases.getOfferings().then(console.log)
  }, [])
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='HomePage'>
        <Stack.Screen
          name='HomePage'
          component={HomePage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='DateNightSelection'
          component={DateNightSelection}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='AddressAndPrice'
          component={AddressAndPrice}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='InterestSelection'
          component={InterestSelection}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Review'
          component={Review}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='SignUp'
          component={SignUp}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Paywall'
          component={Paywall}
          options={{
            headerShown: false,
            headerLeft: () => null,
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name='Dashboard'
          component={Dashboard}
          options={{
            headerShown: false,
            headerLeft: () => null,
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name='Profile'
          component={Profile}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
