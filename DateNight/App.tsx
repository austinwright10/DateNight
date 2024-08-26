import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import DateNightSelection from 'src/onboarding/DateNightSelection'
import HomePageScreen from 'src/homepage/homePage'
import AddressAndPrice from 'src/onboarding/AddressAndPrice'
import InterestSelection from 'src/onboarding/InterestSelection'

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='homepage'>
        <Stack.Screen
          name='homepage'
          component={HomePageScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='day'
          component={DateNightSelection}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='addressAndPrice'
          component={AddressAndPrice}
          //options={{ headerShown: false }}
        />
        <Stack.Screen
          name='InterestSelection'
          component={InterestSelection}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
