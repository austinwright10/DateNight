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
  //const [selectedActivities, setSelectedActivities] = useState<string[]>([])

  const selectedActivities = interestStore((state: any) => state.interests)
  const setSelectedActivities = interestStore(
    (state: any) => state.setInterests
  )

  const handleActivitySelect = (activity: string) => {
    if (selectedActivities.includes(activity)) {
      selectedActivities.filter((a: string) => a !== activity)
    }
    console.log('s ', selectedActivities)
    setSelectedActivities(activity)
  }

  const handleContinue = () => {
    navigation.navigate('Review')
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Interests</Text>
      <Text style={styles.subheader}>
        Select your favorite activities and hobbies from the list below. The
        more you select, the more you'll enjoy your dates!
      </Text>
      <View style={styles.activitiesContainer}>
        {activities.map((activity) => (
          <TouchableOpacity
            key={activity}
            style={[styles.activityButton]}
            onPress={() => handleActivitySelect(activity)}
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
      <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
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
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 20,
  },
  subheader: {
    fontSize: 18,
    color: 'grey',
    textAlign: 'center',
    marginBottom: 20,
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
  selectedActivityText: {
    color: 'black',
  },
  continueButton: {
    backgroundColor: '#ff6666',
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
  },
  continueButtonText: {
    color: 'white',
    fontSize: 16,
  },
})
