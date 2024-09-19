import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

export default function HomePage({ navigation }: any) {
  return (
    <View style={styles.container}>
      <View style={styles.headerView}>
        <Text style={styles.header}>DateNight</Text>
        <Text style={styles.subheader}>
          Inspiring Date Ideas at Your Fingertips
        </Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate('DateNightSelection')
        }}
      >
        <Text style={styles.buttonText}>Start</Text>
      </TouchableOpacity>
      <StatusBar style='auto' />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffcccc',
  },
  headerView: {
    marginBottom: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: '500',
    color: 'black',
    marginBottom: 10,
  },
  subheader: {
    fontSize: 20,
    color: 'grey',
  },
  button: {
    backgroundColor: '#ff6666',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    width: 75,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
})
