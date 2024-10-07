import { View, ActivityIndicator, Alert } from 'react-native';
import { useEffect, useState, useRef } from 'react';
import { useTheme } from 'styled-components/native';
import { Masks } from 'react-native-mask-input';

import { fetchAddressByCep } from '@services/viacep';

import { Input } from '@components/Input';
import { MaskedInput } from '@components/MaskInput';

import * as S from './Step4PF.styles';
interface Step4PFProps {
  formData: {
    cep: string;
    bairro: string;
    logradouro: string;
    cidade: string;
    uf: string;
    complemento: string;
    numero: string;
  };
  setFormData: (data: Partial<Step4PFProps['formData']>) => void;
  onValidate: (isValid: boolean) => void;
}

export function Step4PF({ formData, setFormData, onValidate }: Step4PFProps) {
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const previousCep = useRef('');

  useEffect(() => {
    const isFormValid =
      formData.cep.trim() !== '' &&
      formData.bairro.trim() !== '' &&
      formData.logradouro.trim() !== '' &&
      formData.cidade.trim() !== '' &&
      formData.uf.trim() !== '' &&
      formData.numero.trim() !== '';

    onValidate(isFormValid);
  }, [formData, onValidate]);

  useEffect(() => {
    const rawCep = formData.cep.replace(/\D/g, '');

    if (rawCep.length === 8 && rawCep !== previousCep.current) {
      setLoading(true);
      previousCep.current = rawCep;

      fetchAddressByCep(rawCep)
        .then(data => {
          setFormData({
            bairro: data.bairro || '',
            logradouro: data.logradouro || '',
            cidade: data.localidade || '',
            uf: data.uf || '',
          });
        })
        .catch(error =>
          Alert.alert('Erro', 'Não foi possível buscar o endereço.'),
        )
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
          label="CEP"
          value={formData.cep}
          onChangeText={text => setFormData({ cep: text })}
          placeholder="Digite seu CEP"
          maskType={Masks.ZIP_CODE}
          keyboardType="numeric"
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
              top: 52,
            }}
          />
        )}
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          gap: 8,
        }}
      >
        <View style={{ flex: 0.7 }}>
          <Input
            label="Logradouro"
            value={formData.logradouro}
            placeholder="Digite seu Logradouro"
            onChangeText={text => setFormData({ logradouro: text })}
            keyboardType="default"
            editable={!loading}
          />
        </View>
        <View style={{ flex: 0.3 }}>
          <Input
            label="Número"
            value={formData.numero}
            placeholder="1234"
            onChangeText={text => setFormData({ numero: text })}
            editable={!loading}
          />
        </View>
      </View>

      <Input
        label="Bairro"
        value={formData.bairro}
        placeholder="Digite seu Bairro"
        onChangeText={text => setFormData({ bairro: text })}
        keyboardType="default"
        editable={!loading}
      />

      <Input
        label="Complemento (opcional)"
        value={formData.complemento}
        placeholder="Casa, Apto, Bloco, etc."
        onChangeText={text => setFormData({ complemento: text })}
        keyboardType="default"
      />

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          gap: 8,
        }}
      >
        <View style={{ flex: 0.8 }}>
          <Input
            label="Cidade"
            placeholder="Digite sua Cidade"
            value={formData.cidade}
            onChangeText={text => setFormData({ ...formData, cidade: text })}
            keyboardType="default"
            editable={!loading}
          />
        </View>
        <View style={{ flex: 0.2 }}>
          <Input
            style={{ textAlign: 'center', textTransform: 'uppercase' }}
            label="UF"
            placeholder="XX"
            value={formData.uf}
            maxLength={2}
            onChangeText={text => setFormData({ ...formData, uf: text })}
            keyboardType="default"
            autoCapitalize="characters"
            editable={!loading}
          />
        </View>
      </View>
    </S.Container>
  );
}
