import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = "https://skaqfhynzijluwabysio.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNrYXFmaHluemlqbHV3YWJ5c2lvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA0Mzk1ODksImV4cCI6MjAyNjAxNTU4OX0.oQe6xlAJJNGV6rAB8-6zToAy-g6DvPlKNO2oKi2K8B0";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
