import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, Alert } from 'react-native';
import { useTheme } from 'styled-components/native';
import { Masks } from 'react-native-mask-input';
import { MaskedInput } from '@components/MaskInput';
import { Input } from '@components/Input';
import { fetchCNPJInfo, CNPJData } from '@services/fetchCnpjInfo';

import * as S from './styles';
import { getPhoneMask } from '@utils/phoneNumberMask';

interface Step3PJProps {
  formData: {
    cnpj: string;
    razaoSocial: string;
    nomeFantasia: string;
    telefone: string;
    logradouro: string;
    numero: string;
    bairro: string;
    cidade: string;
    cep: string;
    uf: string;
  };
  setFormData: (data: Partial<Step3PJProps['formData']>) => void;
  onValidate: (isValid: boolean) => void;
}

export function Step3PJ({ formData, setFormData, onValidate }: Step3PJProps) {
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

  useEffect(() => {
    const newErrors: any = {};

    if (formData.cnpj.trim() === '' || formData.cnpj.replace(/\D/g, '').length !== 14) {
      newErrors.cnpj = 'CNPJ inválido';
    }

    if (formData.razaoSocial.trim() === '') {
      newErrors.razaoSocial = 'Razão social é obrigatória.';
    }

    if (formData.telefone.trim() === '' || !/^(\(\d{2}\) \d{4}-\d{4}|\(\d{2}\) \d{5}-\d{4})$/.test(formData.telefone)) {
      newErrors.telefone = 'Telefone inválido.';
    }

    setErrors(newErrors);
    onValidate(Object.keys(newErrors).length === 0);
  }, [formData, onValidate]);

  const handleCNPJChange = async (text: string) => {
    setFormData({ cnpj: text });

    const formattedCNPJ = text.replace(/\D/g, '');
    if (formattedCNPJ.length === 14) {
      setLoading(true);

      try {
        const cnpjData: CNPJData = await fetchCNPJInfo(formattedCNPJ);
        const telefone = cnpjData.telefone ? cnpjData.telefone.match(/\(\d{2}\) \d{4,5}-\d{4}/)?.[0] || '' : '';

        setFormData({
          razaoSocial: cnpjData.razaoSocial,
          nomeFantasia: cnpjData.nomeFantasia,
          telefone: telefone,
          logradouro: cnpjData.logradouro,
          numero: cnpjData.numero,
          bairro: cnpjData.bairro,
          cidade: cnpjData.cidade,
          uf: cnpjData.uf,
          cep: cnpjData.cep
        });

        setTouched({
          cnpj: true,
          razaoSocial: true,
          nomeFantasia: true,
          telefone: true
        });
      } catch {
        setErrors(prevErrors => ({
          ...prevErrors,
          cnpj: 'CNPJ inválido ou não encontrado'
        }));
        onValidate(false);
        Alert.alert('Erro', 'Não foi possível buscar as informações do CNPJ.');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <S.Container>
      <View style={{ position: 'relative' }}>
        <MaskedInput
          label="CNPJ*"
          value={formData.cnpj}
          maskType={Masks.BRL_CNPJ}
          onChangeText={handleCNPJChange}
          onFocus={() => setTouched(prev => ({ ...prev, cnpj: true }))}
          error={touched.cnpj && errors.cnpj ? errors.cnpj : undefined}
          touched={touched.cnpj}
          placeholder="00.000.000/0000-00"
          editable={!loading}
          style={{ paddingRight: 35 }}
        />
        {loading && (
          <ActivityIndicator
            size="small"
            color={theme.COLORS.GRAY_500}
            style={{
              position: 'absolute',
              right: 12,
              top: 52
            }}
          />
        )}
      </View>

      <Input
        label="Razão Social*"
        value={formData.razaoSocial}
        onChangeText={text => setFormData({ razaoSocial: text })}
        onFocus={() => setTouched(prev => ({ ...prev, razaoSocial: true }))}
        error={touched.razaoSocial && errors.razaoSocial ? errors.razaoSocial : undefined}
        touched={touched.razaoSocial}
        placeholder="Digite a Razão Social"
        autoCapitalize="words"
        editable={!loading}
      />

      <Input
        label="Nome Fantasia"
        value={formData.nomeFantasia}
        onChangeText={text => setFormData({ nomeFantasia: text })}
        onFocus={() => setTouched(prev => ({ ...prev, nomeFantasia: true }))}
        touched={touched.nomeFantasia}
        placeholder="Digite o Nome Fantasia"
        autoCapitalize="words"
        editable={!loading}
      />

      <MaskedInput
        label="Telefone*"
        value={formData.telefone}
        maskType={getPhoneMask}
        onChangeText={text => setFormData({ telefone: text })}
        onFocus={() => setTouched(prev => ({ ...prev, telefone: true }))}
        error={touched.telefone && errors.telefone ? errors.telefone : undefined}
        touched={touched.telefone}
        placeholder="(00) 0000-0000"
        editable={!loading}
      />
    </S.Container>
  );
}
