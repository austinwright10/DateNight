import { useState, useEffect } from 'react'
import { Text, View, StyleSheet, Alert } from 'react-native'
import { OtpInput } from 'react-native-otp-entry'
import { supabase } from 'src/lib/supabase'
import { useNavigation } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native'

type OTPProps = {
  phoneNumber: string
  showModal: (isVisible: boolean) => void
  goNext: () => void
}

export default function OTP({ phoneNumber, showModal, goNext }: OTPProps) {
  const [otpCode, setOTPCode] = useState('')
  const navigation = useNavigation()

  useEffect(() => {
    if (otpCode.length === 6) {
      verifyOTP(otpCode)
    }
  }, [otpCode])

  function formatPhoneNumber(phoneNumber: string): string {
    const cleaned = ('' + phoneNumber).replace(/\D/g, '')
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
    if (match) {
      return `(${match[1]})-${match[2]}-${match[3]}`
    }
    return phoneNumber
  }

  async function verifyOTP(otp: string) {
    try {
      const { data, error } = await supabase.auth.verifyOtp({
        phone: formatPhoneNumber(phoneNumber),
        token: otp,
        type: 'sms',
      })

      if (error) throw error

      if (data.user) {
        goNext()
      }
    } catch (error: any) {
      console.error('Error during OTP verification:', error)
      Alert.alert('Verification Error', error.message)
      setOTPCode('')
    }
  }

  return (
    <View>
      <Text style={styles.text}>
        {formatPhoneNumber(phoneNumber)} is the number we have. If correct,
        press continue.
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
