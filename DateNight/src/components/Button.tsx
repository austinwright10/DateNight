import React from 'react'
import { TouchableOpacity, Text } from 'react-native'

const Button = ({
  title,
  onPress,
  style,
}: {
  title: string
  onPress: () => void
  style: object
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={style}>
      <Text>{title}</Text>
    </TouchableOpacity>
  )
}

export default Button
