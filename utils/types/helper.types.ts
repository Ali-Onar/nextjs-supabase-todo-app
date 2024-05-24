import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from './database.types';

export type TodosType = Database['public']['Tables']['todos']['Row'];

export type SupabaseDBClient = SupabaseClient<Database>;
