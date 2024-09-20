import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { dayOfWeekStore, priceStore, travelStore } from 'src/stores/store'

export default function ReviewScreen({ navigation }: any) {
  const selectedDay = dayOfWeekStore((state: any) => state.day)
  const selectedTravel = travelStore((state: any) => state.travel)
  const selectedPrice = priceStore((state: any) => state.price)

  const handleSignUp = () => {
    navigation.navigate('SignUp') // Navigate to the Sign-Up page
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Review Your Selections</Text>
      <View style={styles.reviewContainer}>
        <View style={styles.reviewItem}>
          <Text style={styles.label}>Date Night:</Text>
          <Text style={styles.value}>{selectedDay}</Text>
        </View>
        <View style={styles.reviewItem}>
          <Text style={styles.label}>Budget:</Text>
          <Text style={styles.value}>${selectedPrice}.00</Text>
        </View>
        <View style={styles.reviewItem}>
          <Text style={styles.label}>Distance:</Text>
          <Text style={styles.value}>{selectedTravel} mi.</Text>
        </View>
      </View>

      <Text style={styles.subheader}>
        To receive personalized date ideas and reminders, please create an
        account.
      </Text>

      <TouchableOpacity style={styles.continueButton} onPress={handleSignUp}>
        <Text style={styles.continueButtonText}>Create Account</Text>
      </TouchableOpacity>
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
  activitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  activityButton: {
    backgroundColor: 'transparent',
    padding: 10,
    margin: 5,
    alignItems: 'center',
  },
  activityText: {
    color: 'grey',
    fontSize: 16,
    fontWeight: '400',
  },
  header: {
    fontSize: 25,
    fontWeight: '500',
    color: 'black',
    marginBottom: 20,
  },
  reviewContainer: {
    padding: 15,
    borderRadius: 10,
    width: '75%',
    marginBottom: 20,
  },
  reviewItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  label: {
    fontSize: 18,
    color: '#333',
    fontWeight: '600',
  },
  value: {
    fontSize: 18,
    color: '#666',
  },
  subheader: {
    fontSize: 16,
    color: 'grey',
    textAlign: 'center',
    marginBottom: 20,
    width: '75%',
  },
  continueButton: {
    backgroundColor: '#ff6666',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    width: '75%',
    marginTop: 20,
  },
  continueButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
})
