import { View, ActivityIndicator, Alert } from 'react-native';
import { useEffect, useState, useRef } from 'react';
import { useTheme } from 'styled-components/native';
import { Masks } from 'react-native-mask-input';

import { fetchAddressByCep } from '@services/fetchCepInfo';

import { Input } from '@components/Input';
import { MaskedInput } from '@components/MaskInput';

import { useFormContext } from '@contexts/SignUpContext';

import * as S from './styles';

export function Step4PF() {
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

  const validateFields = () => {
    const newErrors: Partial<typeof formData> = {};

    if (formData.cep.trim() === '' || formData.cep.length < 8) {
      newErrors.cep = 'CEP inválido';
    }
    if (formData.bairro.trim() === '') newErrors.bairro = 'Bairro é obrigatório';
    if (formData.logradouro.trim() === '') newErrors.logradouro = 'Logradouro é obrigatório';
    if (formData.cidade.trim() === '') newErrors.cidade = 'Cidade é obrigatória';
    if (formData.uf.trim() === '' || formData.uf.length !== 2) newErrors.uf = 'UF inválida';
    if (formData.numero.trim() === '') newErrors.numero = 'Número é obrigatório';

    setErrors(newErrors);
    setValidation(4, Object.keys(newErrors).length === 0);
  };

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
            bairro: true,
            logradouro: true,
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
        <MaskedInput
          label='CEP*'
          value={formData.cep}
          onChangeText={(text) => setFormData({ cep: text })}
          placeholder='Digite seu CEP'
          maskType={Masks.ZIP_CODE}
          keyboardType='numeric'
          editable={!loading}
          style={{ paddingRight: 35 }}
          blurOnSubmit={false}
          returnKeyType='next'
          onSubmitEditing={() => logradouroRef.current?.focus()}
          error={touched.cep && errors.cep ? errors.cep : undefined}
          touched={touched.cep}
          onFocus={() => setTouched((prev) => ({ ...prev, cep: true }))}
        />
        {loading && (
          <ActivityIndicator
            size='small'
            color={theme.COLORS.base_dark100}
            style={{
              position: 'absolute',
              right: 12,
              top: 52,
            }}
          />
        )}
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 8 }}>
        <View style={{ flex: 0.7 }}>
          <Input
            label='Logradouro*'
            value={formData.logradouro}
            placeholder='Digite seu Logradouro'
            onChangeText={(text) => setFormData({ logradouro: text })}
            keyboardType='default'
            editable={!loading}
            inputRef={logradouroRef}
            blurOnSubmit={false}
            returnKeyType='next'
            autoCapitalize='words'
            onSubmitEditing={() => numeroRef.current?.focus()}
            error={touched.logradouro && errors.logradouro ? errors.logradouro : undefined}
            touched={touched.logradouro}
            onFocus={() => setTouched((prev) => ({ ...prev, logradouro: true }))}
          />
        </View>
        <View style={{ flex: 0.3 }}>
          <Input
            label='Número*'
            value={formData.numero}
            placeholder='1234'
            onChangeText={(text) => setFormData({ numero: text })}
            editable={!loading}
            inputRef={numeroRef}
            blurOnSubmit={false}
            returnKeyType='next'
            onSubmitEditing={() => bairroRef.current?.focus()}
            error={touched.numero && errors.numero ? errors.numero : undefined}
            touched={touched.numero}
            onFocus={() => setTouched((prev) => ({ ...prev, numero: true }))}
          />
        </View>
      </View>

      <Input
        label='Bairro*'
        value={formData.bairro}
        placeholder='Digite seu Bairro'
        onChangeText={(text) => setFormData({ bairro: text })}
        keyboardType='default'
        editable={!loading}
        inputRef={bairroRef}
        blurOnSubmit={false}
        returnKeyType='next'
        autoCapitalize='words'
        onSubmitEditing={() => complementoRef.current?.focus()}
        error={touched.bairro && errors.bairro ? errors.bairro : undefined}
        touched={touched.bairro}
        onFocus={() => setTouched((prev) => ({ ...prev, bairro: true }))}
      />

      <Input
        label='Complemento (opcional)'
        value={formData.complemento}
        placeholder='Casa, Apto, Bloco, etc.'
        onChangeText={(text) => setFormData({ complemento: text })}
        keyboardType='default'
        inputRef={complementoRef}
        blurOnSubmit={false}
        returnKeyType='next'
        onSubmitEditing={() => cidadeRef.current?.focus()}
      />

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 8 }}>
        <View style={{ flex: 0.8 }}>
          <Input
            label='Cidade*'
            placeholder='Digite sua Cidade'
            value={formData.cidade}
            onChangeText={(text) => setFormData({ cidade: text })}
            keyboardType='default'
            editable={!loading}
            inputRef={cidadeRef}
            blurOnSubmit={false}
            returnKeyType='next'
            autoCapitalize='words'
            onSubmitEditing={() => ufRef.current?.focus()}
            error={touched.cidade && errors.cidade ? errors.cidade : undefined}
            touched={touched.cidade}
            onFocus={() => setTouched((prev) => ({ ...prev, cidade: true }))}
          />
        </View>
        <View style={{ flex: 0.2 }}>
          <Input
            style={{ textAlign: 'center', textTransform: 'uppercase' }}
            label='UF*'
            placeholder='XX'
            value={formData.uf}
            maxLength={2}
            onChangeText={(text) => setFormData({ uf: text })}
            keyboardType='default'
            autoCapitalize='characters'
            editable={!loading}
            inputRef={ufRef}
            returnKeyType='done'
            error={touched.uf && errors.uf ? errors.uf : undefined}
            touched={touched.uf}
            onFocus={() => setTouched((prev) => ({ ...prev, uf: true }))}
          />
        </View>
      </View>
    </S.Container>
  );
}
