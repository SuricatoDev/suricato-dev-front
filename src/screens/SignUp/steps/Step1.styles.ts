import styled from 'styled-components/native';

export const FormContainer = styled.View`
  flex: 1;
  margin-top: -16px;
`;

export const PasswordField = styled.View`
  position: relative;
  width: 100%;
`;

export const EyeButton = styled.TouchableOpacity`
  position: absolute;
  right: 0;
  padding: 0 16px;
  height: 46px;
  border-radius: 0 10px 10px 0;
  justify-content: center;
  align-items: center;
`;
