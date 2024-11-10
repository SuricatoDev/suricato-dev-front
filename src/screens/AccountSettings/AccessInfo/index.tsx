import { HeadingWithSubtitle } from '@components/HeadingWithSubtitle';
import * as S from './styles';
import { SingleHeader } from '@components/SingleHeader';
import { InfoTextWithButton } from '@components/infoTextWithButton';
import { Divider } from 'react-native-paper';

export function AccessInfo() {
  return (
    <>
      <S.Container>
        <SingleHeader title="Informações de acesso" />
        <HeadingWithSubtitle
          title="Dados de acesso"
          subtitle="Estes dados são a sua forma de acesso ao Excursionistas. Seu e-mail não pode ser alterado, porque é a informação principal de acesso à sua conta"
        />
        <InfoTextWithButton title="E-mail" subtitle="paulo@gmail.com" disabled />
        <InfoTextWithButton title="Telefone" subtitle="+55 (15) 9 9149-2748" />
        <S.Spacing>
          <Divider />
        </S.Spacing>
        <HeadingWithSubtitle
          title="Dados de contato"
          subtitle="Estes dados servem para acompanhar suas excursões e promoções"
        />
        <InfoTextWithButton title="Telefone" subtitle="+55 (15) 9 9149-2748" />
      </S.Container>
    </>
  );
}
