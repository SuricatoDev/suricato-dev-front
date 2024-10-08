import { PressableProps, Text } from 'react-native';
import * as S from './styles';
import {
  CaretRight,
  PencilSimpleLine,
  Plus,
  Trash,
} from 'phosphor-react-native';
import { useState } from 'react';

type ButtonProps = PressableProps & {
  type?: S.ButtonTypeStyleProps;
  icon?: S.ButtonIconStyleProps;
  fullWidth?: S.ButtonFullWidthStyleProps;
  children?: string;
};

export function Button({
  type = 'PRIMARY',
  icon,
  fullWidth,
  children,
  ...rest
}: ButtonProps) {
  const [isPressed, setIsPressed] = useState(false);

  const handlePressIn = () => setIsPressed(true);
  const handlePressOut = () => setIsPressed(false);

  const icons = {
    PLUS: <Plus size={18} color={type === 'PRIMARY' ? 'white' : 'black'} />,
    EDIT: (
      <PencilSimpleLine
        size={18}
        color={type === 'PRIMARY' ? 'white' : 'black'}
      />
    ),
    DELETE: <Trash size={18} color={type === 'PRIMARY' ? 'white' : 'black'} />,
    CARET_RIGHT: (
      <CaretRight
        weight="bold"
        size={18}
        color={type === 'PRIMARY' ? 'white' : 'black'}
      />
    ),
  };

  return (
    <S.Container
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      isPressed={isPressed}
      type={type}
      icon={icon}
      fullWidth={fullWidth}
      {...rest}
    >
      <S.ButtonText type={type}>{children}</S.ButtonText>
      {icon ? icons[icon] : null}
    </S.Container>
  );
}
