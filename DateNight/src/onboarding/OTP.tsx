import { useState } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { OtpInput } from 'react-native-otp-entry'
import { supabase } from 'src/lib/supabase'

type OTPProps = {
  phoneNumber: string
  showModal: (isVisible: boolean) => void
}

export default function OTP({ phoneNumber, showModal }: OTPProps) {
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
    <View>
      <Text style={styles.text}>
        Enter the 6 digit code we sent to {phoneNumber}.
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
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => showModal(false)}
      >
        <Text style={styles.backButtonText}>Back to Sign up</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  text: { marginBottom: 30, fontSize: 18, textAlign: 'center' },
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
  backButton: {
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 30,
  },
  backButtonText: {
    color: 'black',
    fontSize: 13,
    fontWeight: '300',
  },
})
