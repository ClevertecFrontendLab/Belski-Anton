import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    email: string;
    password: string;
}

const initialState: AuthState = {
    email: '',
    password: '',
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setFields: (state, { payload }: PayloadAction<AuthState>) => {
            state.email = payload.email;
            state.password = payload.password;
        },
        clearAuthState: () => initialState,
    },
});

export const { setFields, clearAuthState } = authSlice.actions;

export default authSlice.reducer;
