import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ErrorTrainigState {
    isError: boolean;
}

const initialState: ErrorTrainigState = {
    isError: false,
};

const errorSlice = createSlice({
    name: 'error-training',
    initialState,
    reducers: {
        setIsError: (state, { payload }: PayloadAction<boolean>) => {
            state.isError = payload;
        },
    },
});

export const { setIsError } = errorSlice.actions;

export default errorSlice.reducer;
