import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

// Get environment variables (ensure they are set)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Supabase URL or Anon Key is missing in the environment variables.');
}

// Initialize Supabase client
export const supabase = createClient<Database>(supabaseUrl, supabaseKey);
