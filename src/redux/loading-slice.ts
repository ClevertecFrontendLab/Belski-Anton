import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LoadState {
   isLoading:boolean
}

const initialState: LoadState  = {
   isLoading:false
};

const loadSlice = createSlice({
    name: 'load',
    initialState,
    reducers: {
        setIsLoading: (state, { payload }: PayloadAction<boolean>) => {
            state.isLoading = payload;
        },
    },
});

export const { setIsLoading } = loadSlice.actions;

export default loadSlice.reducer;