import React from 'react';
import { AppProps } from 'next/app';
import RootLayout from '@/app/layout';
import { AuthProvider } from '@/contexts/AuthContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <RootLayout>
        <Component {...pageProps} />
      </RootLayout>
    </AuthProvider>
  );
}

export default MyApp;
