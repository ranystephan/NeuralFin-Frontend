import { AuthProvider } from '@/contexts/AuthContext';
import '@/styles/globals.css';
import { Providers } from './providers';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <html lang="en" suppressHydrationWarning>
        <body suppressHydrationWarning>
          <Providers>{children}</Providers>
        </body>
      </html>
    </AuthProvider>
  );
}