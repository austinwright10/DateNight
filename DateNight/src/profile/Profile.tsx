import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'
import { supabase } from '../lib/supabase'
import { interestStore } from '../stores/store'

export default function Profile() {
  const navigation = useNavigation()
  const [userInfo, setUserInfo] = useState({
    phone_number: '',
    location: '',
  })
  const [editingPhone, setEditingPhone] = useState(false)
  const [editingLocation, setEditingLocation] = useState(false)
  const [tempPhone, setTempPhone] = useState('')
  const [tempLocation, setTempLocation] = useState('')

  const interests = interestStore((state: any) => state.interests)
  const setInterests = interestStore((state: any) => state.setInterests)

  useEffect(() => {
    fetchUserInfo()
  }, [])

  const fetchUserInfo = async () => {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser()
    if (user) {
      const { data, error } = await supabase
        .from('users')
        .select('phone_number, location')
        .eq('id', user.id)
        .single()
      console.log('data ', data)

      if (error) {
        console.error('Error fetching user info:', error)
      } else if (data) {
        setUserInfo(data)
        setTempPhone(data.phone_number)
        setTempLocation(data.location)
      }
    } else {
      console.log(error)
    }
  }

  const handleSave = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (user) {
      const { error } = await supabase
        .from('users')
        .update({
          phone_number: tempPhone,
          location: tempLocation,
        })
        .eq('id', user.id)

      if (error) {
        console.error('Error updating user info:', error)
      } else {
        setUserInfo({
          ...userInfo,
          phone_number: tempPhone,
          location: tempLocation,
        })
        setEditingPhone(false)
        setEditingLocation(false)
      }
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
        <Text style={styles.label}>Phone Number</Text>
        <View style={styles.infoRow}>
          {editingPhone ? (
            <TextInput
              style={styles.input}
              value={tempPhone}
              onChangeText={setTempPhone}
              keyboardType='phone-pad'
            />
          ) : (
            <Text style={styles.infoText}>{userInfo.phone_number}</Text>
          )}
          <TouchableOpacity onPress={() => setEditingPhone(!editingPhone)}>
            <Ionicons
              name={editingPhone ? 'checkmark' : 'pencil'}
              size={24}
              color='#333'
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Location</Text>
        <View style={styles.infoRow}>
          {editingLocation ? (
            <TextInput
              style={styles.input}
              value={tempLocation}
              onChangeText={setTempLocation}
            />
          ) : (
            <Text style={styles.infoText}>{userInfo.location}</Text>
          )}
          <TouchableOpacity
            onPress={() => setEditingLocation(!editingLocation)}
          >
            <Ionicons
              name={editingLocation ? 'checkmark' : 'pencil'}
              size={24}
              color='#333'
            />
          </TouchableOpacity>
        </View>
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

      {(editingPhone || editingLocation) && (
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.buttonText}>Save Changes</Text>
        </TouchableOpacity>
      )}

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
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
  infoText: {
    fontSize: 16,
    color: '#333',
  },
})
