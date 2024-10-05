import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import {
  dayOfWeekStore,
  interestStore,
  priceStore,
  travelStore,
} from '../stores/store'

export default function Profile() {
  const navigation = useNavigation()
  const selectedDay = dayOfWeekStore((state: any) => state.day)
  const setSelectedDay = dayOfWeekStore((state: any) => state.setDay)
  const selectedPrice = priceStore((state: any) => state.price)
  const setSelectedPrice = priceStore((state: any) => state.setPrice)
  const selectedTravel = travelStore((state: any) => state.travel)
  const setSelectedTravel = travelStore((state: any) => state.setTravel)
  const interests = interestStore((state: any) => state.interests)
  const setInterests = interestStore((state: any) => state.setInterests)

  const [tempPhone, setTempPhone] = useState('')
  const [tempLocation, setTempLocation] = useState('')

  //   const handleSave = () => {
  //     setPhoneNumber(tempPhone)
  //     setLocation(tempLocation)
  //     // You might want to add a confirmation message here
  //   }

  const handleSignOut = () => {
    // Implement your sign out logic here
    // For example, clear all stores and navigate to the login screen
    // navigation.navigate('Login')
  }

  const toggleInterest = (interest: string) => {
    setInterests(interest)
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Profile</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          style={styles.input}
          value={tempPhone}
          onChangeText={setTempPhone}
          placeholder='Enter your phone number'
          keyboardType='phone-pad'
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Location</Text>
        <TextInput
          style={styles.input}
          value={tempLocation}
          onChangeText={setTempLocation}
          placeholder='Enter your location'
        />
      </View>

      <Text style={styles.label}>Interests</Text>
      <View style={styles.interestsContainer}>
        {interests.map((interest: string) => (
          <TouchableOpacity
            key={interest}
            style={[
              styles.interestButton,
              interests.includes(interest) && styles.selectedInterest,
            ]}
            onPress={() => toggleInterest(interest)}
          >
            <Text style={styles.interestText}>{interest}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.saveButton}>
        <Text style={styles.buttonText}>Save Changes</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
        <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffcccc',
    paddingTop: 100,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  input: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    fontSize: 16,
  },
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  interestButton: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 20,
    margin: 5,
  },
  selectedInterest: {
    backgroundColor: '#ff6666',
  },
  interestText: {
    color: '#333',
  },
  saveButton: {
    backgroundColor: '#ff6666',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  signOutButton: {
    backgroundColor: '#ff9999',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
})
