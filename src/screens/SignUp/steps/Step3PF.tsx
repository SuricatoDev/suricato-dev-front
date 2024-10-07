import React, { useEffect, useState } from 'react';
import RNPickerSelect from 'react-native-picker-select';
import DateTimePicker from '@react-native-community/datetimepicker';
import { TextInputMask } from 'react-native-masked-text';
import { useTheme } from 'styled-components/native';
import { CaretDown } from 'phosphor-react-native';

import { Label } from '@components/Label';
import { Input } from '@components/Input';

import * as S from './Step3PF.styles';
import { formatDate, isValidCPF } from '@utils/validations';

interface Step3PFProps {
  formData: {
    cpf: string;
    telefone: string;
    fullName: string;
    gender: string;
    birthDate: string;
  };
  setFormData: (data: Partial<Step3PFProps['formData']>) => void;
  onValidate: (isValid: boolean) => void;
}

export function Step3PF({ formData, setFormData, onValidate }: Step3PFProps) {
  const theme = useTheme();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [date, setDate] = useState(
    formData.birthDate ? new Date(formData.birthDate) : new Date(),
  );

  const [errors, setErrors] = useState<{
    fullName?: string;
    gender?: string;
    birthDate?: string;
    cpf?: string;
    telefone?: string;
  }>({});
  const [touched, setTouched] = useState<{
    fullName?: boolean;
    gender?: boolean;
    birthDate?: boolean;
    cpf?: boolean;
    telefone?: boolean;
  }>({});

  useEffect(() => {
    const newErrors: any = {};

    if (formData.fullName.trim() === '')
      newErrors.fullName = 'Nome completo é obrigatório.';
    if (formData.gender.trim() === '') newErrors.gender = 'Sexo é obrigatório.';
    if (formData.birthDate.trim() === '')
      newErrors.birthDate = 'Data de nascimento é obrigatória.';
    if (formData.cpf.trim() === '' || !isValidCPF(formData.cpf)) {
      newErrors.cpf = 'CPF inválido.';
    }
    if (
      formData.telefone.trim() === '' ||
      !/^\(\d{2}\) \d{5}-\d{4}$/.test(formData.telefone)
    ) {
      newErrors.telefone = 'Telefone inválido.';
    }

    setErrors(newErrors);
    onValidate(Object.keys(newErrors).length === 0);
  }, [formData, onValidate]);

  return (
    <S.Container>
      <Label>Nome Completo</Label>
      <Input
        value={formData.fullName}
        placeholder="Digite seu Nome Completo"
        onChangeText={text => setFormData({ fullName: text })}
        onFocus={() => setTouched(prev => ({ ...prev, fullName: true }))}
      />
      {touched.fullName && errors.fullName && (
        <S.ErrorText>{errors.fullName}</S.ErrorText>
      )}

      <Label>Sexo</Label>
      <RNPickerSelect
        value={formData.gender}
        onValueChange={value => {
          setFormData({ gender: value });
          setTouched(prev => ({ ...prev, gender: true }));
        }}
        items={[
          { label: 'Masculino', value: 'M' },
          { label: 'Feminino', value: 'F' },
          { label: 'Outro', value: 'O' },
          { label: 'Prefiro não informar', value: 'NA' },
        ]}
        style={{
          inputIOS: {
            height: 46,
            fontSize: 16,

            paddingHorizontal: 16,
            borderWidth: 1,
            borderColor: theme.COLORS.GRAY_100,
            borderRadius: 10,
            color: theme.COLORS.GRAY_600,
            backgroundColor: theme.COLORS.WHITE,
            fontFamily: theme.FONT_FAMILY.MEDIUM,
            paddingRight: 30,
          },
          inputAndroid: {
            height: 46,
            fontSize: 16,

            paddingHorizontal: 16,
            borderWidth: 1,
            borderColor: theme.COLORS.GRAY_100,
            borderRadius: 10,
            color: theme.COLORS.GRAY_600,
            backgroundColor: theme.COLORS.WHITE,
            fontFamily: theme.FONT_FAMILY.MEDIUM,
            paddingRight: 30,
          },
          placeholder: {
            color: theme.COLORS.GRAY_300,
          },
          iconContainer: {
            top: 16,
            right: 12,
          },
        }}
        placeholder={{ label: 'Selecione o Sexo', value: '' }}
        useNativeAndroidPickerStyle={false}
        Icon={() => <CaretDown size={20} color="#A0A0A0" />}
      />
      {touched.gender && errors.gender && (
        <S.ErrorText>{errors.gender}</S.ErrorText>
      )}

      <Label>Data de Nascimento</Label>
      <S.DatePickerButton
        onPress={() => {
          setShowDatePicker(true);
          setTouched(prev => ({ ...prev, birthDate: true }));
        }}
      >
        <S.DatePickerText isPlaceholder={!formData.birthDate}>
          {formData.birthDate
            ? formData.birthDate
            : 'Selecione a data de nascimento'}
        </S.DatePickerText>
      </S.DatePickerButton>
      {touched.birthDate && errors.birthDate && (
        <S.ErrorText>{errors.birthDate}</S.ErrorText>
      )}

      {showDatePicker && (
        <DateTimePicker
          mode="date"
          value={date}
          display="default"
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) {
              const formattedDate = formatDate(selectedDate);
              setFormData({ birthDate: formattedDate });
              setDate(selectedDate);
            }
          }}
        />
      )}

      <Label>CPF</Label>
      <TextInputMask
        type={'cpf'}
        value={formData.cpf}
        onChangeText={text => setFormData({ cpf: text })}
        style={{
          height: 46,
          borderColor: theme.COLORS.GRAY_100,
          borderWidth: 1,
          borderRadius: 10,
          fontSize: 16,
          paddingHorizontal: 16,
          color: theme.COLORS.GRAY_600,
          backgroundColor: theme.COLORS.WHITE,
          fontFamily: theme.FONT_FAMILY.MEDIUM,
        }}
        placeholder="Digite seu CPF"
        placeholderTextColor={theme.COLORS.GRAY_300}
        onFocus={() => setTouched(prev => ({ ...prev, cpf: true }))}
      />
      {touched.cpf && errors.cpf && <S.ErrorText>{errors.cpf}</S.ErrorText>}

      <Label>Telefone</Label>
      <TextInputMask
        type={'cel-phone'}
        options={{
          maskType: 'BRL',
          withDDD: true,
          dddMask: '(99) ',
        }}
        value={formData.telefone}
        onChangeText={text => setFormData({ telefone: text })}
        style={{
          height: 46,
          borderColor: theme.COLORS.GRAY_100,
          borderWidth: 1,
          borderRadius: 10,
          fontSize: 16,
          paddingHorizontal: 16,
          color: theme.COLORS.GRAY_600,
          backgroundColor: theme.COLORS.WHITE,
          fontFamily: theme.FONT_FAMILY.MEDIUM,
        }}
        placeholder="Digite seu Telefone"
        placeholderTextColor={theme.COLORS.GRAY_300}
        onFocus={() => setTouched(prev => ({ ...prev, telefone: true }))}
      />
      {touched.telefone && errors.telefone && (
        <S.ErrorText>{errors.telefone}</S.ErrorText>
      )}
    </S.Container>
  );
}
