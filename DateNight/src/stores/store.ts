import { create } from 'zustand'

export const dayOfWeekStore = create((set) => ({
  day: '',
  setDay: (newDay: string) => set({ day: newDay }),
}))

export const priceStore = create((set) => ({
  price: '',
  setPrice: (newPrice: string) => set({ price: newPrice }),
}))

export const travelStore = create((set) => ({
  travel: '',
  setTravel: (newTravel: string) => set({ travel: newTravel }),
}))

export const interestStore = create((set) => ({
  interests: [],
  setInterests: (newInterest: any) =>
    set((state: any) => ({ interests: [...state.interests, newInterest] })),
}))
