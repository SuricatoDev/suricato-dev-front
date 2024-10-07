import React, { useEffect } from 'react';
import * as S from './Step4PF.styles';
import { Label } from '@components/Label';
import { Input } from '@components/Input';
import { fetchAddressByCep } from '@services/viacep';
import { TextInputMask } from 'react-native-masked-text';
import { useTheme } from 'styled-components/native';

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

    if (rawCep.length === 8) {
      fetchAddressByCep(rawCep)
        .then(data => {
          setFormData({
            bairro: data.bairro,
            logradouro: data.logradouro,
            cidade: data.localidade,
            uf: data.uf,
          });
        })
        .catch(error => alert(error.message));
    }
  }, [formData.cep, setFormData]);

  return (
    <S.Container>
      <Label>CEP</Label>
      <TextInputMask
        type={'zip-code'}
        value={formData.cep}
        onChangeText={text => setFormData({ cep: text })}
        placeholder="Digite seu CEP"
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
      />
      <Label>Bairro</Label>
      <Input
        value={formData.bairro}
        placeholder="Digite seu Bairro"
        onChangeText={text => setFormData({ bairro: text })}
      />
      <Label>Logradouro</Label>
      <Input
        value={formData.logradouro}
        placeholder="Digite seu Logradouro"
        onChangeText={text => setFormData({ logradouro: text })}
      />
      <Label>Cidade</Label>
      <Input
        value={formData.cidade}
        placeholder="Digite sua Cidade"
        onChangeText={text => setFormData({ cidade: text })}
      />
      <Label>UF</Label>
      <Input
        value={formData.uf}
        placeholder="Digite seu UF"
        onChangeText={text => setFormData({ uf: text })}
      />
      <Label>Complemento (opcional)</Label>
      <Input
        value={formData.complemento}
        placeholder="Digite seu Complemento"
        onChangeText={text => setFormData({ complemento: text })}
      />
      <Label>Número</Label>
      <Input
        value={formData.numero}
        placeholder="Digite seu Número"
        onChangeText={text => setFormData({ numero: text })}
      />
    </S.Container>
  );
}
