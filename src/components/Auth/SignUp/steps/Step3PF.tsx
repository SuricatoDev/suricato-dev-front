import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Masks } from 'react-native-mask-input';

import { MaskedInput } from '@components/MaskInput';
import { DatePicker } from '@components/DatePicker';
import { Select } from '@components/Select';

import { isValidCPF } from '@utils/validations';
import { getPhoneMask } from '@utils/phoneNumberMask';

import { useFormContext } from '@contexts/SignUpContext';
import * as S from './styles';

export function Step3PF() {
  const { formData, setFormData, setValidation } = useFormContext();
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
    const fullNameRegex = /^[A-Za-z]{2,}(?:\s[A-Za-z]{2,})+$/;

    if (formData.fullName.trim() === '') {
      newErrors.fullName = 'Nome completo é obrigatório.';
    } else if (!fullNameRegex.test(formData.fullName.trim())) {
      newErrors.fullName = 'Digite o nome completo com pelo menos dois nomes';
    }
    if (formData.gender.trim() === '') newErrors.gender = 'Sexo é obrigatório.';
    if (formData.birthDate.trim() === '') newErrors.birthDate = 'Data de nascimento é obrigatória.';
    if (formData.cpf.trim() === '' || !isValidCPF(formData.cpf)) {
      newErrors.cpf = 'CPF inválido.';
    }
    if (formData.telefone.trim() === '' || !/^(\(\d{2}\) \d{4}-\d{4}|\(\d{2}\) \d{5}-\d{4})$/.test(formData.telefone)) {
      newErrors.telefone = 'Telefone inválido.';
    }

    setErrors(newErrors);
    setValidation(3, Object.keys(newErrors).length === 0);
  }, [formData]);

  const handleFullNameChange = (text: string) => {
    const filteredText = text.replace(/[^A-Za-z\s]/g, '');
    setFormData({ fullName: filteredText });
  };

  return (
    <S.Container>
      <MaskedInput
        label="Nome Completo*"
        value={formData.fullName}
        onChangeText={handleFullNameChange}
        onFocus={() => setTouched(prev => ({ ...prev, fullName: true }))}
        error={touched.fullName && errors.fullName ? errors.fullName : undefined}
        touched={touched.fullName}
        placeholder="Digite seu nome completo"
        autoCapitalize="words"
      />

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          gap: 8
        }}
      >
        <View style={{ flex: 0.6 }}>
          <Select
            label="Sexo*"
            value={formData.gender}
            onValueChange={value => {
              setFormData({ gender: value });
              setTouched(prev => ({ ...prev, gender: true }));
            }}
            items={[
              { label: 'Masculino', value: 'M' },
              { label: 'Feminino', value: 'F' },
              { label: 'Outro', value: 'O' },
              { label: 'Prefiro não informar', value: 'NA' }
            ]}
            placeholder={{ label: 'Selecione o sexo', value: '' }}
            error={touched.gender && errors.gender ? errors.gender : undefined}
            touched={touched.gender}
          />
        </View>
        <View style={{ flex: 0.4 }}>
          <DatePicker
            label="Data de Nascimento*"
            value={formData.birthDate}
            onChange={date => setFormData({ birthDate: date })}
            onPress={() => setTouched(prev => ({ ...prev, birthDate: true }))}
            error={touched.birthDate && errors.birthDate ? errors.birthDate : undefined}
            touched={touched.birthDate}
          />
        </View>
      </View>
      <MaskedInput
        label="CPF*"
        value={formData.cpf}
        maskType={Masks.BRL_CPF}
        onChangeText={text => setFormData({ cpf: text })}
        onFocus={() => setTouched(prev => ({ ...prev, cpf: true }))}
        error={touched.cpf && errors.cpf ? errors.cpf : undefined}
        touched={touched.cpf}
      />

      <MaskedInput
        label="Telefone*"
        value={formData.telefone}
        maskType={getPhoneMask}
        onChangeText={text => setFormData({ telefone: text })}
        onFocus={() => setTouched(prev => ({ ...prev, telefone: true }))}
        error={touched.telefone && errors.telefone ? errors.telefone : undefined}
        touched={touched.telefone}
      />
    </S.Container>
  );
}
