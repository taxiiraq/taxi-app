import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || 'https://weqqelaqsypnevypsdxq.supabase.co';
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndlcXFlbGFxc3lwbmV2eXBzZHhxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM4NzQ2OTgsImV4cCI6MjA2OTQ1MDY5OH0.hIgwJcLiNeKd9WOyJdhFfrgYfVDlT2vuV7PM9cEydk0';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

export default supabase; 