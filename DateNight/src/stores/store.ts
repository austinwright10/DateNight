import { create } from 'zustand'

const dayOfWeek = create((set) => ({
  day: '',
  setDay: (newDay: string) => set({ day: newDay }),
}))
