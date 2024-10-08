import styled from 'styled-components/native';

type StepProps = {
  isActive: boolean;
};

export const Container = styled.View`
  align-items: center;
  width: 100%;
  padding: 18px 24px 19.5px 24px;
`;

export const StepLineContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const Step = styled.View`
  align-items: center;
  justify-content: center;
  position: relative;
`;

export const StepCircle = styled.View<StepProps>`
  width: ${({ isActive }) => (isActive ? '42px' : '32px')};
  height: ${({ isActive }) => (isActive ? '42px' : '32px')};
  border-radius: ${({ isActive }) => (isActive ? '21px' : '16px')};
  background-color: ${({ isActive, theme }) => (isActive ? theme.COLORS.ORANGE_700 : theme.COLORS.GRAY_200)};
  justify-content: center;
  align-items: center;
`;

export const StepText = styled.Text<StepProps>`
  position: absolute;
  top: ${({ isActive }) => (isActive ? '44px' : '39px')};
  color: ${({ isActive, theme }) => (isActive ? theme.COLORS.ORANGE_700 : theme.COLORS.GRAY_200)};
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
  font-size: 12px;
  white-space: nowrap;
  text-align: center;
  width: 50px;
`;

export const Line = styled.View<StepProps>`
  height: 1px;
  flex: 1;
  background-color: ${({ isActive, theme }) => (isActive ? theme.COLORS.ORANGE_700 : theme.COLORS.GRAY_200)};
`;
