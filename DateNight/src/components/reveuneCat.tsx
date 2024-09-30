import React from 'react'
import { Platform, View, Text } from 'react-native'
import Purchases, { LOG_LEVEL } from 'react-native-purchases'

export default class Purchase extends React.Component {
  componentDidMount() {
    Purchases.setLogLevel(LOG_LEVEL.VERBOSE)

    if (Platform.OS === 'ios') {
      Purchases.configure({ apiKey: process.env.REVENUE_CAT! })
    } else if (Platform.OS === 'android') {
      Purchases.configure({ apiKey: process.env.REVENUE_CAT! })

      Purchases.configure({
        apiKey: process.env.REVENUE_CAT!,
        useAmazon: true,
      })
    }
  }

  render() {
    return (
      <View>
        <Text>Purchase Component Initialized</Text>
      </View>
    )
  }
}
