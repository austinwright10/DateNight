import React, {useState} from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

export default function ReviewScreen({ navigation }: any) {
  const [activities, setActivities] = useState<string[]>(['Hiking', 'Photography', 'Photography', 'Photography', 'Photography', 'Photography', 'Photography']);

  const handleSignUp = () => {
    navigation.navigate('SignUp'); // Navigate to the Sign-Up page
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Review Your Selections</Text>
      
      <View style={styles.reviewContainer}>
        <View style={styles.reviewItem}>
          <Text style={styles.label}>Date Night:</Text>
          <Text style={styles.value}>Friday</Text>
        </View>
        <View style={styles.reviewItem}>
          <Text style={styles.label}>Budget:</Text>
          <Text style={styles.value}>$50</Text>
        </View>
        <View style={styles.reviewItem}>
          <Text style={styles.label}>Distance:</Text>
          <Text style={styles.value}>25 miles</Text>
        </View>
        <View style={styles.reviewItem}>
          <Text style={styles.label}>Interests:</Text>
          <View style={styles.activitiesContainer}>
        {activities.map((activity) => (
            <Text
              style={[
                styles.activityText
              ]}
            >
              {activity}
            </Text>
        ))}
      </View>
        </View>
      </View>

      <Text style={styles.subheader}>
        To receive personalized date ideas and reminders, please create an account. 
        This helps us save your preferences and send you the best date ideas tailored to your interests.
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
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 20,
  },
  reviewContainer: {
    padding: 15,
    borderRadius: 10,
    width: '100%',
    marginBottom: 20,
  },
  reviewItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
  },
  value: {
    fontSize: 16,
    color: '#666',
  },
  subheader: {
    fontSize: 16,
    color: 'grey',
    textAlign: 'center',
    marginBottom: 20,
  },
  continueButton: {
    backgroundColor: '#ff6666',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    width: '100%',
  },
  continueButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
})
