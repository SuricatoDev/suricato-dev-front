import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  name: string;
  email: string;
  loggedIn: boolean;
  phone?: string;
  contactPhone?: string;
  cpf?: string;
  cnpj?: string;
  token?: string;
}

const initialState: UserState = {
  name: '',
  email: '',
  loggedIn: true,
  phone: '(15) 99123-4567',
  contactPhone: '',
  token: '',
  cpf: '',
  cnpj: ''
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login(state, action: PayloadAction<Partial<UserState>>) {
      return {
        ...state,
        ...action.payload,
        loggedIn: true
      };
    },
    logout(state) {
      return {
        ...initialState,
        loggedIn: false
      };
    }
  }
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
