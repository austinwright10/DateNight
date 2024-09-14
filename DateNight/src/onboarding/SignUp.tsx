import React, { useState } from 'react'
import { z } from 'zod'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native'
import * as Location from 'expo-location'

export default function SignUpScreen({ navigation }: any) {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [phoneError, setPhoneError] = useState(false)
  const [firstNameError, setFirstNameError] = useState(false)
  const [lastNameError, setLastNameError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const [confirmPasswordError, setConfirmPasswordError] = useState(false)
  const [location, setLocation] = useState('')
  const [locationError, setLocationError] = useState(false)
  const [isClicked, setIsClicked] = useState(false)

  const signUpSchema = z
    .object({
      firstName: z.string().min(2),
      lastName: z.string().min(2),
      location: z.string().min(2),
      phoneNumber: z.string().min(10),
      password: z.string().min(1),
      confirmPassword: z.string().min(1),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: 'passwords do not match',
      path: ['confirmPassword'],
    })

  function resetErrors() {
    setPhoneError(false)
    setFirstNameError(false)
    setLastNameError(false)
    setConfirmPasswordError(false)
    setPasswordError(false)
    setLocationError(false)
  }
  const locationRegex = /^([A-Za-z\s]+),\s*([A-Z]{2})$/

  const handleSignUp = async () => {
    setIsClicked(true)
    try {
      const formData = {
        firstName,
        lastName,
        location,
        phoneNumber,
        password,
        confirmPassword,
      }
      signUpSchema.parse(formData)
      resetErrors()
      navigation.navigate('OTP')
    } catch (error: any) {
      setIsClicked(false)
      const zodErrors = error.errors.map((err: any) => err.path[0])
      console.log('zoderrors ', zodErrors)
      resetErrors()

      if (zodErrors.includes('firstName')) {
        setFirstNameError(true)
      }
      if (zodErrors.includes('lastName')) {
        setLastNameError(true)
      }
      if (!locationRegex.test(location)) {
        setLocationError(true)
      }
      if (zodErrors.includes('phoneNumber')) {
        setPhoneError(true)
      }
      if (zodErrors.includes('password')) {
        setPasswordError(true)
      }
      if (zodErrors.includes('confirmPassword')) {
        setConfirmPasswordError(true)
      }
    }
  }
  const getCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync() //used for the pop up box where we give permission to use location
    if (status !== 'granted') {
      Alert.alert(
        'Permission denied',
        'Allow the app to use the location services',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ]
      )
    }

    const { coords } = await Location.getCurrentPositionAsync()

    if (coords) {
      const { latitude, longitude } = coords

      let response = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      })
      for (let item of response) {
        let address = `${item.city}, ${item.region}`
        setLocation(address)
      }
    }
  }

  const handleSocialSignUp = (provider: string) => {
    console.log(`Sign up with ${provider}`)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Create Your Account</Text>
      <View style={styles.inputSection}>
        <View style={styles.nameSection}>
          <View style={styles.firstNameInput}>
            <TextInput
              style={[styles.input, firstNameError && styles.firstNameError]}
              placeholder='First Name'
              value={firstName}
              onChangeText={setFirstName}
              editable={!isClicked}
            />
            {firstNameError && (
              <View style={styles.error}>
                <Text style={styles.errorMessage}>
                  *First name needs to be longer than 2 characters
                </Text>
              </View>
            )}
          </View>
          <View style={styles.lastNameInput}>
            <TextInput
              style={[styles.input, lastNameError && styles.lastNameError]}
              placeholder='Last Name'
              value={lastName}
              onChangeText={setLastName}
              editable={!isClicked}
            />
            {lastNameError && (
              <View style={styles.error}>
                <Text style={styles.errorMessage}>
                  *Last name needs to be longer than 2 characters
                </Text>
              </View>
            )}
          </View>
        </View>
        <TextInput
          style={[styles.input, phoneError && styles.phoneError]}
          placeholder='Phone Number'
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType='phone-pad'
          editable={!isClicked}
        />
        {phoneError && (
          <View style={styles.error}>
            <Text style={styles.errorMessage}>
              *Phone Number should be 10 digits
            </Text>
          </View>
        )}
        <TextInput
          style={[styles.input, locationError && styles.locationError]}
          placeholder='City (generate dates in your area)'
          value={location}
          onChangeText={setLocation}
          onFocus={getCurrentLocation}
          editable={!isClicked}
        />
        {locationError && (
          <View style={styles.error}>
            <Text style={styles.errorMessage}>*Example format: Dallas, TX</Text>
          </View>
        )}
        <TextInput
          style={[styles.input, passwordError && styles.passWordError]}
          placeholder='Password'
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          editable={!isClicked}
        />
        {passwordError && (
          <View style={styles.error}>
            <Text style={styles.errorMessage}>
              *Password needs to be longer than 2 digits
            </Text>
          </View>
        )}
        <TextInput
          style={[
            styles.input,
            confirmPasswordError && styles.confirmPassWordError,
          ]}
          placeholder='Confirm Password'
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          editable={!isClicked}
        />
        {confirmPasswordError && (
          <View style={styles.error}>
            <Text style={styles.errorMessage}>*Passwords do not match</Text>
          </View>
        )}

        <TouchableOpacity
          style={styles.signUpButton}
          onPress={handleSignUp}
          disabled={isClicked}
        >
          <Text style={styles.signUpButtonText}>Sign Up</Text>
        </TouchableOpacity>

        {/* <Text style={styles.orText}>Or sign up with</Text>

        <View style={styles.socialButtonsContainer}>
          <TouchableOpacity
            style={[styles.socialButton, styles.googleButton]}
            onPress={() => handleSocialSignUp('Google')}
          >
            <Text style={styles.socialButtonText}>Google</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.socialButton, styles.appleButton]}
            onPress={() => handleSocialSignUp('Apple')}
          >
            <Text style={styles.socialButtonText}>Apple</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.socialButton, styles.facebookButton]}
            onPress={() => handleSocialSignUp('Facebook')}
          >
            <Text style={styles.socialButtonText}>Facebook</Text>
          </TouchableOpacity>
        </View> */}
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
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: '500',
    color: 'black',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 15,
    marginVertical: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    fontSize: 16,
  },
  nameSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 5,
  },
  firstNameInput: { width: '48%' },
  lastNameInput: { width: '48%' },
  phoneError: {
    borderLeftWidth: 8,
    borderColor: 'red',
  },
  firstNameError: { borderLeftWidth: 8, borderColor: 'red' },
  lastNameError: { borderLeftWidth: 8, borderColor: 'red' },
  passWordError: { borderLeftWidth: 8, borderColor: 'red' },
  confirmPassWordError: { borderLeftWidth: 8, borderColor: 'red' },
  locationError: { borderLeftWidth: 8, borderColor: 'red' },
  inputSection: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '95%',
  },
  error: {
    width: '100%',
    alignItems: 'flex-start',
  },
  errorMessage: { fontSize: 10 },
  signUpButton: {
    backgroundColor: '#ff6666',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
    width: '100%',
  },
  signUpButtonText: {
    color: 'white',
    fontSize: 16,
  },
  orText: {
    fontSize: 16,
    color: 'grey',
    marginVertical: 20,
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  socialButton: {
    flex: 1,
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  googleButton: {
    backgroundColor: '#db4437',
    borderRadius: 10,
  },
  appleButton: {
    backgroundColor: '#000000',
    borderRadius: 10,
  },
  facebookButton: {
    backgroundColor: '#4267B2',
    borderRadius: 10,
  },
  socialButtonText: {
    color: 'white',
    fontSize: 16,
  },
})
