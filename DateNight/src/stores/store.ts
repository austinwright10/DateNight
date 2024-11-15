import { create } from 'zustand'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const dayOfWeekStore = create((set) => ({
  day: '',
  setDay: (newDay: string) => set({ day: newDay }),
}))

export const priceStore = create((set) => ({
  price: 50,
  setPrice: (newPrice: number) => set({ price: newPrice }),
}))

export const travelStore = create((set) => ({
  travel: 25,
  setTravel: (newTravel: number) => set({ travel: newTravel }),
}))

export const interestStore = create((set) => ({
  interests: [],
  setInterests: (newInterest: any) =>
    set((state: any) => {
      const updatedInterests = state.interests.includes(newInterest)
        ? state.interests.filter((interest: any) => interest !== newInterest)
        : [...state.interests, newInterest]
      return { interests: updatedInterests }
    }),
}))

interface DateStore {
  previousDates: Array<{ id: string; title: string }>
  addDate: (date: { id: string; title: string }) => void
  loadDates: () => Promise<void>
}

export const useDateStore = create<DateStore>((set) => ({
  previousDates: [],
  addDate: async (date) => {
    set((state) => {
      const updatedDates = [...state.previousDates, date]
      AsyncStorage.setItem('previousDates', JSON.stringify(updatedDates))
      return { previousDates: updatedDates }
    })
  },
  loadDates: async () => {
    const storedDates = await AsyncStorage.getItem('previousDates')
    if (storedDates) {
      set({ previousDates: JSON.parse(storedDates) })
    }
  },
}))

export const userIDStore = create((set) => ({
  id: null,
  setID: (new_id: string) => set({ id: new_id }),
}))
