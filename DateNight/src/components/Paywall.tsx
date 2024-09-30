import { Text, StyleSheet, View, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import Push from 'components/Push'
import Purchases from 'react-native-purchases'

export default function Paywall() {
  return (
    <View style={styles.container}>
      <View style={styles.paywallContainer}>
        <Text style={styles.header}>Start receiving your date nights!</Text>
        <Text style={styles.header}>$5.99/month</Text>
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
          <View style={styles.row}>
            <Icon
              name='heart'
              size={16}
              color='#ff6666'
              style={{ marginRight: 15 }}
            />
            <Text style={styles.subHeader}>Grow closer to your loved one</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.subscribeButton}>
          <Text style={styles.subscribeButtonText}>Subscribe</Text>
          {/* <View
            style={[
              styles.priceContainer,
              { width: squareSize, height: squareSize },
              paymentSelected ? styles.toggle : null,
            ]}
          >
            <Text style={styles.price}>$5.99</Text>
            <Text>a month</Text>
          </View> */}
        </TouchableOpacity>
      </View>
      <Push />
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
    borderTopWidth: 2,
    borderTopColor: 'black',
    paddingTop: 10,
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
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  price: { fontSize: 22 },
  toggle: { backgroundColor: '#f5f5dc' },
  subscribeButton: {
    backgroundColor: '#ff6666',
    padding: 15,
    borderRadius: 8,
    marginTop: 30,
    alignItems: 'center',
  },
  subscribeButtonText: {
    color: 'white',
    fontSize: 18,
  },
})
