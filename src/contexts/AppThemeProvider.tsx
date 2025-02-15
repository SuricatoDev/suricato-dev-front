import React from 'react';
import { ThemeProvider } from 'styled-components/native';
import { useColorScheme } from 'react-native';
import { themes } from '@/theme';

export function AppThemeProvider({ children }: { children: React.ReactNode }) {
  const colorScheme = useColorScheme();
  const theme = themes[colorScheme === 'dark' ? 'dark' : 'light'];

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
