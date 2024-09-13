import { Text, View, StyleSheet } from 'react-native'
import { OtpInput } from 'react-native-otp-entry'

export default function OTP() {
  return (
    <View style={styles.container}>
      <Text>Enter the 6 digit code we sent to your number.</Text>
      <OtpInput numberOfDigits={6} onTextChange={(text) => console.log(text)} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
