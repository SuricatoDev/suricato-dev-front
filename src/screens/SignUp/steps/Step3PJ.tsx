import React, { useState, useEffect } from 'react';
import * as S from './Step3PJ.styles';
import { Label } from '@components/Label';
import { Input } from '@components/Input';

interface Step3PJProps {
  formData: {
    cnpj: string;
    razaoSocial: string;
    nomeFantasia: string;
    telefone: string;
  };
  setFormData: (data: Partial<Step3PJProps['formData']>) => void;
  onValidate: (isValid: boolean) => void;
}

export function Step3PJ({ formData, setFormData, onValidate }: Step3PJProps) {
  const [localData, setLocalData] = useState(formData);

  useEffect(() => {
    const isFormValid =
      localData.cnpj.trim() !== '' &&
      localData.razaoSocial.trim() !== '' &&
      localData.nomeFantasia.trim() !== '' &&
      localData.telefone.trim() !== '';
    onValidate(isFormValid);
    setFormData(localData);
  }, [localData, onValidate, setFormData]);

  return (
    <S.Container>
      <Label>CNPJ</Label>
      <Input
        value={localData.cnpj}
        placeholder="Digite seu CNPJ"
        onChangeText={text => setLocalData({ ...localData, cnpj: text })}
      />
      <Label>Razão Social</Label>
      <Input
        value={localData.razaoSocial}
        placeholder="Digite sua Razão Social"
        onChangeText={text => setLocalData({ ...localData, razaoSocial: text })}
      />
      <Label>Nome Fantasia</Label>
      <Input
        value={localData.nomeFantasia}
        placeholder="Digite seu Nome Fantasia"
        onChangeText={text =>
          setLocalData({ ...localData, nomeFantasia: text })
        }
      />
      <Label>Telefone</Label>
      <Input
        value={localData.telefone}
        placeholder="Digite seu Telefone"
        keyboardType="phone-pad"
        onChangeText={text => setLocalData({ ...localData, telefone: text })}
      />
    </S.Container>
  );
}
