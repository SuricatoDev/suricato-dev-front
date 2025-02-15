import React, { useState, useEffect } from 'react';
import { Platform, Modal, View } from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { HelperText, TextInput } from 'react-native-paper';
import { useTheme } from 'styled-components/native';
import { CustomTextInput } from '../CustomTextInput';
import Button from '@/components/Button';

interface DatePickerProps {
  label: string;
  value: string;
  onChange: (date: string) => void;
  error?: string;
  touched?: boolean;
  placeholder?: string;
  minimumAge?: number;
}

export function DatePicker({
  label,
  value,
  onChange,
  error,
  touched = false,
  placeholder = 'DD/MM/AAAA',
  minimumAge,
}: DatePickerProps) {
  const theme = useTheme();
  const [show, setShow] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(() => {
    if (value) {
      const [day, month, year] = value.split('/');
      return new Date(Number(year), Number(month) - 1, Number(day));
    }
    return new Date();
  });

  useEffect(() => {
    if (value) {
      const [day, month, year] = value.split('/');
      setSelectedDate(new Date(Number(year), Number(month) - 1, Number(day)));
    }
  }, [value]);

  const maximumAllowedDate =
    typeof minimumAge === 'number'
      ? new Date(new Date().getFullYear() - minimumAge, new Date().getMonth(), new Date().getDate())
      : undefined;

  const handleChange = (event: DateTimePickerEvent, date?: Date) => {
    if (Platform.OS === 'android') {
      setShow(false);
    }
    if (date) {
      setSelectedDate(date);
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();
      const formatted = `${day}/${month}/${year}`;
      onChange(formatted);
    }
  };

  return (
    <View>
      <CustomTextInput
        label={label}
        value={value || ''}
        placeholder={placeholder}
        onFocus={() => setShow(true)}
        onChangeText={() => {}}
        showSoftInputOnFocus={false}
        right={<TextInput.Icon icon='calendar' onPress={() => setShow(true)} />}
        errorMessage={error}
        hasError={touched && !!error}
      />

      {show && (
        <>
          {Platform.OS === 'ios' ? (
            <Modal transparent animationType='slide'>
              <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                <View style={{ backgroundColor: theme.COLORS.background, padding: 16 }}>
                  <DateTimePicker
                    value={selectedDate}
                    mode='date'
                    display='spinner'
                    onChange={handleChange}
                    style={{ backgroundColor: theme.COLORS.background }}
                    maximumDate={maximumAllowedDate}
                    textColor={theme.COLORS.primary}
                  />
                  <Button onPress={() => setShow(false)}>Fechar</Button>
                </View>
              </View>
            </Modal>
          ) : (
            <DateTimePicker
              value={selectedDate}
              mode='date'
              display='spinner'
              onChange={handleChange}
              maximumDate={maximumAllowedDate}
              textColor={theme.COLORS.primary}
            />
          )}
        </>
      )}
      {touched && error ? (
        <HelperText type='error' visible>
          {error}
        </HelperText>
      ) : null}
    </View>
  );
}
