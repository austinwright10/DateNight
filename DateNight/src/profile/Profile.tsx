import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { supabase } from '../lib/supabase'
import { interestStore, userIDStore } from '../stores/store'

export default function Profile() {
  const [userInfo, setUserInfo] = useState({
    phone_number: '',
    location: '',
    budget: '',
    travel: '',
    day: '',
    onboard: {
      selectedPrice: '',
      selectedTravel: '',
      selectedDay: '',
      interests: [],
    },
  })

  const [editingPhone, setEditingPhone] = useState(false)
  const [editingLocation, setEditingLocation] = useState(false)
  const [editingBudget, setEditingBudget] = useState(false)
  const [editingTravel, setEditingTravel] = useState(false)
  const [editingDay, setEditingDay] = useState(false)

  const [tempPhone, setTempPhone] = useState('')
  const [tempLocation, setTempLocation] = useState('')
  const [tempBudget, setTempBudget] = useState('')
  const [tempTravel, setTempTravel] = useState('')
  const [tempDay, setTempDay] = useState('')

  const userID = userIDStore((state: any) => state.id)
  const interests = interestStore((state: any) => state.interests)
  const setInterests = interestStore((state: any) => state.setInterests)

  useEffect(() => {
    fetchUserInfo()
  }, [])

  const fetchUserInfo = async () => {
    try {
      const { data, error } = await supabase
        .from('registered_users')
        .select('id, phone_number, location, onboard')
        .eq('id', userID[0].id)
        .single()

      if (error) {
        console.log('error from profile ', error)
      } else {
        const onboardData = data.onboard || {}
        console.log('onboard data ', onboardData)
        setUserInfo({
          phone_number: data.phone_number || '',
          location: data.location || '',
          budget: onboardData.selectedPrice || '',
          travel: onboardData.selectedTravel || '',
          day: onboardData.selectedDay || '',
          onboard: onboardData,
        })
        setTempPhone(data.phone_number || '')
        setTempLocation(data.location || '')
        setTempBudget(onboardData.selectedPrice || '')
        setTempTravel(onboardData.selectedTravel || '')
        setTempDay(onboardData.selectedDay || '')
      }
    } catch (error) {
      console.log('error ', error)
    }
  }

  const handleSave = async () => {
    const updates: any = {}

    if (tempPhone !== userInfo.phone_number) {
      updates.phone_number = tempPhone
    }
    if (tempLocation !== userInfo.location) {
      updates.location = tempLocation
    }
    if (tempBudget !== userInfo.budget) {
      updates.onboard = { ...userInfo.onboard, selectedPrice: tempBudget }
    }
    if (tempTravel !== userInfo.travel) {
      updates.onboard = { ...userInfo.onboard, selectedTravel: tempTravel }
    }
    if (tempDay !== userInfo.day) {
      updates.onboard = { ...userInfo.onboard, selectedDay: tempDay }
    }

    // Update the user in the database
    const { error } = await supabase
      .from('registered_users')
      .update(updates)
      .eq('id', userID[0].id)

    if (error) {
      console.error('Error updating user info:', error)
    } else {
      setUserInfo((prev) => ({
        ...prev,
        phone_number: tempPhone,
        location: tempLocation,
        day: tempDay,
        budget: tempBudget,
        travel: tempTravel,
        onboard: {
          ...prev.onboard,
          selectedPrice: tempBudget,
          selectedTravel: tempTravel,
          selectedDay: tempDay,
        },
      }))
      setEditingPhone(false)
      setEditingLocation(false)
      setEditingBudget(false)
      setEditingTravel(false)
      setEditingDay(false)
    }
  }

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut()
    // if (!error) {
    //   navigation.navigate('Login')
    // }
  }

  const toggleInterest = (interest: string) => {
    setInterests(interest)
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Profile</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Location</Text>
        {!editingLocation ? (
          <View style={styles.infoRow}>
            <View>
              <Text style={styles.infoText}>{userInfo.location}</Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                setTempLocation(userInfo.location)
                setEditingLocation(true)
              }}
            >
              <Ionicons name='pencil' size={24} color='#333' />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.infoRow}>
            <TextInput
              style={styles.input}
              value={tempLocation}
              onChangeText={setTempLocation}
            />
            <TouchableOpacity onPress={handleSave}>
              <Ionicons name='checkmark' size={24} color='#333' />
            </TouchableOpacity>
          </View>
        )}
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Phone Number</Text>
        {!editingPhone ? (
          <View style={styles.infoRow}>
            <View>
              <Text style={styles.infoText}>{userInfo.phone_number}</Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                setTempPhone(userInfo.phone_number)
                setEditingPhone(true)
              }}
            >
              <Ionicons name='pencil' size={24} color='#333' />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.infoRow}>
            <TextInput
              style={styles.input}
              value={tempPhone}
              onChangeText={setTempPhone}
            />
            <TouchableOpacity onPress={handleSave}>
              <Ionicons name='checkmark' size={24} color='#333' />
            </TouchableOpacity>
          </View>
        )}
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Budget</Text>
        {!editingBudget ? (
          <View style={styles.infoRow}>
            <View>
              <Text style={styles.infoText}>${userInfo.budget}</Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                setTempBudget(userInfo.budget)
                setEditingBudget(true)
              }}
            >
              <Ionicons name='pencil' size={24} color='#333' />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.infoRow}>
            <TextInput
              style={styles.input}
              value={tempBudget}
              onChangeText={setTempBudget}
            />
            <TouchableOpacity onPress={handleSave}>
              <Ionicons name='checkmark' size={24} color='#333' />
            </TouchableOpacity>
          </View>
        )}
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Travel</Text>
        {!editingTravel ? (
          <View style={styles.infoRow}>
            <View>
              <Text style={styles.infoText}>{userInfo.travel} mi.</Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                setTempTravel(userInfo.travel)
                setEditingTravel(true)
              }}
            >
              <Ionicons name='pencil' size={24} color='#333' />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.infoRow}>
            <TextInput
              style={styles.input}
              value={tempTravel}
              onChangeText={setTempTravel}
            />
            <TouchableOpacity onPress={handleSave}>
              <Ionicons name='checkmark' size={24} color='#333' />
            </TouchableOpacity>
          </View>
        )}
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Day</Text>
        {!editingDay ? (
          <View style={styles.infoRow}>
            <View>
              <Text style={styles.infoText}>{userInfo.day}</Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                setTempDay(userInfo.day)
                setEditingDay(true)
              }}
            >
              <Ionicons name='pencil' size={24} color='#333' />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.infoRow}>
            <TextInput
              style={styles.input}
              value={tempDay}
              onChangeText={setTempDay}
            />
            <TouchableOpacity onPress={handleSave}>
              <Ionicons name='checkmark' size={24} color='#333' />
            </TouchableOpacity>
          </View>
        )}
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
    fontSize: 20,
    marginBottom: 5,
    color: '#333',
  },
  input: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    fontSize: 16,
    width: '90%',
  },
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
    borderBottomWidth: 1,
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
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    paddingLeft: 0,
    borderRadius: 5,
    borderBottomWidth: 1,
  },
  infoText: {
    fontSize: 17,
    color: '#333',
  },
})
