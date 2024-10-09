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
import {
  dayOfWeekStore,
  interestStore,
  priceStore,
  travelStore,
  userIDStore,
} from 'src/stores/store'

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
  const selectedDay = dayOfWeekStore((state: any) => state.day)
  const selectedPrice = priceStore((state: any) => state.price)
  const selectedTravel = travelStore((state: any) => state.travel)
  const interests = interestStore((state: any) => state.interests)
  const geoDBKEY = process.env.GEODB_KEY!
  const setID = userIDStore((state: any) => state.setID)

  const signUpSchema = z
    .object({
      firstName: z.string().min(2),
      lastName: z.string().min(2),
      location: z.string().min(2),
      phoneNumber: z.string().min(10),
      password: z.string().min(6),
      confirmPassword: z.string().min(6),
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
  const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/

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
      // if (error) {
      //   throw error.message
      // }
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
      if (!phoneRegex.test(phoneNumber)) {
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
      return `+1${match[1]}${match[2]}${match[3]}` // Assuming US numbers
    }
    return '+1' + phoneNumber // Assuming US numbers
  }

  async function goNext() {
    try {
      // const { data: authData, error: authError } = await supabase.auth.signUp({
      //   phone: formatPhoneNumber(phoneNumber),
      //   password: password,
      // })
      // if (authError) {
      //   throw authError
      // }
      // if (!authData.user) {
      //   throw new Error('User creation failed')
      // }
      const onboardData = {
        selectedDay,
        selectedPrice,
        selectedTravel,
        interests,
      }
      const onboardJSON = JSON.stringify(onboardData)

      const { data, error: insertError } = await supabase
        .from('registered_users')
        .insert({
          first_name: firstName,
          last_name: lastName,
          phone_number: formatPhoneNumber(phoneNumber),
          location: location,
          onboard: onboardJSON,
        })
        .select('id')
      if (insertError) {
        throw insertError
      }
      if (data) {
        setID(data)
        console.log('data ', data)
      }
      setIsModalVisible(false)
      navigation.navigate('Profile')
    } catch (error: any) {
      console.log('error ', error)
    }
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
            textContentType='none'
          />
          {passwordError && (
            <View style={styles.error}>
              <Text style={styles.errorMessage}>
                *Password needs must be at least 6 characters
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
