import React from 'react';
import { KeyboardTypeOptions, View } from 'react-native';
import { TextInput, HelperText, TextInputProps } from 'react-native-paper';
import { useTheme } from 'styled-components/native';

type TextInputHandles = {
  focus: () => void;
  clear: () => void;
  blur: () => void;
  isFocused: () => boolean;
  setNativeProps: (args: Object) => void;
};

interface CustomTextInputProps extends TextInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  errorMessage?: string;
  hasError?: boolean;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
  style?: object;
  inputRef?: React.Ref<TextInputHandles>;
}

export function CustomTextInput({
  label,
  value,
  onChangeText,
  errorMessage,
  hasError = false,
  secureTextEntry = false,
  keyboardType = 'default',
  style,
  inputRef,
  ...rest
}: CustomTextInputProps) {
  const theme = useTheme();

  return (
    <View>
      <TextInput
        ref={(instance: TextInputHandles | null) => {
          if (typeof inputRef === 'function') {
            inputRef(instance as TextInputHandles);
          } else if (inputRef) {
            (inputRef as React.MutableRefObject<TextInputHandles | null>).current =
              instance as TextInputHandles | null;
          }
        }}
        mode='outlined'
        label={label}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        error={hasError}
        activeOutlineColor={theme.COLORS.text_soft}
        placeholderTextColor={theme.COLORS.text_ultra_soft}
        outlineColor={theme.COLORS.text_soft}
        style={[
          {
            backgroundColor: theme.COLORS.background,
            height: 46,
            fontSize: 14,
          },
          style,
        ]}
        {...rest}
      />
      {hasError && errorMessage && (
        <HelperText type='error' visible={hasError}>
          {errorMessage}
        </HelperText>
      )}
    </View>
  );
}
