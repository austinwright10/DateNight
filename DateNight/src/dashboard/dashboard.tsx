// import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'

// export default function Dashboard() {
//   return (
//     <View style={styles.container}>
//       <Text>Test</Text>
//     </View>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#ffcccc',
//     padding: 25,
//   },
// })

import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons' // Import Ionicons for the user icon
import { useNavigation } from '@react-navigation/native' // Import useNavigation for navigation

const items = [
  { id: '1', title: 'Item 1' },
  { id: '2', title: 'Item 2' },
  { id: '3', title: 'Item 3' },
  { id: '4', title: 'Item 4' },
  { id: '5', title: 'Item 5' },
]

export default function Dashboard() {
  const navigation = useNavigation()

  const renderItem = ({ item }: { item: { id: string; title: string } }) => (
    <View style={styles.item}>
      <TouchableOpacity onPress={() => console.log('clicaddddddked')}>
        <Text style={styles.itemText}>{item.title}</Text>
      </TouchableOpacity>
    </View>
  )

  return (
    <View style={styles.container}>
      <View style={styles.profileButtonContainer}>
        <TouchableOpacity
          style={styles.profileButton}
          onPress={() => console.log('clieasdf')}
        >
          <Ionicons name='person' size={28} color='white' />
        </TouchableOpacity>
      </View>

      <View style={styles.flatListContainer}>
        <Text style={styles.header}>Past Dates</Text>
        <FlatList
          data={items}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#ffcccc',
    padding: 25,
  },
  profileButtonContainer: {
    position: 'absolute',
    top: 80,
    right: 35,
  },
  header: {
    fontSize: 30,
    fontWeight: '500',
    color: 'black',
    marginBottom: 10,
    marginLeft: 10,
  },
  flatListContainer: {
    flexGrow: 1,
    width: '100%',
    paddingTop: 60,
  },
  listContainer: {
    padding: 10,
  },
  item: {
    backgroundColor: 'white',
    padding: 15,
    marginVertical: 5,
    borderRadius: 8,
    width: '100%',
  },
  itemText: {
    fontSize: 18,
  },
  profileButton: {
    backgroundColor: '#ff6666',
    borderRadius: 50,
    padding: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
})
