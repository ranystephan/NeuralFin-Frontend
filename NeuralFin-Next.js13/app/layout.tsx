import '../styles/globals.css';

type RootLayoutProps = {
  children: React.ReactNode;
}

const RootLayout = ({ children } : RootLayoutProps) => (
  <html lang="en">
    <head>
      <link rel="preconnect" href="https://stijndv.com" />
      <link rel="stylesheet" href="https://stijndv.com/fonts/Eudoxus-Sans.css" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link href="https://fonts.googleapis.com/css2?family=Crimson+Text&display=swap" rel="stylesheet" />
      
    </head>
    <body>{children}</body>
  </html>
);

export default RootLayout;