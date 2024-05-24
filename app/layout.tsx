import { SupabaseProvider } from '@/hooks/SupabaseContext';
import { ClerkProvider } from '@clerk/nextjs';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import { Toaster } from 'react-hot-toast';

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
    variable: '--font-poppins',
});

export const metadata: Metadata = {
    title: 'Todo App',
    description: 'Todo App with Nextjs, Supabase and Clerk',
};

export default function RootLayout({ children }: {
    children: React.ReactNode
}) {
    return (
        <ClerkProvider>
            <html lang="en">
                <head>
                    <link rel="icon" href="/favicon.ico" sizes="any" />
                </head>
                <body className={poppins.className}>
                    <SupabaseProvider>
                        <Toaster
                            position="bottom-right"
                            reverseOrder={false}
                            toastOptions={{
                                duration: 5000,
                                style: { background: '#333', color: '#fff' },
                            }}
                        />
                        {children}
                    </SupabaseProvider>
                </body>
            </html>
        </ClerkProvider>
    );
}
