import { useForm } from 'react-hook-form'
import * as S from './styles'

export default function LoginForm() {
  const { register, handleSubmit } = useForm()

  const onSubmit = (data) => {
    console.log(data)
  }

  return (
    <S.FormContainer>
      <S.Header>
        <S.Title>Entrar ou cadastrar-se</S.Title>
      </S.Header>
      <S.StyledForm onSubmit={handleSubmit(onSubmit)}>
        <S.Subtitle>Bem-vindo ao Excursionistas</S.Subtitle>
        <label htmlFor="country">País/Região</label>
        <S.StyledSelect id="country" {...register('country')}>
          <option value="BR">Brasil (+55)</option>
          <option value="US">United States (+1)</option>
          {/* Adicione mais opções de acordo com a necessidade */}
        </S.StyledSelect>

        <label htmlFor="phone">Número de telefone</label>
        <S.StyledInput id="phone" type="tel" {...register('phone')} />

        <S.StyledButton type="submit">Continuar</S.StyledButton>

        <S.Divider>ou</S.Divider>

        <S.StyledButton type="button">Continuar com Google</S.StyledButton>
        <S.StyledButton type="button">Continuar com Apple</S.StyledButton>
        <S.StyledButton type="button">Continuar com email</S.StyledButton>
        <S.StyledButton type="button">Continuar com Facebook</S.StyledButton>
      </S.StyledForm>
    </S.FormContainer>
  )
}
