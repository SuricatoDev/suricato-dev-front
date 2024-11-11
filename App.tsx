import React from 'react';
import { StatusBar } from 'react-native';
import { ThemeProvider } from 'styled-components/native';
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_700Bold,
  Inter_600SemiBold
} from '@expo-google-fonts/inter';

import theme from '@theme/index';
import { Loading } from '@components/Loading';
import { Routes } from '@routes/index';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from '@store/index';

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold
  });

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ThemeProvider theme={theme}>
          <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
          {fontsLoaded ? <Routes /> : <Loading />}
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}
