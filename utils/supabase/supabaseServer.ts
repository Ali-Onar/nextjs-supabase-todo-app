/* eslint-disable import/prefer-default-export */

import { auth } from '@clerk/nextjs/server';
import { CookieOptions, createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { Database } from '../types/database.types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export async function createClerkSupabaseClient() {
    const cookieStore = cookies();
    const { getToken } = auth();

    const token = await getToken({ template: 'supabase' });
    const authToken = token ? { Authorization: `Bearer ${token}` } : null;

    return createServerClient<Database>(
        supabaseUrl,
        supabaseAnonKey,
        {
            global: { headers: { 'Cache-Control': 'no-store', ...authToken } },
            cookies: {
                get(name: string) {
                    return cookieStore.get(name)?.value;
                },
                set(name: string, value: string, options: CookieOptions) {
                    try {
                        cookieStore.set({ name, value, ...options });
                    } catch (error) {
                        // Handle the error
                    }
                },
                remove(name: string, options: CookieOptions) {
                    try {
                        cookieStore.set({ name, value: '', ...options });
                    } catch (error) {
                        // Handle the error
                    }
                },
            },
        },
    );
}
