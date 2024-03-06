import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/database.types';

declare global {
    interface Window {
        Clerk: {
            session?: {
                getToken: (options: { template: string }) => Promise<string>;
            };
        };
    }
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

function createClerkSupabaseClient() {
    return createClient<Database>(
        supabaseUrl,
        supabaseAnonKey,
        {
            global: {
                // Get the Supabase token with a custom fetch method
                fetch: async (url, options = {}) => {
                    const clerkToken = await window.Clerk.session?.getToken({ template: 'supabase' });

                    // Construct fetch headers
                    const headers = new Headers(options?.headers);
                    headers.set('Authorization', `Bearer ${clerkToken}`);

                    // Now call the default fetch
                    return fetch(url, {
                        ...options,
                        headers,
                    });
                },
            },
        },
    );
}

const supabase = createClerkSupabaseClient();

export default supabase;
