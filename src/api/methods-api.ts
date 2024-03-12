import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_API_URL, API_ROUTES } from '../constants/index';
import { store } from '@redux/configure-store';

interface IPropsRegistration {
    email: string;
    password: string;
}

interface IResponseLogin {
    accessToken: string;
}

interface IChangePasswordProps {
    password: string;
    confirmPassword: string;
}

interface IConfirmEmailProps {
    email: string;
    code: string;
}

interface IReview {
    id: string;
    fullName: string | null;
    imageSrc: string | null;
    message: string | null;
    rating: number;
    createdAt: string;
}

interface ICreateReview {
    message: string;
    rating: number;
}

interface Traning {
    name: string;
    date: string;
    isTemplementation: boolean;
    parameters?: {
        repeat: boolean;
        period: number;
        joinTraning: boolean;
        participants: string[];
    };
    exercises: Exercise[];
}

interface Exercise {
    name: string;
    replays: number;
    weight: number;
    approaches: number;
    isTemplementation: boolean;
}

interface TrainingListItem {
    name: string;
    key: string;
}


export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_API_URL,
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('token') || store.getState().auth.token;
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ['Feedback'],
    endpoints: (builder) => ({
        registration: builder.mutation<unknown, IPropsRegistration>({
            query: (body) => ({
                url: API_ROUTES.registration,
                method: 'POST',
                body,
            }),
        }),
        login: builder.mutation<IResponseLogin, IPropsRegistration>({
            query: (body) => ({
                url: API_ROUTES.login,
                method: 'POST',
                body,
            }),
        }),
        checkEmail: builder.mutation<unknown, string>({
            query: (email) => ({
                url: API_ROUTES.checkEmail,
                method: 'POST',
                body: { email },
            }),
        }),
        confirmEmail: builder.mutation<unknown, IConfirmEmailProps>({
            query: (body) => ({
                url: API_ROUTES.confirmEmail,
                method: 'POST',
                body,
                credentials: 'include',
            }),
        }),
        changePassword: builder.mutation<string, IChangePasswordProps>({
            query: (body) => ({
                url: API_ROUTES.changePassword,
                method: 'POST',
                body,
                credentials: 'include',
            }),
        }),
        getReviews: builder.query<IReview[], void>({
            query: () => ({
                url: API_ROUTES.getFeedback,
            }),
            providesTags: ['Feedback'],
        }),
        createReview: builder.mutation<unknown, ICreateReview>({
            query: (review) => ({
                url: API_ROUTES.getFeedback,
                method: 'POST',
                body: review,
            }),
            invalidatesTags: ['Feedback'],
        }),
        getTrainig: builder.query({
            query: (args) => ({
                url: API_ROUTES.getTrainig,
                method: 'GET',
                params: args,
            }),
        }),
        createTrainig: builder.mutation<unknown, Traning>({
            query: (training) => ({
                url: API_ROUTES.createTraning,
                method: 'POST',
                body: training,
            }),
        }),
        uptadeTraning: builder.mutation<unknown, Traning>({
            query: (training) => ({
                url: API_ROUTES.updateTraining,
                method: 'PUT',
                body: training,
            }),
        }),
        deleteTrainig: builder.mutation({
            query: (training) => ({
                url: API_ROUTES.deleteTraining,
                method: 'DELETE',
                body: training,
            }),
        }),
        getTrainingList: builder.query<TrainingListItem,void>({
            query: () => ({
                url: API_ROUTES.getTrainingList,
                method: 'GET',
            }),
        }),
    }),
});

export const {
    useRegistrationMutation,
    useLoginMutation,
    useChangePasswordMutation,
    useCheckEmailMutation,
    useConfirmEmailMutation,
    useGetReviewsQuery,
    useCreateReviewMutation,
    useGetTrainigQuery,
    useCreateTrainigMutation,
    useUptadeTraningMutation,
    useDeleteTrainigMutation,
    useGetTrainingListQuery,
} = authApi;
