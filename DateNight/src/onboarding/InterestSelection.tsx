import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { interestStore } from 'src/stores/store'

const activities = [
  'Hiking',
  'Reading',
  'Cooking',
  'Traveling',
  'Photography',
  'Gaming',
  'Painting',
  'Music',
  'Gardening',
  'Cycling',
  'Dancing',
  'Writing',
  'Swimming',
  'Yoga',
  'Running',
  'Fishing',
  'Camping',
  'Crafting',
  'Fitness',
  'Baking',
]

export default function InterestSelectionScreen({ navigation }: any) {
  const selectedActivities = interestStore((state: any) => state.interests)
  const setSelectedActivities = interestStore(
    (state: any) => state.setInterests
  )
  const handleContinue = () => {
    navigation.navigate('Review')
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Interests</Text>
      <Text style={styles.subheader}>
        Select your favorite activities and hobbies from the list below.
      </Text>
      <View style={styles.activitiesContainer}>
        {activities.map((activity) => (
          <TouchableOpacity
            key={activity}
            style={[styles.activityButton]}
            onPress={() => setSelectedActivities(activity)}
          >
            <Text
              style={[
                styles.activityText,
                selectedActivities.includes(activity) &&
                  styles.selectedActivityText,
              ]}
            >
              {activity}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity
        style={[
          styles.continueButton,
          selectedActivities.length === 0 && styles.disabled,
        ]}
        onPress={handleContinue}
        disabled={selectedActivities.length === 0}
      >
        <Text style={styles.continueButtonText}>Continue</Text>
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
  header: {
    fontSize: 24,
    fontWeight: '500',
    color: 'black',
    marginBottom: 20,
  },
  subheader: {
    fontSize: 18,
    color: 'grey',
    textAlign: 'center',
    marginBottom: 20,
  },
  disabled: {
    backgroundColor: 'rgba(255, 102, 102, 0.5)',
  },
  activitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: 10,
  },
  activityButton: {
    backgroundColor: 'transparent',
    padding: 10,
    margin: 5,
    alignItems: 'center',
  },
  activityText: {
    color: 'grey',
    fontSize: 20,
    fontWeight: '400',
  },
  selectedActivityText: {
    color: 'black',
    fontWeight: '600',
  },
  continueButton: {
    backgroundColor: '#ff6666',
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
  },
  continueButtonText: {
    color: 'white',
    fontSize: 16,
  },
})
