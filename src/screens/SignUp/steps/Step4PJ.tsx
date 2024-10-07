import React, { useState, useEffect } from 'react';
import * as S from './Step4PJ.styles';
import { Label } from '@components/Label';
import { Input } from '@components/Input';

interface Step4PJProps {
  formData: {
    cep: string;
    bairro: string;
    logradouro: string;
    cidade: string;
    uf: string;
    complemento: string;
    numero: string;
  };
  setFormData: (data: Partial<Step4PJProps['formData']>) => void;
  onValidate: (isValid: boolean) => void;
}

export function Step4PJ({ formData, setFormData, onValidate }: Step4PJProps) {
  const [localData, setLocalData] = useState(formData);

  useEffect(() => {
    const isFormValid =
      localData.cep.trim() !== '' &&
      localData.bairro.trim() !== '' &&
      localData.logradouro.trim() !== '' &&
      localData.cidade.trim() !== '' &&
      localData.uf.trim() !== '' &&
      localData.numero.trim() !== '';
    onValidate(isFormValid);
    setFormData(localData);
  }, [localData, onValidate, setFormData]);

  return (
    <S.Container>
      <Label>CEP</Label>
      <Input
        value={localData.cep}
        placeholder="Digite seu CEP"
        onChangeText={text => setLocalData({ ...localData, cep: text })}
      />
      <Label>Bairro</Label>
      <Input
        value={localData.bairro}
        placeholder="Digite seu Bairro"
        onChangeText={text => setLocalData({ ...localData, bairro: text })}
      />
      <Label>Logradouro</Label>
      <Input
        value={localData.logradouro}
        placeholder="Digite seu Logradouro"
        onChangeText={text => setLocalData({ ...localData, logradouro: text })}
      />
      <Label>Cidade</Label>
      <Input
        value={localData.cidade}
        placeholder="Digite sua Cidade"
        onChangeText={text => setLocalData({ ...localData, cidade: text })}
      />
      <Label>UF</Label>
      <Input
        value={localData.uf}
        placeholder="Digite seu UF"
        onChangeText={text => setLocalData({ ...localData, uf: text })}
      />
      <Label>Complemento (opcional)</Label>
      <Input
        value={localData.complemento}
        placeholder="Digite seu Complemento"
        onChangeText={text => setLocalData({ ...localData, complemento: text })}
      />
      <Label>Número</Label>
      <Input
        value={localData.numero}
        placeholder="Digite seu Número"
        onChangeText={text => setLocalData({ ...localData, numero: text })}
      />
    </S.Container>
  );
}
