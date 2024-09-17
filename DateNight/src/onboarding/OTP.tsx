import { useState } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { OtpInput } from 'react-native-otp-entry'
import { supabase } from 'src/lib/supabase'
import { useNavigation } from '@react-navigation/native'

type OTPProps = {
  phoneNumber: string
  showModal: (isVisible: boolean) => void
  firstName: string
  lastName: string
  location: string
  goNext: () => void
}

export default function OTP({
  phoneNumber,
  showModal,
  firstName,
  lastName,
  location,
  goNext,
}: OTPProps) {
  const [otpCode, setOTPCode] = useState('')
  const navigation = useNavigation()

  function formatPhoneNumber(phoneNumber: string): string {
    const cleaned = ('' + phoneNumber).replace(/\D/g, '')
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
    if (match) {
      return `(${match[1]})-${match[2]}-${match[3]}`
    }
    return phoneNumber
  }

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
        {formatPhoneNumber(phoneNumber)} is the number we have. If correct,
        please continue.
      </Text>
      {/* <OtpInput
        numberOfDigits={6}
        onTextChange={(text: string) => setOTPCode(text)}
        theme={{
          pinCodeContainerStyle: styles.pinCodeContainer,
          focusedPinCodeContainerStyle: styles.focusedPinCodeContainer,
        }}
        focusColor={'black'}
      /> */}
      <TouchableOpacity style={styles.submitButton} onPress={goNext}>
        <Text style={styles.submitButtonText}>Continue</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => showModal(false)}
      >
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  text: { marginBottom: 10, fontSize: 18, textAlign: 'center' },
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
