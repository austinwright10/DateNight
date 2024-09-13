import { Text, View, StyleSheet } from 'react-native'
import { OtpInput } from 'react-native-otp-entry'

export default function OTP() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Enter the 6 digit code we sent to your number.
      </Text>
      <OtpInput
        numberOfDigits={6}
        onTextChange={(text) => console.log(text)}
        theme={{ pinCodeContainerStyle: styles.pinCodeContainer }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffcccc',
  },
  text: { marginBottom: 30, fontSize: 18 },
  pinCodeContainer: { borderWidth: 1, borderColor: 'black' },
})
