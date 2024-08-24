import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import DateNightSelection from 'src/onboarding/DateNightSelection'
import HomePageScreen from 'src/homepage/homePage'

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
      </Stack.Navigator>
    </NavigationContainer>
  )
}
