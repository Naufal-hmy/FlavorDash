import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SUPABASE_URL = 'https://qciatabsdkciojgsnnll.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFjaWF0YWJzZGtjaW9qZ3NubmxsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQxMTMwNzEsImV4cCI6MjA5OTY4OTA3MX0.s_1t0XyjC9NbNI9eVTnCyuMqjGAFE4epunh-cTwa02I';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
