import React, { useCallback, useEffect, useState } from 'react'
import { z } from 'zod'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native'
import OTPModal from 'src/components/OTPModal'
import { supabase } from 'src/lib/supabase'
import Autocomplete from 'react-native-autocomplete-input'
import { debounce } from 'lodash'

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
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [citySuggestions, setCitySuggestions] = useState([])
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const geoDBKEY = process.env.GEODB_KEY!

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
    //setIsClicked(true)
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
      setIsModalVisible(true)
      // OTP LOGIC RIGHT HERE
      // const { data, error } = await supabase.auth.signInWithOtp({
      //   phone: phoneNumber,
      // })
    } catch (error: any) {
      //setIsClicked(false)
      const zodErrors = error.errors.map((err: any) => err.path[0])
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
  const handleModalVisibility = (isVisible: boolean) => {
    setIsModalVisible(isVisible)
  }

  const fetchCities = async (query: string) => {
    if (!query) {
      setCitySuggestions([])
      return
    }
    setLoading(true)
    try {
      const response = await fetch(
        `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${query}`,
        {
          method: 'GET',
          headers: {
            'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com',
            'x-rapidapi-key': geoDBKEY,
          },
        }
      )
      const data = await response.json()
      if (data && data.data) {
        const cities = data.data.map(
          (city: any) => `${city.city}, ${city.regionCode}`
        )
        setCitySuggestions(cities)
      } else {
        setCitySuggestions([])
      }
    } catch (error) {
      console.error(error)
    }
    setLoading(false)
  }
  const debouncedFetchCities = useCallback(
    debounce((query: string) => {
      fetchCities(query)
    }, 1000),
    []
  )

  useEffect(() => {
    debouncedFetchCities(query)
  }, [query])

  function formatPhoneNumber(phoneNumber: string): string {
    const cleaned = ('' + phoneNumber).replace(/\D/g, '')
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
    if (match) {
      return `(${match[1]})-${match[2]}-${match[3]}`
    }
    return phoneNumber
  }

  async function goNext() {
    const { error } = await supabase.from('users').insert({
      first_name: firstName,
      last_name: lastName,
      phone_number: formatPhoneNumber(phoneNumber),
      location: location,
    })
    setIsModalVisible(false)
    navigation.navigate('Paywall')
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.container}>
        <OTPModal
          handleModalVisibility={handleModalVisibility}
          isVisible={isModalVisible}
          phoneNumber={phoneNumber}
          firstName={firstName}
          lastName={lastName}
          location={location}
          next={goNext}
        />
        <Text style={styles.header}>Create Your Account</Text>
        <View style={styles.inputSection}>
          <View style={styles.nameSection}>
            <View style={styles.firstNameInput}>
              <TextInput
                style={[styles.input, firstNameError && styles.firstNameError]}
                placeholder='First Name'
                placeholderTextColor='#666666'
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
                placeholderTextColor='#666666'
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
            placeholderTextColor='#666666'
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
          <Autocomplete
            data={citySuggestions}
            defaultValue={query}
            onChangeText={(text) => {
              setQuery(text)
              fetchCities(text)
            }}
            flatListProps={{
              keyExtractor: (_, idx) => idx.toString(),
              renderItem: ({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    setLocation(item)
                    setQuery(item)
                    setCitySuggestions([])
                  }}
                >
                  <Text style={styles.listItem}>{item}</Text>
                </TouchableOpacity>
              ),
            }}
            inputContainerStyle={[
              styles.inputContainerStyle,
              locationError && styles.locationError,
            ]}
            containerStyle={styles.containerStyle}
            listContainerStyle={styles.listContainerStyle}
            placeholder='City (e.g. New York, NY)'
            placeholderTextColor='#666666'
            autoCorrect={false}
            style={{ height: 20 }}
          />
          {locationError && (
            <View style={styles.error}>
              <Text style={styles.errorMessage}>
                *Example format: Dallas, TX
              </Text>
            </View>
          )}
          <TextInput
            style={[styles.input, passwordError && styles.passWordError]}
            placeholder='Password'
            placeholderTextColor='#666666'
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
            placeholderTextColor='#666666'
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
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffcccc',
    padding: 25,
  },
  header: {
    fontSize: 24,
    fontWeight: '500',
    color: 'black',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 17,
    marginVertical: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    fontSize: 14,
  },
  inputContainerStyle: {
    width: '100%',
    padding: 17,
    marginVertical: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 0,
  },
  containerStyle: {
    width: '100%',
  },
  listContainerStyle: {
    top: -10,
    width: '100%',
    borderRadius: 10,
  },
  listStyle: {},
  listItem: { fontSize: 16, padding: 15 },
  nameSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 5,
  },
  firstNameInput: { width: '48%' },
  lastNameInput: { width: '48%' },
  phoneError: {
    borderWidth: 2,
    borderColor: 'red',
  },
  firstNameError: { borderWidth: 2, borderColor: 'red' },
  lastNameError: { borderWidth: 2, borderColor: 'red' },
  passWordError: { borderWidth: 2, borderColor: 'red' },
  confirmPassWordError: { borderWidth: 2, borderColor: 'red' },
  locationError: { borderWidth: 2, borderColor: 'red' },
  inputSection: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
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
})
