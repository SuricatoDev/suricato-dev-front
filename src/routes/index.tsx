import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';
import { AppRoutes } from './app.routes';

export function Routes() {
  return (
    <View style={{ flex: 1 }}>
      <PaperProvider>
        <NavigationContainer>
          <AppRoutes />
        </NavigationContainer>
      </PaperProvider>
    </View>
  );
}
