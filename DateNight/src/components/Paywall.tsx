import { Text, StyleSheet, View } from 'react-native'
export default function Paywall() {
  return (
    <View style={styles.container}>
      <View style={styles.paywallContainer}>
        <Text>hi</Text>
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
    borderRadius: 10,
    padding: 20,
  },
})
