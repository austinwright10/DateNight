import * as React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { Slider } from '@miblanchard/react-native-slider'

export default function SliderContainer(props: {
  caption?: string
  children: React.ReactElement
  sliderValue?: Array<number>
  trackMarks?: Array<number>
  vertical?: boolean
  dollar?: boolean
  mileage?: boolean
}) {
  const { caption, sliderValue, trackMarks, dollar, mileage } = props
  const [value, setValue] = React.useState(sliderValue ? sliderValue : 0)
  let renderTrackMarkComponent: (index: number) => React.ReactNode

  if (trackMarks?.length && (!Array.isArray(value) || value?.length === 1)) {
    renderTrackMarkComponent = (index: number) => {
      const currentMarkValue = trackMarks[index]
      const currentSliderValue =
        value || (Array.isArray(value) && value[0]) || 0
      const style =
        currentMarkValue > Math.max(currentSliderValue)
          ? trackMarkStyles.activeMark
          : trackMarkStyles.inactiveMark
      return <View style={style} />
    }
  }

  const renderChildren = () => {
    return React.Children.map(props.children, (child: React.ReactElement) => {
      if (!!child && child.type === Slider) {
        return React.cloneElement(child, {
          onValueChange: setValue,
          renderTrackMarkComponent,
          trackMarks,
          value,
        })
      }

      return child
    })
  }

  return (
    <View>
      <View style={styles.titleContainer}>
        <Text>{caption}</Text>
        <Text style={styles.question}>
          {dollar ? '$' : ''}
          {Array.isArray(value) ? value.join(' - ') : value}
          {mileage ? ' mi.' : ''}
        </Text>
      </View>
      {renderChildren()}
    </View>
  )
}

const styles = StyleSheet.create({
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  question: {
    fontSize: 18,
  },
})

const trackMarkStyles = StyleSheet.create({
  activeMark: {
    borderColor: 'red',
  },
  inactiveMark: {
    borderColor: 'grey',
  },
})
