import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useFormContext } from '@/contexts/SignUpContext';
import { isValidCPF } from '@/utils/validations';
import { CustomTextInput } from '@/components/CustomTextInput';
import * as S from './styles';
import { DatePicker } from '@/components/DatePicker';
import { Select } from '@/components/Select';
import { formatCPF, formatPhone } from '@/utils/formatValues';

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
    const newErrors: Record<string, string> = {};

    const fullName = formData.fullName.trim();
    if (!fullName) {
      newErrors.fullName = 'Nome completo é obrigatório.';
    } else {
      const fullNameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ]{2,}(?:\s[A-Za-zÀ-ÖØ-öø-ÿ]{2,})+$/;
      if (!fullNameRegex.test(fullName)) {
        newErrors.fullName = 'Digite o nome completo';
      }
    }

    if (!formData.gender.trim()) {
      newErrors.gender = 'Sexo é obrigatório.';
    }

    if (!formData.birthDate.trim()) {
      newErrors.birthDate = 'Data de nascimento é obrigatória.';
    }

    if (!formData.cpf.trim()) {
      newErrors.cpf = 'CPF é obrigatório.';
    } else if (!isValidCPF(formData.cpf)) {
      newErrors.cpf = 'CPF inválido.';
    }

    if (!formData.telefone.trim()) {
      newErrors.telefone = 'Telefone é obrigatório.';
    } else {
      const phoneRegex = /^(\(\d{2}\) \d{4,5}-\d{4})$/;
      if (!phoneRegex.test(formData.telefone)) {
        newErrors.telefone = 'Telefone inválido.';
      }
    }

    setErrors(newErrors);
    setValidation(3, Object.keys(newErrors).length === 0);
  }, [formData]);

  return (
    <S.Container>
      <CustomTextInput
        label='Nome Completo*'
        value={formData.fullName}
        placeholder='Digite seu nome completo'
        autoCapitalize='words'
        onChangeText={(text) =>
          setFormData({ fullName: text.replace(/[^A-Za-zÀ-ÖØ-öø-ÿ\s]/g, '') })
        }
        onFocus={() => setTouched((prev) => ({ ...prev, fullName: true }))}
        hasError={touched.fullName && !!errors.fullName}
        errorMessage={touched.fullName ? errors.fullName : undefined}
      />

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          gap: 8,
        }}
      >
        <View style={{ flex: 0.55 }}>
          <Select
            label='Sexo*'
            value={formData.gender}
            onValueChange={(value) => setFormData({ gender: value })}
            placeholder='Selecione o sexo'
            options={[
              { label: 'Masculino', value: 'M' },
              { label: 'Feminino', value: 'F' },
              { label: 'Outro', value: 'O' },
              { label: 'Prefiro não informar', value: 'NA' },
            ]}
            error={touched.gender ? errors.gender : undefined}
            touched={touched.gender}
          />
        </View>
        <View style={{ flex: 0.45 }}>
          <DatePicker
            label='Nascimento*'
            value={formData.birthDate}
            error={touched.birthDate ? errors.birthDate : undefined}
            touched={touched.birthDate}
            placeholder='DD/MM/AAAA'
            minimumAge={18}
            onChange={(date) => setFormData({ birthDate: date })}
          />
        </View>
      </View>

      <CustomTextInput
        label='CPF*'
        value={formData.cpf}
        placeholder='000.000.000-00'
        keyboardType='numeric'
        onChangeText={(text) => setFormData({ cpf: formatCPF(text) })}
        onFocus={() => setTouched((prev) => ({ ...prev, cpf: true }))}
        hasError={touched.cpf && !!errors.cpf}
        errorMessage={touched.cpf ? errors.cpf : undefined}
      />

      <CustomTextInput
        label='Celular*'
        value={formData.telefone}
        placeholder='(00) 00000-0000'
        keyboardType='phone-pad'
        onChangeText={(text) => setFormData({ telefone: formatPhone(text) })}
        onFocus={() => setTouched((prev) => ({ ...prev, telefone: true }))}
        hasError={touched.telefone && !!errors.telefone}
        errorMessage={touched.telefone ? errors.telefone : undefined}
      />
    </S.Container>
  );
}
