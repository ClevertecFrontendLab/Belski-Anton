import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Exercise {
    name: string;
    replays: number;
    weight: number;
    approaches: number;
    isImplementation: boolean;
}

export interface TrainingState {
    _id: string;
    name: string;
    date: string;
    exercises: Exercise[];
}

const initialState: TrainingState = {
    _id: '',
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
        setTraining: (state, { payload }: PayloadAction<TrainingState>) => {
            Object.assign(state, payload);
        },
        clearTraining: (state) => {
            Object.assign(state, initialState);
        },
    },
});

export const { setName, setDate, setExercises, clearTraining, setTraining } = trainingSlice.actions;

export default trainingSlice.reducer;
