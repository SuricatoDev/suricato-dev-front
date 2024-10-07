import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Masks } from 'react-native-mask-input';
import { useTheme } from 'styled-components/native';

import { MaskedInput } from '@components/MaskInput';
import { DatePicker } from '@components/DatePicker';
import { Select } from '@components/Select';

import { isValidCPF } from '@utils/validations';

import * as S from './Step3PF.styles';
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
      <MaskedInput
        label="Nome Completo"
        value={formData.fullName}
        onChangeText={text => setFormData({ fullName: text })}
        onFocus={() => setTouched(prev => ({ ...prev, fullName: true }))}
        error={
          touched.fullName && errors.fullName ? errors.fullName : undefined
        }
        touched={touched.fullName}
        placeholder="Digite seu nome completo"
      />

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          gap: 8,
        }}
      >
        <View style={{ flex: 0.6 }}>
          <Select
            label="Sexo"
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
            placeholder={{ label: 'Selecione o Sexo', value: '' }}
            error={touched.gender && errors.gender ? errors.gender : undefined}
            touched={touched.gender}
          />
        </View>
        <View style={{ flex: 0.4 }}>
          <DatePicker
            label="Data de Nascimento"
            value={formData.birthDate}
            onChange={date => setFormData({ birthDate: date })}
            onPress={() => setTouched(prev => ({ ...prev, birthDate: true }))}
            error={
              touched.birthDate && errors.birthDate
                ? errors.birthDate
                : undefined
            }
            touched={touched.birthDate}
          />
        </View>
      </View>
      <MaskedInput
        label="CPF"
        value={formData.cpf}
        maskType={Masks.BRL_CPF}
        onChangeText={text => setFormData({ cpf: text })}
        onFocus={() => setTouched(prev => ({ ...prev, cpf: true }))}
        error={touched.cpf && errors.cpf ? errors.cpf : undefined}
        touched={touched.cpf}
      />

      <MaskedInput
        label="Telefone"
        value={formData.telefone}
        maskType={Masks.BRL_PHONE}
        onChangeText={text => setFormData({ telefone: text })}
        onFocus={() => setTouched(prev => ({ ...prev, telefone: true }))}
        error={
          touched.telefone && errors.telefone ? errors.telefone : undefined
        }
        touched={touched.telefone}
      />
    </S.Container>
  );
}
