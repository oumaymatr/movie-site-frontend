'use client';

import { ThemeProvider } from 'next-themes';
import React, { ReactNode } from 'react';

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider defaultTheme='system' attribute='class'>
      <div className='text-gray-800 dark:text-gray-200 dark:bg-gray-700 min-h-screen select-none transition-colors duration-300'>
        {children}
      </div>
    </ThemeProvider>
  );
}
