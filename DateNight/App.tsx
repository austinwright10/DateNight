import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import Button from 'components/Button'
//import { NavigationContainer } from '@react-navigation/native'

export default function App() {
  return (
    // <NavigationContainer>
    <View style={styles.container}>
      <View style={styles.headerView}>
        <Text style={styles.header}>DateNight</Text>
        <Text>Date Ideas and Weekly Reminders</Text>
      </View>
      <Button
        title='Start Now'
        style={{ borderWidth: 1, borderColor: 'black' }}
        onPress={() => {
          console.log('hi')
        }}
      />
      <StatusBar style='auto' />
    </View>
    // </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: 'rgba(255, 0, 0, 0.3)',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  header: {
    fontSize: 30,
  },
  headerView: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '20%',
  },
})
