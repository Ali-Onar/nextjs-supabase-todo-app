'use server';

import { createClient } from '@supabase/supabase-js';
import { auth } from '@clerk/nextjs';
import { Database } from './types/database.types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

async function getSupabaseClient() {
    const { userId, getToken } = auth();
    if (!userId) throw new Error('User not authenticated');

    const accessToken = await getToken({ template: 'supabase' });

    return createClient<Database>(
        supabaseUrl,
        supabaseAnonKey,
        { global: { headers: { Authorization: `Bearer ${accessToken}` } } },
    );
}

export default getSupabaseClient;
