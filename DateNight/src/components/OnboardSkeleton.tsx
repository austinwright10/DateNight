import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const OnboardSkeleton = ({
  title,
  description,
}: {
  title: string
  description: string
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
  },
})

export default OnboardSkeleton
