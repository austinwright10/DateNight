import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function ReviewScreen({ navigation }: any) {
  const [activities, setActivities] = useState<string[]>(['Hiking', 'Photography', 'Painting', 'Cycling', 'Cooking', 'Reading', 'Gaming']);

  const handleSignUp = () => {
    navigation.navigate('SignUp'); // Navigate to the Sign-Up page
  };

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
          <Text style={styles.activitiesText}>
            {activities.join(', ')}
          </Text>
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
  );
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
    fontSize: 28,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 20,
    textAlign: 'center',
  },
  reviewContainer: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#fff',
    width: '100%',
    marginBottom: 20,
    elevation: 3,
  },
  reviewItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
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
  activitiesText: {
    fontSize: 16,
    color: '#666',
    flex: 1,
    textAlign: 'right',
  },
  subheader: {
    fontSize: 16,
    color: 'grey',
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
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
});