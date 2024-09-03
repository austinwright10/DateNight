import React from 'react'
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native'
import { Slider } from '@miblanchard/react-native-slider'
import SliderContainer from 'src/components/SliderContainer'
import { priceStore, travelStore } from 'src/stores/store'

export default function AddressAndPriceScreen({ navigation }: any) {
  const setSelectedPrice = priceStore((state: any) => state.setPrice)
  const setSelectedTravel = travelStore((state: any) => state.setTravel)

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Price and Travel</Text>
      <View style={styles.price}>
        <Text style={styles.subheader}>What is your desired price range?</Text>
        <SliderContainer sliderValue={[50]} dollar={true}>
          <Slider
            trackClickable={true}
            step={5}
            minimumValue={0}
            maximumValue={100}
          />
        </SliderContainer>
      </View>
      <View style={styles.range}>
        <Text style={styles.subheader}>How far are you willing to travel?</Text>
        <SliderContainer sliderValue={[25]} mileage={true}>
          <Slider
            trackClickable={true}
            step={5}
            minimumValue={0}
            maximumValue={50}
            onValueChange={(value) => setSelectedTravel(value)}
          />
        </SliderContainer>
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
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 20,
  },
  subheader: {
    fontSize: 18,
    color: 'grey',
    textAlign: 'center',
    marginBottom: 10,
  },
  price: { marginBottom: 20, marginTop: 0 },
  range: { marginBottom: 20 },
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
