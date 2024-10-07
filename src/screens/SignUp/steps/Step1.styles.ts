import styled from 'styled-components/native';

export const FormContainer = styled.View`
  flex: 1;
  margin-top: -16px;
`;

export const PasswordField = styled.View`
  position: relative;
  width: 100%;
  height: 46px;
`;

export const EyeButton = styled.TouchableOpacity`
  position: absolute;
  right: 0;
  padding: 0 16px;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

export const ErrorText = styled.Text`
  color: red;
  font-size: 12px;
  margin: 4px 0;
`;
