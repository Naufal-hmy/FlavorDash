import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SUPABASE_URL = 'https://ycgecremaekxjfvssmal.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InljZ2VjcmVtYWVreGpmdnNzbWFsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg2Njg2ODAsImV4cCI6MjA5NDI0NDY4MH0.1W4cm4K0v6yy1vGOxofvEZSWliJT5AUbVZThYDTMDPg';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
