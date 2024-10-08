import React, { useState } from 'react';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { useTheme } from 'styled-components/native';
import { Calendar } from 'phosphor-react-native';
import * as S from './styles';
import { Label } from '@components/Label';
import { ErrorText } from '@components/ErrorText';
import { formatDate } from '@utils/validations';

interface DatePickerProps {
  label: string;
  value: string;
  onChange: (date: string) => void;
  onPress?: () => void;
  error?: string;
  touched?: boolean;
  placeholder?: string;
}

export function DatePicker({
  label,
  value,
  onChange,
  onPress,
  error,
  touched = false,
  placeholder = 'DD/MM/AAAA'
}: DatePickerProps) {
  const theme = useTheme();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [date, setDate] = useState(value ? new Date(value) : new Date());

  const isDateSelected = !!value;

  const hasError = touched && !!error;
  const isValid = touched && !error;

  const formattedDate = isDateSelected ? value : placeholder;

  return (
    <S.Container>
      <Label>{label}</Label>
      <S.DatePickerButton
        onPress={() => {
          if (onPress) onPress();
          setShowDatePicker(true);
        }}
        hasError={hasError}
        isValid={isValid}
      >
        <Calendar size={20} color={theme.COLORS.GRAY_300} style={{ marginRight: 8 }} />
        <S.DatePickerText isPlaceholder={!isDateSelected}>{formattedDate}</S.DatePickerText>
      </S.DatePickerButton>
      {touched && error && <ErrorText>{error}</ErrorText>}

      {showDatePicker && (
        <DateTimePicker
          mode="date"
          value={date}
          display="default"
          onChange={(event: DateTimePickerEvent, selectedDate?: Date) => {
            setShowDatePicker(false);

            if (event.type === 'set' && selectedDate) {
              const formattedDate = formatDate(selectedDate);
              onChange(formattedDate);
              setDate(selectedDate);
            }
          }}
        />
      )}
    </S.Container>
  );
}
