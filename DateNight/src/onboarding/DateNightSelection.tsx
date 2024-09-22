import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import * as Progress from 'react-native-progress'
import { dayOfWeekStore } from 'src/stores/store'

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
  const selectedDay = dayOfWeekStore((state: any) => state.day)
  const setSelectedDay = dayOfWeekStore((state: any) => state.setDay)

  const handleDaySelect = (day: string) => {
    setSelectedDay(day)
  }

  const handleContinue = () => {
    navigation.navigate('AddressAndPrice')
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Date Night</Text>
      <Text style={styles.subheader}>
        Choose a day of the week that you&apos;d like to have your date night.
        You&apos;ll receive a reminder the morning of.
      </Text>

      <View style={styles.daysContainer}>
        {daysOfWeek.map((day) => (
          <TouchableOpacity
            key={day.short}
            style={[styles.dayButton]}
            onPress={() => handleDaySelect(day.full)}
          >
            <Text
              style={[
                styles.dayText,
                selectedDay === day.full && styles.selectedDayText,
              ]}
            >
              {day.short}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity
        style={[styles.continueButton, selectedDay === '' && styles.disabled]}
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
    marginBottom: 10,
  },
  daysContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '100%',
  },
  dayButton: {
    backgroundColor: 'transparent',
    padding: 10,
    margin: 5,
    alignItems: 'center',
  },
  dayText: {
    color: 'grey',
    fontSize: 18,
    fontWeight: '400', // Thin lettering
  },
  selectedDayText: {
    color: 'black',
  },
  disabled: {
    backgroundColor: 'rgba(255, 102, 102, 0.5)',
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
