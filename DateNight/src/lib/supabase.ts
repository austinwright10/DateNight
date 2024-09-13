import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_KEY!

export const supabase = createClient(
  'https://hwookhjukxgsmhxlculp.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh3b29raGp1a3hnc21oeGxjdWxwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ3NjMyMzcsImV4cCI6MjA0MDMzOTIzN30.LHxHRQA-kIOr6zd0s4hww29PKz5aoJYpoELdvwStCZE',
  {
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  }
)
