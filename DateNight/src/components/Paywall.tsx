import { Text, StyleSheet, View, Dimensions } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

const { width } = Dimensions.get('window')
export default function Paywall() {
  const squareSize = width * 0.25
  return (
    <View style={styles.container}>
      <View style={styles.paywallContainer}>
        <Text style={styles.header}>Start receiving your date nights!</Text>
        <View style={styles.subContainer}>
          <View style={styles.row}>
            <Icon
              name='heart'
              size={16}
              color='#ff6666'
              style={{ marginRight: 15 }}
            />
            <Text style={styles.subHeader}>
              Consistent dates with your loved one
            </Text>
          </View>
          <View style={styles.row}>
            <Icon
              name='heart'
              size={16}
              color='#ff6666'
              style={{ marginRight: 15 }}
            />
            <Text style={styles.subHeader}>Fully planned dates</Text>
          </View>
          <View style={styles.row}>
            <Icon
              name='heart'
              size={16}
              color='#ff6666'
              style={{ marginRight: 15 }}
            />
            <Text style={styles.subHeader}>
              Unique/Different ideas each week
            </Text>
          </View>
          <View style={styles.row}>
            <Icon
              name='heart'
              size={16}
              color='#ff6666'
              style={{ marginRight: 15 }}
            />
            <Text style={styles.subHeader}>Tailored to your preferences</Text>
          </View>
        </View>
        <View
          style={[
            styles.priceContainer,
            { width: squareSize, height: squareSize },
          ]}
        >
          <Text style={styles.price}>$5.99</Text>
          <Text>a month</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffcccc',
  },
  paywallContainer: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    padding: 20,
    width: '95%',
  },
  header: {
    fontSize: 22,
    textAlign: 'center',
    fontWeight: '500',
    color: 'black',
    marginBottom: 20,
  },
  subContainer: {
    width: '80%',
  },
  subHeader: {
    fontSize: 16,
    textAlign: 'center',
  },
  row: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  priceContainer: {
    borderWidth: 1,
    marginTop: 40,
    borderColor: 'black',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  price: { fontSize: 22 },
})
