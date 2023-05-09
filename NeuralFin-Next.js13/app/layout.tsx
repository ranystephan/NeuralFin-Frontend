import { AuthProvider } from '@/contexts/AuthContext';
import Head from 'next/head';
import '@/styles/globals.css';


interface RootLayoutProps {
  children: React.ReactNode;
}



const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <AuthProvider>
      <html lang="en">
        <Head>
        </Head>
        <body>
          {children}
        </body>
      </html>
    </AuthProvider>
  );
};

export default RootLayout;
