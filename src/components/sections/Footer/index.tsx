import { getYear } from '@/utils/getYear'
import Link from 'next/link'

import * as S from './styles'

export default function Footer() {
  const currentYear = getYear().toString()

  return (
    <S.Wrapper className="main-footer" id="footer">
      <div className="container">
        <S.Content>
          <S.Items>
            <p>© {currentYear} Excursionistas, Inc.</p>
            <S.PointerDivider />
            <Link href="/privacy">Política de Privacidade</Link>
            <S.PointerDivider />
            <Link href="/terms">Termos de Uso</Link>
          </S.Items>
          <S.Items>
            <Link href="/terms">Atendimento e recursos</Link>
          </S.Items>
        </S.Content>
      </div>
    </S.Wrapper>
  )
}
