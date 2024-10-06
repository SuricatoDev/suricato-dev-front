import { StatusBar } from 'react-native';
import { ThemeProvider } from 'styled-components';

import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_700Bold,
  Inter_600SemiBold,
} from '@expo-google-fonts/inter';

import theme from '@theme/index';

import { Loading } from '@components/Loading';
import { Home } from '@screens/Home';
import { AuthScreen } from '@screens/AuthScreen';

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  return (
    <ThemeProvider theme={theme}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      {fontsLoaded ? <AuthScreen /> : <Loading />}
    </ThemeProvider>
  );
}
