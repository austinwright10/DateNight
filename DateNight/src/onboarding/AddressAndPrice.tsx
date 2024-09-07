import React, { useState } from 'react'
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native'
import { Slider } from '@miblanchard/react-native-slider'
import { priceStore, travelStore } from 'src/stores/store'

export default function AddressAndPriceScreen({ navigation }: any) {
  const selectedPrice = priceStore((state: any) => state.price)
  const setSelectedPrice = priceStore((state: any) => state.setPrice)
  const selectedTravel = travelStore((state: any) => state.travel)
  const setSelectedTravel = travelStore((state: any) => state.setTravel)

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Price and Travel</Text>
      <View style={styles.body}>
        <View style={styles.priceSection}>
          <Text style={styles.subheader}>What is your budget per date?</Text>
          <Text style={styles.priceText}>${selectedPrice}</Text>
          <Slider
            trackClickable={true}
            step={1}
            minimumValue={0}
            maximumValue={100}
            value={selectedPrice}
            onValueChange={(value) => setSelectedPrice(value)}
          />
        </View>
        <View style={styles.travelSection}>
          <Text style={styles.subheader}>
            How far are you willing to travel?
          </Text>
          <Text style={styles.travelText}>{selectedTravel} mi.</Text>
          <Slider
            trackClickable={true}
            step={1}
            minimumValue={0}
            maximumValue={50}
            value={selectedTravel}
            onValueChange={(value) => setSelectedTravel(value)}
          />
        </View>
      </View>
      <TouchableOpacity
        style={styles.continueButton}
        onPress={() => {
          navigation.navigate('InterestSelection')
        }}
      >
        <Text style={styles.continueButtonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffcccc',
    justifyContent: 'center',
    alignItems: 'center',
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
  body: { width: '70%', justifyContent: 'center', alignItems: 'center' },
  priceText: { fontSize: 20, textAlign: 'center' },
  travelText: { fontSize: 20, textAlign: 'center' },
  priceSection: { width: '100%' },
  travelSection: { width: '100%' },
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
