import React, { useEffect, useState, useRef, useCallback } from 'react';
import { View, ActivityIndicator, Alert } from 'react-native';
import { useTheme } from 'styled-components/native';

import { fetchAddressByCep } from '@/services/fetchCepInfo';
import { CustomTextInput } from '@/components/CustomTextInput';
import { useFormContext } from '@/contexts/SignUpContext';

import * as S from './styles';
import { formatCEP } from '@/utils/formatValues';

export function Step4() {
  const { formData, setFormData, setValidation } = useFormContext();
  const theme = useTheme();

  const [loading, setLoading] = useState(false);
  const previousCep = useRef('');
  const [errors, setErrors] = useState<Partial<typeof formData>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof typeof formData, boolean>>>({});

  const logradouroRef = useRef<any>(null);
  const numeroRef = useRef<any>(null);
  const bairroRef = useRef<any>(null);
  const complementoRef = useRef<any>(null);
  const cidadeRef = useRef<any>(null);
  const ufRef = useRef<any>(null);

  const validateFields = useCallback(() => {
    const newErrors: Partial<typeof formData> = {};

    if (!formData.cep.trim() || formData.cep.replace(/\D/g, '').length < 8) {
      newErrors.cep = 'CEP inválido';
    }
    if (!formData.logradouro.trim()) {
      newErrors.logradouro = 'Logradouro é obrigatório';
    }
    if (!formData.bairro.trim()) {
      newErrors.bairro = 'Bairro é obrigatório';
    }
    if (!formData.cidade.trim()) {
      newErrors.cidade = 'Cidade é obrigatória';
    }
    if (!formData.uf.trim() || formData.uf.length !== 2) {
      newErrors.uf = 'UF inválida';
    }
    if (!formData.numero.trim()) {
      newErrors.numero = 'Número é obrigatório';
    }

    setErrors(newErrors);
    setValidation(4, Object.keys(newErrors).length === 0);
  }, [formData]);

  useEffect(() => {
    validateFields();
  }, [formData]);

  useEffect(() => {
    const rawCep = formData.cep.replace(/\D/g, '');
    if (rawCep.length === 8 && rawCep !== previousCep.current) {
      setLoading(true);
      previousCep.current = rawCep;
      fetchAddressByCep(rawCep)
        .then((data) => {
          setFormData({
            bairro: data.bairro || '',
            logradouro: data.logradouro || '',
            cidade: data.localidade || '',
            uf: data.uf || '',
          });
          setTouched((prev) => ({
            ...prev,
            logradouro: true,
            bairro: true,
            cidade: true,
            uf: true,
          }));
        })
        .catch(() => Alert.alert('Erro', 'Não foi possível buscar o endereço.'))
        .finally(() => {
          setLoading(false);
          previousCep.current = '';
        });
    } else if (rawCep.length < 8) {
      setLoading(false);
    }
  }, [formData.cep]);

  return (
    <S.Container>
      <View style={{ position: 'relative' }}>
        <CustomTextInput
          label='CEP*'
          value={formData.cep}
          placeholder='00000-000'
          keyboardType='numeric'
          onChangeText={(text) => setFormData({ cep: formatCEP(text) })}
          onFocus={() => setTouched((prev) => ({ ...prev, cep: true }))}
          hasError={touched.cep && !!errors.cep}
          errorMessage={touched.cep ? errors.cep : undefined}
          editable={!loading}
          returnKeyType='next'
          onSubmitEditing={() => logradouroRef.current?.focus()}
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

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 8 }}>
        <View style={{ flex: 0.7 }}>
          <CustomTextInput
            label='Logradouro*'
            value={formData.logradouro}
            placeholder='Digite seu logradouro'
            onChangeText={(text) => setFormData({ logradouro: text })}
            keyboardType='default'
            onFocus={() => setTouched((prev) => ({ ...prev, logradouro: true }))}
            hasError={touched.logradouro && !!errors.logradouro}
            errorMessage={touched.logradouro ? errors.logradouro : undefined}
            autoCapitalize='words'
            returnKeyType='next'
            onSubmitEditing={() => numeroRef.current?.focus()}
            inputRef={logradouroRef}
          />
        </View>
        <View style={{ flex: 0.3 }}>
          <CustomTextInput
            label='Número*'
            value={formData.numero}
            placeholder='1234'
            onChangeText={(text) => setFormData({ numero: text })}
            keyboardType='default'
            onFocus={() => setTouched((prev) => ({ ...prev, numero: true }))}
            hasError={touched.numero && !!errors.numero}
            returnKeyType='next'
            onSubmitEditing={() => bairroRef.current?.focus()}
            inputRef={numeroRef}
          />
        </View>
      </View>

      <CustomTextInput
        label='Bairro*'
        value={formData.bairro}
        placeholder='Digite seu bairro'
        onChangeText={(text) => setFormData({ bairro: text })}
        keyboardType='default'
        onFocus={() => setTouched((prev) => ({ ...prev, bairro: true }))}
        hasError={touched.bairro && !!errors.bairro}
        errorMessage={touched.bairro ? errors.bairro : undefined}
        autoCapitalize='words'
        returnKeyType='next'
        onSubmitEditing={() => complementoRef.current?.focus()}
        inputRef={bairroRef}
      />

      <CustomTextInput
        label='Complemento (opcional)'
        value={formData.complemento}
        placeholder='Casa, Apto, Bloco, etc.'
        onChangeText={(text) => setFormData({ complemento: text })}
        keyboardType='default'
        returnKeyType='next'
        onSubmitEditing={() => cidadeRef.current?.focus()}
        inputRef={complementoRef}
      />

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 8 }}>
        <View style={{ flex: 0.8 }}>
          <CustomTextInput
            label='Cidade*'
            value={formData.cidade}
            placeholder='Digite sua cidade'
            onChangeText={(text) => setFormData({ cidade: text })}
            keyboardType='default'
            onFocus={() => setTouched((prev) => ({ ...prev, cidade: true }))}
            hasError={touched.cidade && !!errors.cidade}
            errorMessage={touched.cidade ? errors.cidade : undefined}
            autoCapitalize='words'
            returnKeyType='next'
            onSubmitEditing={() => ufRef.current?.focus()}
            inputRef={cidadeRef}
          />
        </View>
        <View style={{ flex: 0.2 }}>
          <CustomTextInput
            label='UF*'
            value={formData.uf}
            placeholder='XX'
            onChangeText={(text) => setFormData({ uf: text })}
            keyboardType='default'
            autoCapitalize='characters'
            maxLength={2}
            onFocus={() => setTouched((prev) => ({ ...prev, uf: true }))}
            hasError={touched.uf && !!errors.uf}
            errorMessage={touched.uf ? errors.uf : undefined}
            returnKeyType='done'
            inputRef={ufRef}
            style={{ textAlign: 'center', textTransform: 'uppercase' }}
          />
        </View>
      </View>
    </S.Container>
  );
}
