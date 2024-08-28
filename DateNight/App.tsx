import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import DateNightSelection from 'src/onboarding/DateNightSelection'
import HomePage from 'src/homepage/homePage'
import AddressAndPrice from 'src/onboarding/AddressAndPrice'
import InterestSelection from 'src/onboarding/InterestSelection'
import SignUp from 'src/onboarding/SignUp'
import Review from 'src/onboarding/Review'

const Stack = createNativeStackNavigator()

export default function App() {
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
          name='SignUp'
          component={SignUp}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Review'
          component={Review}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
