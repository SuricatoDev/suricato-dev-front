import { View, type ViewProps } from 'react-native';
import { useTheme } from 'styled-components/native';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedView({ style, lightColor, darkColor, ...otherProps }: ThemedViewProps) {
  const theme = useTheme();
  const backgroundColor = theme.COLORS.background;

  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}
