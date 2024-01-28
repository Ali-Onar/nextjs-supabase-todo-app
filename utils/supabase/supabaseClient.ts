import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/database.types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

async function getSupabaseClient(accessToken: string) {
    return createClient<Database>(
        supabaseUrl,
        supabaseAnonKey,
        { global: { headers: { Authorization: `Bearer ${accessToken}` } } },
    );
}

export default getSupabaseClient;
