import Head from 'next/head';
import './styles/globals.css';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <html lang="en">
        <Head>
          <html lang="en" />
          <link rel="preconnect" href="https://stijndv.com" />
          <link rel="stylesheet" href="https://stijndv.com/fonts/Eudoxus-Sans.css" />
        </Head>
        <body>{children}</body>
      </html>
    </>
  );
};

export default Layout;
