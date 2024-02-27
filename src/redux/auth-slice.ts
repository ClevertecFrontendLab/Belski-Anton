import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    email: string;
    password: string;
    token: string;
}

const initialState: AuthState = {
    email: '',
    password: '',
    token:'',
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setFields: (state, { payload }: PayloadAction<AuthState>) => {
            state.email = payload.email;
            state.password = payload.password;
        },
        setToken:(state, { payload }: PayloadAction<string>) => {
            state.token = payload;
        },
        clearAuthState: () => initialState,
    },
});

export const { setFields, clearAuthState,setToken } = authSlice.actions;

export default authSlice.reducer;
