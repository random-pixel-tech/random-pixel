import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://ngxgxetnkaqvladwywjo.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5neGd4ZXRua2FxdmxhZHd5d2pvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk5MDYwMTgsImV4cCI6MjAyNTQ4MjAxOH0.3nMJ_e5uyRxvE78-TiCAD3Eivok2D9ZGsqy96a-4qW8";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
