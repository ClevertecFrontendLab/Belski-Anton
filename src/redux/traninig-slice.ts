import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Exercise {
    name: string;
    replays: number;
    weight: number;
    approaches: number;
    isImplementation: boolean;
}

interface TrainingState {
    name: string;
    date: string;
    exercises: Exercise[];
}

const initialState: TrainingState = {
    name: '',
    date: '',
    exercises: [],
};

const trainingSlice = createSlice({
    name: 'training',
    initialState,
    reducers: {
        setName: (state, { payload }: PayloadAction<string>) => {
            state.name = payload;
        },
        setDate: (state, { payload }: PayloadAction<string>) => {
            state.date = payload;
        },
        setExercises: (state, { payload }: PayloadAction<Exercise[]>) => {
            state.exercises = payload;
        },
        clearTraining: (state) => {
            Object.assign(state, initialState);
        },
    },
});

export const {setName,setDate,setExercises,clearTraining } = trainingSlice.actions;

export default trainingSlice.reducer;
