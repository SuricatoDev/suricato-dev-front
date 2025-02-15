import React, { useEffect, useState, useRef } from 'react';
import { View, ActivityIndicator, Alert } from 'react-native';
import { useTheme } from 'styled-components/native';
import { fetchCNPJInfo, CNPJData } from '@/services/fetchCnpjInfo';
import { CustomTextInput } from '@/components/CustomTextInput';
import { useFormContext } from '@/contexts/SignUpContext';
import * as S from './styles';
import { formatCNPJ, formatPhone } from '@/utils/formatValues';

export function Step3PJ() {
  const { formData, setFormData, setValidation } = useFormContext();
  const theme = useTheme();

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{
    cnpj?: string;
    razaoSocial?: string;
    nomeFantasia?: string;
    telefone?: string;
  }>({});
  const [touched, setTouched] = useState<{
    cnpj?: boolean;
    razaoSocial?: boolean;
    nomeFantasia?: boolean;
    telefone?: boolean;
  }>({});

  const previousCnpj = useRef('');

  useEffect(() => {
    const newErrors: any = {};

    const rawCNPJ = formData.cnpj.replace(/\D/g, '');
    if (!formData.cnpj.trim() || rawCNPJ.length !== 14) {
      newErrors.cnpj = 'CNPJ inválido';
    }

    if (!formData.razaoSocial.trim()) {
      newErrors.razaoSocial = 'Razão social é obrigatória.';
    }

    if (!formData.telefone.trim() || !/^(\(\d{2}\) \d{4,5}-\d{4})$/.test(formData.telefone)) {
      newErrors.telefone = 'Telefone inválido.';
    }

    setErrors(newErrors);
    setValidation(3, Object.keys(newErrors).length === 0);
  }, [formData]);

  const handleCNPJChange = async (text: string) => {
    const formattedCNPJ = formatCNPJ(text);
    setFormData({ cnpj: formattedCNPJ });
    const rawCNPJ = formattedCNPJ.replace(/\D/g, '');
    if (rawCNPJ.length === 14 && rawCNPJ !== previousCnpj.current) {
      setLoading(true);
      previousCnpj.current = rawCNPJ;
      try {
        const cnpjData: CNPJData = await fetchCNPJInfo(rawCNPJ);
        setFormData({
          razaoSocial: cnpjData.razaoSocial,
          nomeFantasia: cnpjData.nomeFantasia,
          telefone: cnpjData.telefone?.match(/\(\d{2}\) \d{4,5}-\d{4}/)?.[0] || '',
          logradouro: cnpjData.logradouro,
          numero: cnpjData.numero,
          bairro: cnpjData.bairro,
          cidade: cnpjData.cidade,
          uf: cnpjData.uf,
          cep: cnpjData.cep,
          cnpj: formattedCNPJ,
        });
        setTouched({
          cnpj: true,
          razaoSocial: true,
          telefone: true,
        });
      } catch {
        setValidation(3, false);
        Alert.alert('Atenção', 'CNPJ não encontrado. Por favor, preencha os dados manualmente.');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <S.Container>
      <View style={{ position: 'relative' }}>
        <CustomTextInput
          label='CNPJ*'
          value={formData.cnpj}
          placeholder='00.000.000/0000-00'
          keyboardType='numeric'
          onChangeText={handleCNPJChange}
          onFocus={() => setTouched((prev) => ({ ...prev, cnpj: true }))}
          hasError={touched.cnpj && !!errors.cnpj}
          errorMessage={touched.cnpj ? errors.cnpj : undefined}
          editable={!loading}
          style={{ paddingRight: 35 }}
        />
        {loading && (
          <ActivityIndicator
            size='small'
            color={theme.COLORS.text_soft}
            style={{ position: 'absolute', right: 12, top: 20 }}
          />
        )}
      </View>

      <CustomTextInput
        label='Razão Social*'
        value={formData.razaoSocial}
        placeholder='Digite a Razão Social'
        keyboardType='default'
        onChangeText={(text) => setFormData({ razaoSocial: text })}
        onFocus={() => setTouched((prev) => ({ ...prev, razaoSocial: true }))}
        hasError={touched.razaoSocial && !!errors.razaoSocial}
        errorMessage={touched.razaoSocial ? errors.razaoSocial : undefined}
        autoCapitalize='words'
        editable={!loading}
      />

      <CustomTextInput
        label='Nome Fantasia'
        value={formData.nomeFantasia}
        placeholder='Digite o Nome Fantasia'
        keyboardType='default'
        onChangeText={(text) => setFormData({ nomeFantasia: text })}
        onFocus={() => setTouched((prev) => ({ ...prev, nomeFantasia: true }))}
        editable={!loading}
      />

      <CustomTextInput
        label='Telefone*'
        value={formData.telefone}
        placeholder='(00) 00000-0000'
        keyboardType='phone-pad'
        onChangeText={(text) => setFormData({ telefone: formatPhone(text) })}
        onFocus={() => setTouched((prev) => ({ ...prev, telefone: true }))}
        hasError={touched.telefone && !!errors.telefone}
        errorMessage={touched.telefone ? errors.telefone : undefined}
        editable={!loading}
      />
    </S.Container>
  );
}
