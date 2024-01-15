import { ClerkProvider } from '@clerk/nextjs';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';

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
                <body className={poppins.className}>{children}</body>
            </html>
        </ClerkProvider>
    );
}
