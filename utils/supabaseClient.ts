import { createClient } from '@supabase/supabase-js';
import { Database } from './types/database.types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabaseClient = async (accessToken: string) => {
    const supabase = createClient<Database>(
        supabaseUrl as string,
        supabaseAnonKey as string,
        { global: { headers: { Authorization: `Bearer ${accessToken}` } } },
    );

    return supabase;
};

export default supabaseClient;
