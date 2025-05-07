'use client';

import React, { useEffect, useState } from 'react';
import { ThemeProvider } from 'next-themes';

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  // Ensure we're mounted before rendering to avoid hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={true}
      forcedTheme={undefined}
      themes={['light', 'dark']}
      value={{
        dark: 'dark-theme',
        light: 'light-theme',
        system: 'system-theme'
      }}
    >
      {children}
    </ThemeProvider>
  );
} 