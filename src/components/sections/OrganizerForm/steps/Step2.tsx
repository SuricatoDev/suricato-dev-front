import React, { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { EditableAddress } from '@/components/common/EditableAddress'
import { AddressData } from '@/components/common/EditableAddress'

interface Step2Props {
  onNext: () => void
  $isModal: boolean
}

export default function Step2({ onNext, $isModal }: Step2Props) {
  const { watch, trigger, setValue } = useFormContext()

  const [cep, endereco, bairro, cidade, estado, complemento, numero] = watch([
    'cep',
    'endereco',
    'bairro',
    'cidade',
    'estado',
    'complemento',
    'numero'
  ])

  useEffect(() => {
    trigger([
      'cep',
      'endereco',
      'bairro',
      'cidade',
      'estado',
      'complemento',
      'numero'
    ])
  }, [cep, endereco, bairro, cidade, estado, complemento, numero, trigger])

  const updateAddress = (newAddress: AddressData) => {
    setValue('cep', newAddress.cep, { shouldValidate: true })
    setValue('endereco', newAddress.street, { shouldValidate: true })
    setValue('bairro', newAddress.neighborhood, { shouldValidate: true })
    setValue('cidade', newAddress.city, { shouldValidate: true })
    setValue('estado', newAddress.state, { shouldValidate: true })
    setValue('complemento', newAddress.complement, { shouldValidate: true })
    setValue('numero', newAddress.number, { shouldValidate: true })
  }

  return (
    <>
      <EditableAddress
        address={{
          cep: cep || '',
          street: endereco || '',
          neighborhood: bairro || '',
          city: cidade || '',
          state: estado || '',
          complement: complemento || '',
          number: numero || ''
        }}
        setAddress={updateAddress}
        activeSearch={true}
        onSave={onNext}
        hasButton={true}
        buttonFullWidth
      />
    </>
  )
}
