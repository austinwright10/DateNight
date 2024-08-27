import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import * as Progress from 'react-native-progress';

const daysOfWeek = [
  { short: 'Su', full: 'Sunday' },
  { short: 'Mo', full: 'Monday' },
  { short: 'Tu', full: 'Tuesday' },
  { short: 'We', full: 'Wednesday' },
  { short: 'Th', full: 'Thursday' },
  { short: 'Fr', full: 'Friday' },
  { short: 'Sa', full: 'Saturday' },
]

export default function DateNightSelectionScreen({ navigation }: any) {
  const [selectedDay, setSelectedDay] = useState<string | null>(null)
  const [progress] = useState(0);

  const handleDaySelect = (day: string) => {
    setSelectedDay(day);
  }

  const handleContinue = () => {
    navigation.navigate('AddressAndPrice');
  }

  return (
    <View style={styles.container}>
      {/* Progress Bar at the Top */}
      <Progress.Bar
        progress={progress}
        width={350}
        color="#ff6666"
        style={styles.progressBar}
      />

      <Text style={styles.header}>Date Night</Text>
      <Text style={styles.subheader}>
        Choose a day of the week that you&apos;d like to have your date night.
      </Text>

      <View style={styles.daysContainer}>
        {daysOfWeek.map((day) => (
          <TouchableOpacity
            key={day.short}
            style={[styles.dayButton]}
            onPress={() => handleDaySelect(day.short)}
          >
            <Text
              style={[
                styles.dayText,
                selectedDay === day.short && styles.selectedDayText,
              ]}
            >
              {day.short}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity
        style={styles.continueButton}
        onPress={handleContinue}
        disabled={!selectedDay}
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
  progressBar: {
    position: 'absolute',
    top: 60,
    alignSelf: 'center', // Center the progress bar horizontally
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 20,
  },
  subheader: {
    fontSize: 16,
    color: 'grey',
    textAlign: 'center',
    marginBottom: 10,
  },
  daysContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  dayButton: {
    backgroundColor: 'transparent',
    padding: 10,
    margin: 5,
    alignItems: 'center',
  },
  dayText: {
    color: 'grey',
    fontSize: 16,
    fontWeight: '400', // Thin lettering
  },
  selectedDayText: {
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
