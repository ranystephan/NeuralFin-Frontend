import { AuthProvider } from '@/contexts/AuthContext';
import Head from 'next/head';
import '../styles/globals.css';

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <AuthProvider>
      <html lang="en">
        <Head>
          <html lang="en" />
          <link rel="preconnect" href="https://stijndv.com" />
          <link rel="stylesheet" href="https://stijndv.com/fonts/Eudoxus-Sans.css" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link href="https://fonts.googleapis.com/css2?family=Crimson+Text&display=swap" rel="stylesheet" />
          <script src="https://kit.fontawesome.com/c8331e70b8.js" crossOrigin="anonymous"></script>
        </Head>
        <body>{children}</body>
      </html>
    </AuthProvider>
  );
};

export default RootLayout;
