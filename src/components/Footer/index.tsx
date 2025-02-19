import { getYear } from '@/utils/getYear'
import Logo, { LogoProps } from '@/components/Logo'
import * as S from './styles'

export interface FooterProps {
  logo: LogoProps
  brand_name: string
}

export default function Footer({ logo, brand_name }: FooterProps) {
  const currentYear = getYear().toString()

  return (
    <S.Wrapper id="footer">
      <Logo
        image_url={logo.image_url}
        image_alt_text={logo.image_alt_text}
        logo_link={logo.logo_link}
        contrast
        size="sm"
      />
      <p>
        © Copyright {currentYear} {brand_name ?? ''} - CNPJ:
        04.310.392/0001-46. Todos os direitos reservados.
      </p>
    </S.Wrapper>
  )
}
