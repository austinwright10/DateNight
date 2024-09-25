import { Text, StyleSheet, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
export default function Paywall() {
  return (
    <View style={styles.container}>
      <View style={styles.paywallContainer}>
        <Text style={styles.header}>Start receiving your date nights!</Text>
        <View style={styles.subContainer}>
          <Icon name='heart' size={16} color='#ff6666' />
          <Text style={styles.subHeader}>
            Unlock weekly date night recommendations based on your preferences
          </Text>
        </View>
      </View>
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
  paywallContainer: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    padding: 20,
    width: '95%',
  },
  header: {
    fontSize: 22,
    textAlign: 'center',
    fontWeight: '500',
    color: 'black',
    marginBottom: 20,
  },
  subContainer: {
    width: '80%',
  },
  subHeader: {
    fontSize: 16,
    textAlign: 'center',
  },
})
