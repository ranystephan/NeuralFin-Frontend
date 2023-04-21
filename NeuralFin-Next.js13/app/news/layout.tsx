import Head from 'next/head';
import './styles/globals.css';

type RootLayoutProps = {
  children: React.ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => (
  <>
    <Head>
      <html lang="en" />
      <link rel="preconnect" href="https://stijndv.com" />
      <link rel="stylesheet" href="https://stijndv.com/fonts/Eudoxus-Sans.css" />
    </Head>
    <body>{children}</body>
  </>
);

export default RootLayout;
