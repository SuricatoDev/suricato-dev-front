import { PressableProps } from 'react-native';
import { useState } from 'react';
import { CaretRight, PencilSimpleLine, Plus, Trash } from 'phosphor-react-native';
import * as S from './styles';

type ButtonProps = PressableProps & {
  type?: S.ButtonTypeStyleProps;
  icon?: S.ButtonIconStyleProps;
  fullWidth?: S.ButtonFullWidthStyleProps;
  children?: string;
};

export function Button({ type = 'PRIMARY', icon, fullWidth, children, ...rest }: ButtonProps) {
  const [isPressed, setIsPressed] = useState(false);

  const handlePressIn = () => setIsPressed(true);
  const handlePressOut = () => setIsPressed(false);

  const iconColor = type === 'PRIMARY' || isPressed ? 'white' : 'black';

  const icons = {
    PLUS: <Plus size={18} color={iconColor} />,
    EDIT: <PencilSimpleLine size={18} color={iconColor} />,
    DELETE: <Trash size={18} color={iconColor} />,
    CARET_RIGHT: <CaretRight weight="bold" size={18} color={iconColor} />
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
      <S.ButtonText type={type} isPressed={isPressed}>
        {children}
      </S.ButtonText>
      {icon ? icons[icon] : null}
    </S.Container>
  );
}
