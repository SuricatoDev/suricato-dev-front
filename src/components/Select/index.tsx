import React, { useState } from 'react';
import { View } from 'react-native';
import { TextInput, Menu, HelperText } from 'react-native-paper';
import { useTheme } from 'styled-components/native';
import { CustomTextInput } from '../CustomTextInput';

interface Option {
  label: string;
  value: string;
}

interface SelectProps {
  label: string;
  value: string;
  onValueChange: (value: string) => void;
  error?: string;
  touched?: boolean;
  placeholder?: string;
  options: Option[];
}

export function Select({
  label,
  value,
  onValueChange,
  error,
  touched = false,
  placeholder = 'Selecione',
  options,
}: SelectProps) {
  const [visible, setVisible] = useState(false);

  const selectedLabel = options.find((opt) => opt.value === value)?.label || '';

  return (
    <View>
      <Menu
        style={{ marginTop: 78 }}
        visible={visible}
        onDismiss={() => setVisible(false)}
        anchor={
          <CustomTextInput
            mode='outlined'
            label={label}
            value={selectedLabel}
            placeholder={placeholder}
            onChangeText={() => {}}
            onFocus={() => setVisible(true)}
            right={<TextInput.Icon icon='menu-down' onPress={() => setVisible(true)} />}
            error={touched && !!error}
            showSoftInputOnFocus={false}
          />
        }
      >
        {options.map((option) => (
          <Menu.Item
            key={option.value}
            onPress={() => {
              onValueChange(option.value);
              setVisible(false);
            }}
            title={option.label}
          />
        ))}
      </Menu>
      {touched && error ? (
        <HelperText type='error' visible>
          {error}
        </HelperText>
      ) : null}
    </View>
  );
}
