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
import { useForm, SubmitHandler } from 'react-hook-form'

export default function SignUpScreen() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [phoneError, setPhoneError] = useState(false)
  const [firstNameError, setFirstNameError] = useState(false)
  const [lastNameError, setLastNameError] = useState(false)

  const signUpSchema = z.object({
    firstName: z
      .string()
      .min(2, { message: 'First name must be more than two characters' }),
    lastName: z.string().min(2),
    phoneNumber: z.string().min(10),
    password: z.string().min(6),
    confirmPassword: z.string(),
  })

  function resetErrors() {
    setPhoneError(false)
    setFirstNameError(false)
    setLastNameError(false)
  }

  const handleSignUp = () => {
    try {
      const formData = {
        firstName,
        lastName,
        phoneNumber,
        password,
        confirmPassword,
      }
      signUpSchema.parse(formData)
      console.log(formData)

      if (password !== confirmPassword) {
        Alert.alert('Error', 'Passwords do not match')
        return
      }
    } catch (error: any) {
      const zodErrors = error.errors.map((err: any) => err.path[0])
      if (zodErrors.includes('phoneNumber')) {
        setPhoneError(true)
      }
      if (zodErrors.includes('firstName')) {
        setFirstNameError(true)
      }
      if (zodErrors.includes('firstName')) {
        setLastNameError(true)
      } else {
        resetErrors()
      }
      console.log(zodErrors)
    }
  }

  const handleSocialSignUp = (provider: string) => {
    console.log(`Sign up with ${provider}`)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Create Your Account</Text>
      <View style={styles.inputSection}>
        <TextInput
          style={[styles.input, firstNameError && styles.firstNameError]}
          placeholder='First Name'
          value={firstName}
          onChangeText={setFirstName}
        />
        {firstNameError && (
          <View style={styles.error}>
            <Text style={styles.errorMessage}>
              *First Name needs to be longer than 2 characters
            </Text>
          </View>
        )}
        <TextInput
          style={[styles.input, lastNameError && styles.lastNameError]}
          placeholder='Last Name'
          value={lastName}
          onChangeText={setLastName}
        />
        {lastNameError && (
          <View style={styles.error}>
            <Text style={styles.errorMessage}>
              *Last Name needs to be longer than 2 characters
            </Text>
          </View>
        )}
        <TextInput
          style={[styles.input, phoneError && styles.phoneError]}
          placeholder='Phone Number'
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType='phone-pad'
        />
        {phoneError && (
          <View style={styles.error}>
            <Text style={styles.errorMessage}>
              *Phone Number should be 10 digits
            </Text>
          </View>
        )}
        <TextInput
          style={styles.input}
          placeholder='Password'
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder='Confirm Password'
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />

        <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
          <Text style={styles.signUpButtonText}>Sign Up</Text>
        </TouchableOpacity>

        <Text style={styles.orText}>Or sign up with</Text>

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
  phoneError: {
    borderLeftWidth: 8,
    borderColor: 'red',
  },
  firstNameError: { borderLeftWidth: 8, borderColor: 'red' },
  lastNameError: { borderLeftWidth: 8, borderColor: 'red' },
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
