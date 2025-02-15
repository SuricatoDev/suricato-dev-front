import { Stack } from 'expo-router';
import { useTheme } from 'styled-components/native';

const AccessInfoLayout = () => {
  return (
    <Stack>
      <Stack.Screen name='index' options={{ title: 'Access Info', headerShown: false }} />
      <Stack.Screen name='edit' options={{ title: 'Edit Access Info', headerShown: false }} />
    </Stack>
  );
};

export default AccessInfoLayout;
