import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { useDateStore } from 'src/stores/store'
import { useEffect } from 'react'

export default function Dashboard() {
  const navigation = useNavigation()
  const { previousDates, loadDates } = useDateStore()

  const renderItem = ({ item }: { item: { id: string; title: string } }) => (
    <View style={styles.item}>
      <TouchableOpacity onPress={() => console.log('clicaddddddked')}>
        <Text style={styles.itemText}>{item.title}</Text>
      </TouchableOpacity>
    </View>
  )

  useEffect(() => {
    loadDates()
  }, [])

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
        <Text style={styles.header}>Previous Dates</Text>
        <FlatList
          data={previousDates}
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
