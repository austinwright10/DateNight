import { useState } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { OtpInput } from 'react-native-otp-entry'
import { supabase } from 'src/lib/supabase'

export default function OTP() {
  const [otpCode, setOTPCode] = useState('')

  // function handleSubmit() {
  //   const { error } = await supabase.from('users').insert({
  //     first_name: firstName,
  //     last_name: lastName,
  //     phone_number: phoneNumber,
  //     location: location,
  //   })
  // }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Enter the 6 digit code we sent to your number.
      </Text>
      <OtpInput
        numberOfDigits={6}
        onTextChange={(text: string) => setOTPCode(text)}
        theme={{
          pinCodeContainerStyle: styles.pinCodeContainer,
          focusedPinCodeContainerStyle: styles.focusedPinCodeContainer,
        }}
        focusColor={'black'}
      />
      <TouchableOpacity style={styles.submitButton}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffcccc',
  },
  text: { marginBottom: 30, fontSize: 18 },
  pinCodeContainer: { borderWidth: 1, borderColor: 'black' },
  focusedPinCodeContainer: { borderColor: 'black', borderWidth: 2 },
  submitButton: {
    backgroundColor: '#ff6666',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 40,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
})
