import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

// export const supabaseUrl = "https://ytahqfinlppzoomvyyuj.supabase.co";

export const supabaseUrl = "http://192.168.1.2:54321";

// const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl0YWhxZmlubHBwem9vbXZ5eXVqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ1NjgwNzEsImV4cCI6MjAzMDE0NDA3MX0.NV9BXbxsSa0qcIfZJViEQxfk4dX9VHzztsZ-He6XNDY";

const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
