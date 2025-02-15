import { Geolocation } from '@interfaces/userStore';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface Address {
  street: string;
  city: string;
  state: string;
  zip: string;
}

interface UserState {
  cep?: string;
  useGeolocation: boolean;
  geoLocation?: Geolocation;
  isLogged: boolean;
  name?: string;
  phoneNumber?: string;
  address?: Address;
}

const initialState: UserState = {
  useGeolocation: false,
  isLogged: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCEP: (state, action: PayloadAction<string | undefined>) => {
      state.cep = action.payload;
      state.useGeolocation = false;
    },
    setUseGeolocation: (state, action: PayloadAction<boolean>) => {
      state.useGeolocation = action.payload;
      state.cep = undefined;
    },
    setGeoLocation: (state, action: PayloadAction<Geolocation | undefined>) => {
      state.geoLocation = action.payload;
    },
    setLogin: (state, action: PayloadAction<boolean>) => {
      state.isLogged = action.payload;
    },
    setName: (state, action: PayloadAction<string | undefined>) => {
      state.name = action.payload;
    },
    setPhoneNumber: (state, action: PayloadAction<string | undefined>) => {
      state.phoneNumber = action.payload;
    },
    setAddress: (state, action: PayloadAction<Address | undefined>) => {
      state.address = action.payload;
    },
  },
});

export const {
  setCEP,
  setUseGeolocation,
  setGeoLocation,
  setLogin,
  setName,
  setPhoneNumber,
  setAddress,
} = userSlice.actions;

export default userSlice.reducer;
