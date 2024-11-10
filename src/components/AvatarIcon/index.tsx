import { Avatar } from 'react-native-paper';
import * as S from './styles';
import { getInitials } from '@utils/getInitials';

interface SelectProps {
  name: string;
}

export function AvatarIcon({ name }: SelectProps) {
  const nameFormated = getInitials(name);

  return (
    <S.Container>
      <Avatar.Text size={50} label={nameFormated} />
      <S.Name>{name}</S.Name>
    </S.Container>
  );
}
