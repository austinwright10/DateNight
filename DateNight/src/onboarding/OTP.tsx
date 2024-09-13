import { Text } from 'react-native'
import { OtpInput } from 'react-native-otp-entry'

export default function OTP() {
  return (
    <OtpInput numberOfDigits={6} onTextChange={(text) => console.log(text)} />
  )
}
