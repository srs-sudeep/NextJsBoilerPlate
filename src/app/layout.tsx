"use client"
// import { auth } from '@/lib/auth';
import Providers from '@/components/layout/providers';
import { Toaster } from '@/components/ui/sonner';
import type { Metadata } from 'next';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { Lato } from 'next/font/google';
import NextTopLoader from 'nextjs-toploader';
import './globals.css';
import ThemeProvider from '@/components/layout/ThemeToggle/theme-provider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useMemo, useState } from 'react';

const lato = Lato({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  display: 'swap'
});


export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(()=> new QueryClient({}))
  // const queryClient = new QueryClient();
  // const session = await auth();
  return (
    
    <html lang='en' className={`${lato.className}`} suppressHydrationWarning>
      <body className={'overflow-hidden'}>
      <QueryClientProvider client={queryClient}>
        <NextTopLoader showSpinner={false} />
        <NuqsAdapter>
          {/* <Providers session={session}> */}
            <Toaster />
            {children}
          {/* </Providers> */}
        </NuqsAdapter>
        </QueryClientProvider>
      </body>
    </html>
    
  );
}